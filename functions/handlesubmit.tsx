import React from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Initialize Supabase client
const supabase = createClient(
  'https://laqxbdncmapnhorlbbkg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY' // Replace with your actual key
);

// Define User type
type User = {
  id: string;
  email: string;
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
  random_string: string;
  couplename: string;
};

// Function to generate a random 2-character alphanumeric string and remove spaces from couplename
const generateRandomString = (couplename: string, length: number = 2): string => {
  // Remove all whitespace characters from couplename
  const sanitizedCouplename = couplename.replace(/\s+/g, '');

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz><';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return `${sanitizedCouplename}${result}`; // Example: "RyanandSofia❤️J%"
};

// Upload an image to Firebase storage using Axios
const uploadImageToFirebase = async (uri: string, folderPath: string, imageName: string): Promise<string> => {
  const uploadURL = `https://firebasestorage.googleapis.com/v0/b/loveu365-cbc03.appspot.com/o/${encodeURIComponent(folderPath + '/' + imageName)}?uploadType=media`;

  try {
    const response = await fetch(uri); // Get image from URI
    const blob = await response.blob(); // Convert to blob

    const formData = new FormData();
    formData.append('file', blob, imageName); // Append blob as 'file'

    // Make Axios request to Firebase storage
    const uploadResponse = await axios.post(uploadURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (uploadResponse.status === 200) {
      // Build the download URL based on Firebase Storage rules
      return `https://firebasestorage.googleapis.com/v0/b/loveu365-cbc03.appspot.com/o/${encodeURIComponent(folderPath + '/' + imageName)}?alt=media`;
    }

    throw new Error('Failed to upload image');
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
};

// handleSubmit function
export const handleSubmit = async (
  user: User | null, // Allow user to be null
  { date, compliment, imageUris, couplename }: SubmitData,
  setLoading: (loading: boolean) => void
): Promise<string | null> => {
  if (!user) {
    alert('You must be logged in to submit data.');
    return null;
  }

  if (imageUris.length === 0) {
    alert('Please upload at least one photo.');
    return null;
  }

  if (!compliment || compliment.trim() === '') {
    alert('Please enter at least one compliment.');
    return null;
  }

  if (!couplename || couplename.trim() === '') {
    alert("Please enter the couple's name.");
    return null;
  }

  setLoading(true); // Set loading to true

  try {
    if (!date) {
      throw new Error('Please select a date');
    }

    const randomString = generateRandomString(couplename, 3); // Generate the random string without spaces

    const folderPath = `couples/${randomString}`; // Use the same folder path for all images

    const data: DataToSubmit = {
      date_time: date.toISOString(),
      elogios: JSON.stringify({ text: compliment }),
      image_urls: [], // Initialize image_urls as an empty array
      random_string: randomString, // Include the random string in the data
      couplename: couplename.replace(/\s+/g, ''), // Store couplename without spaces
    };

    // Upload all images and collect their URLs
    const imageUrls: string[] = await Promise.all(
      imageUris.map(async (uri, index) => {
        const imageName = `image-${index + 1}-${Date.now()}.jpg`; // Generate unique image name with index
        const imageUrl = await uploadImageToFirebase(uri, folderPath, imageName); // Upload image and get the URL
        return imageUrl; // Return the image URL
      })
    );

    data.image_urls = imageUrls; // Save all image URLs

    // Insert the data into Supabase
    const { error } = await supabase.from('users').insert(data);

    if (error) throw error;

    alert('Data submitted successfully!');
    return randomString; // Return the generated string
  } catch (error) {
    console.error('Error submitting data:', error);
    alert('Error submitting data. Please try again.');
    return null; // Return null on error
  } finally {
    setLoading(false); // Set loading to false
  }
};

// Props for HandleSubmitComponent including the callback
type HandleSubmitComponentProps = {
  user: User | null;
  date: Date;
  compliment: string;
  imageUris: string[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  couplename: string;
  onGenerateRandomString: (str: string) => void; // Callback to pass the generated string
};

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
}) => {const handleClick = async () => {
  const generatedStr = await handleSubmit(user, { date, compliment, imageUris, couplename }, setLoading);
  if (generatedStr) {
    onGenerateRandomString(generatedStr); // Pass the generated string to the parent
  }
};

return (
  <div>
    <button
      onClick={handleClick}
      disabled={loading}
      className={`text-white py-2 px-4 rounded flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <>
          Submitting...
          <div className="spinner ml-2"></div> {/* Spinner beside the text */}
        </>
      ) : (
        'Submit'
      )}
    </button>

    <style jsx>{`
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #fff;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);
  };
