import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://laqxbdncmapnhorlbbkg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY');

type User = {
  // ... user properties
};

type SubmitProps = {
  user: User | null;
  date: Date;
  compliment: string;
  imageUris: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type SubmitData = {
  date: Date;
  compliment: string;
  imageUris: string[];
};

type DataToSubmit = {
  date_time: string;
  elogios: string;
  image_urls: string[]; // Define image_urls as an array of strings
};

export const handleSubmit = async (
  user: User,
  { date, compliment, imageUris }: SubmitData,
  setLoading: (loading: boolean) => void
) => {
  if (!user) {
    alert('You must be logged in to submit data.');
    return;
  }

  setLoading(true); // Set loading to true

  try {
    if (!date || !compliment) {
      throw new Error('Please fill all fields');
    }

    const data: DataToSubmit = { // Explicitly type data
      date_time: date.toISOString(),
      elogios: JSON.stringify({ text: compliment }),
      image_urls: [], // Initialize image_urls as an empty array
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
          return storageData.path;
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


export const HandleSubmitComponent = ({ user, date, compliment, imageUris, loading, setLoading }: SubmitProps) => {
  return (
    
    <button
    // @ts-ignore
      onClick={() => handleSubmit(user, { date, compliment, imageUris }, setLoading)} // Call handleSubmit with the loading state
      disabled={loading} // Disable the button when loading
      className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  );
};