import React from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// Initialize Supabase client
const supabase = createClient('https://laqxbdncmapnhorlbbkg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY');

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

  const emailSupport = () => {
    window.location.href = 'mailto:support@loveu365days.com';
  };

  return (
    <div>
      <div className=' flex row justify-center'>
      <h1 className='flex justify-center text-2xl'>Love u 365 Days!</h1>
      <Image src="/icon.png" alt="Icon" width={50} height={50} />
      </div>
      {/* Email Input Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="mt-1 p-2 border border-gray-300 rounded"
          value={value} // Use the value prop here
          onChange={(e) => onChangeText(e.target.value)} // Call onChangeText
          placeholder="Enter your email"
        />
        <button onClick={sendMagicLink} className="mx-2 bg-blue-500 text-white py-2 px-4 rounded">
          Send Magic Link
        </button>
      </div>

      {/* Support Email Button */}
      <div className='flex justify-center text-s'>
        <button onClick={emailSupport} className='bg-blue-500 text-white py-1 px-2 rounded'>
          Need support?
        </button>
      </div>
      <p className='flex justify-center text-xs py-2'>Click above for email contact</p>
    
      {/* Videos Carousel */}
      
    </div>
  );
};

export default Auth;
