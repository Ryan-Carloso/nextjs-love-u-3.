import React from 'react';
import Image from 'next/image';

interface NotifyProps {
  compliment: string;
}

const Notify: React.FC<NotifyProps> = ({ compliment }) => {
  return (
    <div className="mt-4 mx-4 h-16 bg-gray-400 bg-opacity-80 rounded-xl flex items-center text-gray-900 font-semibold text-md shadow-md px-4 overflow-hidden">
      <div className=" flex items-center">
        <Image
          src="/icon.png" // replace with actual logo path
          alt="LoveU365 Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      <div className=" ">
      <h1 className=" text-m ml-2 text-gray-50 mb-3">LOVEU365</h1> {/* Alterado para text-sm */}
        </div>
      </div>
      <div className="">
        <h1 className="  text-gray-500 -ml-8 mt-6 text-m truncate "> {/* Adicionado truncate e text-sm */}
          {compliment || "No compliment provided."}
        </h1>
      </div>
    </div>
  );
};

export default Notify;
