// components/Compliments.tsx
import React from 'react'

interface ComplimentsProps {
  compliment: string
  setCompliment: (compliment: string) => void
}

const Compliments: React.FC<ComplimentsProps> = ({ compliment, setCompliment }) => {
  return (
    <div>
      <label htmlFor="compliment" className="block text-sm font-medium text-gray-700">
        Compliment
      </label>
      <textarea
        id="compliment"
        value={compliment}
        onChange={(e) => setCompliment(e.target.value)}
        placeholder='Enter your compliments here. Separate them with quotation marks, e.g., "I will love you every day for the rest of my life." "I want to spend every moment by your side. I love you!"'
        rows={4}
        className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        aria-describedby="compliment-description"
      />
      <p id="compliment-description" className="mt-1 text-sm text-gray-500">
        Separate your compliments with quotation marks (") to distinguish between them.
      </p>
    </div>
  )
}

export default Compliments
