// components/SocialMedia.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const SocialMedia = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const emailSupport = () => {
    window.location.href = 'mailto:support@makedbyryan.tech';
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-gray-600 mt-6">App Made By Ryan</h1>

      <div className="flex justify-center my-6">
        <button
          className="mx-5 focus:outline-none"
          onClick={() => openLink('https://www.linkedin.com/in/ryancarlos/')}
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-black" />
        </button>
        <button
          className="mx-5 focus:outline-none"
          onClick={() => openLink('https://instagram.com/make4ryan')}
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" className="text-black" />
        </button>
        <button
          className="mx-5 focus:outline-none"
          onClick={() => openLink('https://www.tiktok.com/@make4ryan')}
        >
          <FontAwesomeIcon icon={faTiktok} size="2x" className="text-black" />
        </button>
              {/* Support Email Button */}
      <div className='flex justify-center text-s'>
        <button onClick={emailSupport} className='bg-blue-500 text-white py-1 px-2 rounded'>
          Need support?
        </button>
      </div>


      </div>
    </div>
  );
};

export default SocialMedia;
