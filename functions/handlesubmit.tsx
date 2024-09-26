import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

// Initialize Supabase client using environment variables for security
const supabase = createClient(
  'https://laqxbdncmapnhorlbbkg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY'
); 

// Type Definitions
type User = {
  // Define your user properties here
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

// Data to Submit with Random String
type DataToSubmit = {
  date_time: string;
  elogios: string;
  image_urls: string[];
  random_string: string;
};

// Function to Generate a Random String
const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%£€><';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// Handle Submit Function
export const handleSubmit = async (
  user: User | null,
  { date, compliment, imageUris }: SubmitData,
  setLoading: (loading: boolean) => void
) => {
  if (!user) {
    alert('You must be logged in to submit data.');
    return;
  }

  setLoading(true); // Start Loading

  try {
    if (!date || !compliment) {
      throw new Error('Please fill all fields');
    }

    const randomString = generateRandomString(12); // Generate Random String

    const data: DataToSubmit = {
      date_time: date.toISOString(),
      elogios: JSON.stringify({ text: compliment }),
      image_urls: [],
      random_string: randomString,
    };

    // Upload Images if Any
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

      data.image_urls = imageUrls; // Assign Uploaded Image URLs
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
    setLoading(false); // End Loading
  }
};

// Enhanced Submit Button Component with Beautiful Styling and Animation
export const HandleSubmitComponent = ({
  user,
  date,
  compliment,
  imageUris,
  loading,
  setLoading,
}: SubmitProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-lg">
      <button
        onClick={() => handleSubmit(user, { date, compliment, imageUris }, setLoading)}
        disabled={loading}
        className={`
          relative overflow-hidden
          w-full md:w-64 px-8 py-4
          bg-gradient-to-r from-pink-500 to-purple-600
          text-white text-lg font-bold
          rounded-full shadow-lg
          transition-all duration-300 ease-in-out
          transform hover:scale-105 hover:shadow-xl
          focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75
          ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-pink-600 hover:to-purple-700'}
        `}
      >
        <span className={`${loading ? 'invisible' : 'visible'}`}>
          {loading ? 'Submitting...' : 'Submit Compliment'}
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-1  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
      </button>

      {/* Success Animation (you can add logic to show this after successful submission) */}
      <div className="mt-6 transition-opacity duration-300 ease-in-out" style={{ opacity: 0 }}>
        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>
  );
};