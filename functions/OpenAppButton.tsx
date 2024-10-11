import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore
import QRious from 'qrious';
import html2canvas from 'html2canvas'; // Import html2canvas

interface OpenAppButtonProps {
  appUrl: string;
}

const OpenAppButton: React.FC<OpenAppButtonProps> = ({ appUrl }) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web' | null>(null);
  const qrRef = useRef<HTMLCanvasElement | null>(null); // Reference for the QR code canvas
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference for the container to be captured

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        setPlatform('ios');
      } else if (/Android/i.test(userAgent)) {
        setPlatform('android');
      } else {
        setPlatform('web');
      }
    }
  }, []);

  useEffect(() => {
    if (platform === 'ios' && qrRef.current) {
      // Generate QR code when the platform is iOS
      new QRious({
        element: qrRef.current,
        value: appUrl,
        size: 150, // Set QR code size
      });
    }
  }, [platform, appUrl]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (platform === 'ios') {
      return; // Allow link to work for iOS
    } else if (platform === 'android') {
      e.preventDefault();
      alert('We are building for Android. Please wait :)');
    } else if (platform === 'web') {
      e.preventDefault();
      alert('We are building for the web. Please wait :)');
    }
  };



  return (
    <div className="flex flex-col items-center justify-center p-6" ref={containerRef}>
      {platform === 'ios' ? (
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold">Scan the QR code to open the app on iOS:</p>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-center">
            <canvas ref={qrRef} className="block" /> {/* Canvas for QR code */}
          </div>
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-500 hover:underline">
            or click here to open the app
          </a>
        </div>
      ) : (
        <a 
          href="#" 
          onClick={handleClick} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-pink-500 hover:underline"
        >
          click here to open the app
        </a>
      )}
    </div>
  );
};

export default OpenAppButton;
