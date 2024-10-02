// handleSubmit.tsx

import React from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://laqxbdncmapnhorlbbkg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY' // Replace with your actual key
);

// Define User type (extend as needed)
type User = {
  id: string;
  email: string;
  // Add other user properties if necessary
};

// Define props for handleSubmit function
type SubmitProps = {
  user: User | null;
  date: Date;
  couplename: string;
  compliment: string;
  imageUris: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

// Define data structure for submission
type SubmitData = {
  date: Date;
  compliment: string;
  imageUris: string[];
  couplename: string;
};

// Data structure to submit to Supabase
type DataToSubmit = {
  date_time: string;
  elogios: string;
  image_urls: string[];
  random_string: string; // New field for the random string
  couplename: string;
};

// Function to generate a random 2-character alphanumeric string
const generateRandomString = (couplename: string, length: number = 3): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%£€><';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return `${couplename}${result}`;
};

// handleSubmit function
export const handleSubmit = async (
  user: User | null, // Allow user to be null
  { date, compliment, imageUris, couplename }: SubmitData,
  setLoading: (loading: boolean) => void
): Promise<boolean> => {
  if (!user) {
    alert('You must be logged in to submit data.')
    return false
  }

  if (imageUris.length === 0) {
    alert('Please upload at least one photo.')
    return false
  }

  if (!compliment || compliment.trim() === '') {
    alert('Please enter at least one compliment.')
    return false
  }

  if (!couplename || couplename.trim() === '') {
    alert('Please enter the couple\'s name.')
    return false
  }

  setLoading(true) // Set loading to true

  try {
    if (!date) {
      throw new Error('Please select a date')
    }

    const randomString = generateRandomString(couplename, 2) // Generate the random string

    const data: DataToSubmit = {
      date_time: date.toISOString(),
      elogios: JSON.stringify({ text: compliment }),
      image_urls: [], // Initialize image_urls as an empty array
      random_string: randomString, // Include the random string in the data
      couplename: couplename, // Include the couplename in the data
    }

    // Upload all images
    if (imageUris.length > 0) {
      const imageUrls: string[] = await Promise.all(
        imageUris.map(async (uri) => {
          const response = await fetch(uri)
          const blob = await response.blob()
          const { error: storageError, data: storageData } = await supabase.storage
            .from('images')
            .upload(`compliment-${Date.now()}-${Math.random()}.jpg`, blob, {
              contentType: 'image/jpeg',
            })
          if (storageError) throw storageError
          return storageData.path // Return the image path
        })
      )

      data.image_urls = imageUrls // Save all image URLs
    }

    const { error } = await supabase.from('users').insert(data)

    if (error) throw error

    alert('Data submitted successfully!')
    return true
  } catch (error) {
    console.error('Error submitting data:', error)
    alert('Error submitting data. Please try again.')
    return false
  } finally {
    setLoading(false) // Set loading to false
  }
}

// Props for HandleSubmitComponent including the callback
type HandleSubmitComponentProps = SubmitProps & {
  onGenerateRandomString: (str: string) => void; // Callback to pass the generated string
}

// HandleSubmitComponent
export const HandleSubmitComponent: React.FC<HandleSubmitComponentProps> = ({
  user,
  date,
  compliment,
  imageUris,
  loading,
  setLoading,
  couplename,
  onGenerateRandomString
}) => {
  const handleClick = async () => {
    const success = await handleSubmit(user, { date, compliment, imageUris, couplename }, setLoading)
    if (success) {
      const generatedStr = generateRandomString(couplename, 2)
      onGenerateRandomString(generatedStr) // Invoke the callback with the generated string
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`text-white py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  )
}
