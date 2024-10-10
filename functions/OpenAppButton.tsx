import React, { useEffect, useState } from 'react';

interface OpenAppButtonProps {
  appUrl: string;
}

const OpenAppButton: React.FC<OpenAppButtonProps> = ({ appUrl }) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web' | null>(null);

  // This useEffect will only run on the client side (in the browser)
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (platform === 'ios') {
      // Allow the link to work for iOS users
      return;
    } else if (platform === 'android') {
      e.preventDefault(); // Prevent the default link behavior
      alert('We are building for Android. Please wait :)');
    } else if (platform === 'web') {
      e.preventDefault(); // Prevent the default link behavior
      alert('We are building for the web. Please wait :)');
    }
  };

  return (
    <a href={platform === 'ios' ? appUrl : '#'} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      click here to open the app
    </a>
  );
};

export default OpenAppButton;
