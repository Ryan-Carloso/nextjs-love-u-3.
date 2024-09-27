import React from 'react';
import Image from 'next/image';

interface NotifyProps {
  compliment: string;
}

const Notify: React.FC<NotifyProps> = ({ compliment }) => {
  return (
    <div className="h-16 bg-gray-400 bg-opacity-80 rounded-xl flex items-center text-gray-900 font-semibold text-md shadow-md px-4">
      <div className="flex items-center">
        <Image
          src="/icon.png" // substitua pelo caminho real do logo
          alt="LoveU365 Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-2">
          <h1 className="text-sm text-gray-50 mb-1">LOVEU365</h1>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-gray-500 mt-2 text-sm truncate">
          {compliment || "No compliment provided."}
        </h1>
      </div>
    </div>
  );
};

export default Notify;
