import React from 'react';
import { User } from '@supabase/supabase-js'; // Import the User type from Supabase

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({  }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Love you 365 days a year</h1>
      <p className="black text-xl flex justify-center">
        Welcome
      </p>
    </div>
  );
};

export default Header;
