// HowWorks.tsx

import React from 'react';

const HowWorks = () => {
  return (
    <div className="bg-pink-50 p-6 rounded-lg shadow-lg text-center mb-8">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">How It Works ❤️</h1>
      <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-8">
        <div className="mb-6 lg:mb-0">
          <span className="text-3xl">1️⃣</span>
          <h2 className="text-lg font-semibold mt-2">Fill in Your Details</h2>
          <p className="text-gray-700">
            Share your love by providing special details, including the date that matters most and your heartfelt message.
          </p>
        </div>
        <div className="mb-6 lg:mb-0">
          <span className="text-3xl">2️⃣</span>
          <h2 className="text-lg font-semibold mt-2">See the Preview</h2>
          <p className="text-gray-700">
            Witness your creation come to life! Ensure it captures your emotions perfectly before you proceed.
          </p>
        </div>
        <div className="mb-6 lg:mb-0">
          <span className="text-3xl">3️⃣</span>
          <h2 className="text-lg font-semibold mt-2">Make the Payment 💰</h2>
          <p className="text-gray-700">
            Complete your purchase easily and securely, making it all the more exciting to gift your loved one.
          </p>
        </div>
        <div className="mb-6 lg:mb-0">
          <span className="text-3xl">4️⃣</span>
          <h2 className="text-lg font-semibold mt-2">Receive Your Code</h2>
          <p className="text-gray-700">
            Once confirmed, receive a special code to access our app or website and bring your gift to life.
          </p>
        </div>
        <div className="mb-6 lg:mb-0">
          <span className="text-3xl">5️⃣</span>
          <h2 className="text-lg font-semibold mt-2">Surprise Your Loved One! 🎉</h2>
          <p className="text-gray-700">
            Unveil your thoughtful gift and cherish the moment as you see their eyes light up with joy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
