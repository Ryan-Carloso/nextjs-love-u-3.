import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Notify from './notify'; // Adjust the import path as necessary

interface PreviewProps {
  imageUris: string[];
  compliment: string;
  dateTime: Date;
}

const Preview: React.FC<PreviewProps> = ({ imageUris, compliment, dateTime }) => {
  const [timeElapsed, setTimeElapsed] = useState<string>("");

  const calculateElapsedTime = () => {
    const now = new Date();
    const diff = now.getTime() - new Date(dateTime).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let elapsedParts: string[] = [];
    if (years > 0) elapsedParts.push(`${years} years`);
    if (months % 12 > 0) elapsedParts.push(`${months % 12} months`);
    if (days % 30 > 0 || years > 0 || months > 0) elapsedParts.push(`${days % 30} days`);
    if (hours % 24 > 0 || years > 0 || months > 0 || days > 0) elapsedParts.push(`${hours % 24} hours`);
    if (seconds % 60 > 0 || years > 0 || months > 0 || days > 0 || hours > 0) elapsedParts.push(`${seconds % 60} seconds`);

    setTimeElapsed(elapsedParts.join(", "));
  };

  useEffect(() => {
    const intervalId = setInterval(calculateElapsedTime, 1000);
    return () => clearInterval(intervalId);
  }, [dateTime]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[375px] h-[812px]">
        {/* iPhone Mockup with lower z-index */}
        <Image
          src="/mookup.png" // Your mockup image
          alt="iPhone Mockup"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl shadow-lg z-0" // Set a lower z-index
        />

        {/* Notification with higher z-index */}
        <div className="absolute top-14 left-4 right-4 z-10"> {/* Adjusted the z-index here */}
          <Notify compliment={compliment} />
        </div>

        {/* Image Section */}
        <div className="absolute top-[100px] mt-28 left-0 right-0 flex justify-center items-center">
          <div className="relative w-72 h-96">
            {imageUris.length > 0 ? (
              <Image
                src={imageUris[0]} // Show the first image
                alt="Uploaded image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              <p className="text-gray-500">No images uploaded.</p>
            )}
          </div>
        </div>

        <div className="absolute mx-8 bottom-36 left-0 right-0 text-center text-sm text-gray-600">
          {compliment || "No compliment provided."}
        </div>

        {/* Time Elapsed */}
        <div className="absolute mx-8 bottom-16 left-0 right-0 text-center text-sm text-gray-600">
          <p>
            Time since your special moment:{" "}
            <span className="font-semibold">{timeElapsed || "Just now!"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
