// components/Compliments.tsx
import React from 'react';

interface ComplimentsProps {
  compliment: string;
  setCompliment: (compliment: string) => void;
}

const Compliments: React.FC<ComplimentsProps> = ({ compliment, setCompliment }) => {
  return (
    <div className="mb-4">
      <label htmlFor="compliment" className="block text-sm font-medium text-gray-700">
        Share Your Love Compliment
      </label>
      <textarea
        id="compliment"
        value={compliment}
        onChange={(e) => setCompliment(e.target.value)}
        placeholder='Express your love! E.g., "I will love you every day for the rest of my life." "I want to spend every moment by your side."'
        rows={4}
        className="mt-1 block w-full sm:text-sm border-2 border-pink-400 rounded-md focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out"
        aria-describedby="compliment-description"
      />
      <p id="compliment-description" className="mt-1 text-sm text-gray-500">
        Use quotation marks (") to separate your beautiful thoughts.
      </p>
    </div>
  );
}

export default Compliments;
