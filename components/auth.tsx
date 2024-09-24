import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://laqxbdncmapnhorlbbkg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcXhiZG5jbWFwbmhvcmxiYmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg2MTcyNSwiZXhwIjoyMDQyNDM3NzI1fQ.Xr3j4FThRX5C0Zk5txIqobebk6v5FBf2K5Mahe8vdzY');

const Auth = () => {
  const [email, setEmail] = useState('');

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={sendMagicLink} className="bg-blue-500 text-white py-2 px-4 rounded">
        Send Magic Link
      </button>
    </div>
  );
};

export default Auth;