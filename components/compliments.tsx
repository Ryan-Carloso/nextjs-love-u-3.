// components/Compliments.tsx
import React from 'react';

interface ComplimentsProps {
  compliment: string;
  couplename: string;
  setCompliment: (compliment: string) => void;
  setCouplename: (couplename: string) => void; // Fixed parameter name
}

const Compliments: React.FC<ComplimentsProps> = ({ compliment, setCompliment, couplename, setCouplename }) => {
  return (
    <div className="mb-4">
      <label htmlFor="couplename" className="block text-sm font-medium mt-2 text-gray-700">
        Couple's name:
      </label>
      <textarea
        id="couplename" // Changed id to "couplename"
        value={couplename}
        onChange={(e) => setCouplename(e.target.value)}
        placeholder="Noah and Mary"
        rows={1} // Changed rows to 1 for better UX
        className="pl-1 mt-1 w-full text-gray-700 h-8 sm:text-sm border-2 border-pink-400 rounded-md focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out"
        aria-describedby="couplename-description" // Updated aria-describedby
      />
      <p id="couplename-description" className="mt-1 text-sm mb-4 text-gray-500">
        Add your couple's name to see it preview.
      </p>
      <label htmlFor="compliment" className="block text-sm  font-medium text-gray-700">
        Share Your Love Compliment
      </label>
      <textarea
        id="compliment"
        value={compliment}
        onChange={(e) => setCompliment(e.target.value)}
        placeholder='Express your love! E.g., "I will love you every day for the rest of my life." "I want to spend every moment by your side."'
        rows={4}
        className="pl-1 mt-1 block text-gray-700 w-full sm:text-sm border-2 border-pink-400 rounded-md focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out"
        aria-describedby="compliment-description"
      />
      <p id="couplename-description" className="mt-1 text-sm mb-4 text-gray-500">
      Your compliment will appear daily in notifications and on the app's homepage.</p>
    </div>
  );
}

export default Compliments;
