// components/SocialMedia.tsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const SocialMedia = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center mt-6">App Made By Ryan</h1>

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
          onClick={() => openLink('https://www.tiktok.com/@madebryan')}
        >
          <FontAwesomeIcon icon={faTiktok} size="2x" className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
