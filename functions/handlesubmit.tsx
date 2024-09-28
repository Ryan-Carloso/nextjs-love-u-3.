// handlesubmit.tsx

import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://laqxbdncmapnhorlbbkg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY' // Replace with your actual key
);

type User = {
  // Define user properties if needed
};

type SubmitProps = {
  user: User | null;
  date: Date;
  couplename: string;
  compliment: string;
  imageUris: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type SubmitData = {
  date: Date;
  compliment: string;
  imageUris: string[];
  couplename: string;
};

// Added this type to include the random string
type DataToSubmit = {
  date_time: string;
  elogios: string;
  image_urls: string[];
  random_string: string; // New field for the random string
  couplename: string;
};

// Function to generate a random 12-character alphanumeric string
const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%£€><';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const handleSubmit = async (
  user: User | null, // Allow user to be null
  { date, compliment, imageUris, couplename }: SubmitData,
  setLoading: (loading: boolean) => void
) => {
  if (!user) {
    alert('You must be logged in to submit data.');
    return;
  }

  if (imageUris.length === 0) {
    alert('Please upload at least one photo.');
    return;
  }

  if (!compliment || compliment.trim() === '') {
    alert('Please at least enter one compliment.');
    return;
  }

  setLoading(true); // Set loading to true

  try {
    if (!date) {
      throw new Error('Please select a date');
    }

    const randomString = generateRandomString(12); // Generate the random string

    const data: DataToSubmit = {
      date_time: date.toISOString(),
      elogios: JSON.stringify({ text: compliment }),
      image_urls: [], // Initialize image_urls as an empty array
      random_string: randomString, // Include the random string in the data
      couplename: couplename, // Include the couplename in the data
    };

    // Upload all images
    if (imageUris.length > 0) {
      const imageUrls: string[] = await Promise.all(
        imageUris.map(async (uri) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const { error: storageError, data: storageData } = await supabase.storage
            .from('images')
            .upload(`compliment-${Date.now()}-${Math.random()}.jpg`, blob, {
              contentType: 'image/jpeg',
            });
          if (storageError) throw storageError;
          return storageData.path; // Return the image path
        })
      );

      data.image_urls = imageUrls; // Save all image URLs
    }

    const { error } = await supabase.from('users').insert(data);

    if (error) throw error;

    alert('Data submitted successfully!');
    return true;
  } catch (error) {
    console.error('Error submitting data:', error);
    alert('Error submitting data. Please try again.');
    return false;
  } finally {
    setLoading(false); // Set loading to false
  }
};

// HandleSubmitComponent

export const HandleSubmitComponent = ({ couplename, user, date, compliment, imageUris, loading, setLoading }: SubmitProps) => {
  return (
    <div>
      <button
        onClick={() => handleSubmit(user, { date, compliment, imageUris, couplename }, setLoading)} // Include couplename here
        disabled={loading}
        className={`text-white py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};
