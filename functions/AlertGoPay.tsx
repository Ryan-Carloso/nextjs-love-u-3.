// AlertGoPay.tsx

import React from 'react';

interface AlertGoPayProps {
  alert: string; // Define the type of the alert prop
}

const AlertGoPay: React.FC<AlertGoPayProps> = ({ alert }) => {
  const handleScroll = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={handleScroll}
      className='flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-400 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400'
    >
      {alert}    
    </button>
  );
};

export default AlertGoPay;
