"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation'; 
import OpenAppButton from '@/functions/OpenAppButton'; // Import the button component


const Share = () => {
  const searchParams = useSearchParams();
  const appUrl = searchParams.get('appUrl');
  const logoUrl = searchParams.get('logoUrl');

  return (
    <div>
      <h1>Share Page</h1>
      <p>App URL: {appUrl}</p>
      <img src={logoUrl} alt="Logo" />
      <OpenAppButton appUrl={appUrl} logoUrl="/logo.png" />

    </div>
  );
};

export default Share;
