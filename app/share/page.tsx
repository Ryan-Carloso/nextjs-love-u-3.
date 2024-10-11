"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; 
import OpenAppButton from '@/functions/OpenAppButton'; // Import the button component
import html2canvas from 'html2canvas'; // Import html2canvas
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Share: React.FC = () => {
  const searchParams = useSearchParams();
  const appUrl: string | null = searchParams.get('appUrl');
  const logoUrl: string | null = searchParams.get('logoUrl');

  // Check if appUrl is available
  if (!appUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-pink-600 text-center mb-4">Error</h1>
          <p className="text-gray-700 text-center">App URL is missing!</p>
        </div>
      </div>
    );
  }

  // Function to take a screenshot of the entire screen
  const downloadScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png'); // Get data URL of the canvas
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'screenshot.png'; // Specify the download file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove the link after downloading
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">Love u 365 days!</h1>
        <p className="text-gray-700 text-center mb-4">
          App URL: <span className="font-semibold">{appUrl}</span>
        </p>
        
        {logoUrl && (
          <img src={logoUrl} alt="Logo" className="rounded-lg transition-transform transform hover:scale-105" />
        )}
        
        <OpenAppButton appUrl={appUrl} />

        <div className="flex justify-center">
          <button 
            onClick={downloadScreenshot}
            className="bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            Download Screenshot
          </button>
        </div>
        
        <div className="flex justify-center mt-2">
          <div className='text-black'>make4ryan</div>
          <div className="ml-1">
            <FontAwesomeIcon icon={faInstagram} size="1x" className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component in Suspense when exporting
const SuspenseWrapper: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Share />
  </Suspense>
);

export default SuspenseWrapper;
