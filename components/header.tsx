import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <div className="text-center py-4">
      {/* Placeholder for logo */}
      <div className="flex justify-center mb-2">
        <Image
          src="/icon.png" // replace with actual logo path
          alt="LoveU365 Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      {/* App Name */}
      <h1 className="text-3xl font-bold text-pink-600 mb-2">LoveU365 ❤️</h1>
      
      {/* Welcome Message */}
      <p className="text-xl text-gray-700">
        Welcome to 365 days of love
      </p>
    </div>
  );
};

export default Header;
