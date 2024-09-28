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
    >
      {alert}    
    </button>
  );
};

export default AlertGoPay;
