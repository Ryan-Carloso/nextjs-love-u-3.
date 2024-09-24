// Auth.tsx
import React from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://laqxbdncmapnhorlbbkg.supabase.co', 'your-anon-key');

interface AuthProps {
  value: string;
  onChangeText: (value: string) => void;
}

const Auth: React.FC<AuthProps> = ({ value, onChangeText }) => {
  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: value, // Use the value prop here
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.error('Error:', error.message);
      alert(error.message);
    } else {
      alert('Check your email for the magic link!');
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        className="mt-1 p-2 border border-gray-300 rounded"
        value={value} // Use the value prop here
        onChange={(e) => onChangeText(e.target.value)} // Call onChangeText
        placeholder="Enter your email"
      />
      <button onClick={sendMagicLink} className="bg-blue-500 text-white py-2 px-4 rounded">
        Send Magic Link
      </button>
    </div>
  );
};

export default Auth;
