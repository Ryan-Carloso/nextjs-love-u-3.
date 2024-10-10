import React, { useEffect, useState, useRef } from 'react';
import QRious from 'qrious'; // Import QRious

interface OpenAppButtonProps {
  appUrl: string;
}

const OpenAppButton: React.FC<OpenAppButtonProps> = ({ appUrl }) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web' | null>(null);
  const qrRef = useRef<HTMLCanvasElement | null>(null); // Reference for the QR code canvas

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
      const qr = new QRious({
        element: qrRef.current,
        value: appUrl,
        size: 150, // Set QR code size for display
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

  // Function to download the QR code as an image
  const downloadQRCode = () => {
    const qr = new QRious({
      value: appUrl,
      size: 300, // Set QR code size for download
    });

    // Create a new canvas element to hold the QR code for downloading
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = 300;
    downloadCanvas.height = 300;
    const ctx = downloadCanvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(qr.image, 0, 0); // Draw the QR code on the new canvas
      const dataUrl = downloadCanvas.toDataURL('image/png'); // Get data URL of the new canvas
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr_code.png'; // Specify the download file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove the link after downloading
    }
  };

  return (
    <div>
      {platform === 'ios' ? (
        <div>
          <p>Scan the QR code to open the app on iOS:</p>
          <div className="bg-white p-4" style={{ display: 'inline-block', borderRadius: '8px' }}>
            <canvas ref={qrRef} /> {/* Canvas for QR code */}
          </div>
          <div className="mt-2">
            <button 
              onClick={downloadQRCode} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Download QR Code
            </button>
          </div>
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            or click here to open the app
          </a>
        </div>
      ) : (
        <a href="#" onClick={handleClick} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          click here to open the app
        </a>
      )}
    </div>
  );
};

export default OpenAppButton;
