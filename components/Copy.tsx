// Copy.tsx

import React from 'react';

const Copy = () => {
  return (
    <div className="bg-pink-50 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-bold text-pink-600 text-center mb-4">💖 Why Buy a Special Gift for Your Girlfriend/Spouse?</h3>
      <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
        <ul className="list-disc list-inside text-left mb-4 lg:mb-0 lg:max-w-md">
          <li className="mb-2">
            🌟 <strong>Show Your Love</strong>: A thoughtful gift is a beautiful way to express your feelings and remind her how much she means to you.
          </li>
          <li className="mb-2">
            💖 <strong>Create Lasting Memories</strong>: Gifts can create cherished memories that you both will look back on with joy.
          </li>
          <li className="mb-2">
            🎉 <strong>Make Her Feel Special</strong>: A personalized gift shows that you truly understand her, making her feel valued and appreciated.
          </li>
        </ul>
        <ul className="list-disc list-inside text-left lg:max-w-md">
          <li className="mb-2">
            🌈 <strong>Celebrate Special Moments</strong>: Whether it’s a birthday, anniversary, or just because, gifts help commemorate life’s milestones.
          </li>
          <li className="mb-2">
            💌 <strong>Strengthen Your Bond</strong>: Thoughtful gestures can enhance your relationship and deepen your emotional connection.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Copy;
