import React from 'react';

export default function HowWorks() {
  const steps = [
    { title: "Share Your Heartfelt Details", description: "Enter your information, including a start date and a sweet message, then watch your love story come to life with a personalized preview of your gift." },
    { title: "Secure Your Love's Surprise", description: "Complete your purchase effortlessly and securely, ensuring a delightful gifting experience that brings smiles." },
    { title: "Customize with Love", description: "Add cherished photos and unique compliments that truly resonate with your relationship, making it a gift from the heart." },
    { title: "Receive Your Special Code", description: "Get a unique code after confirmation, unlocking the magic of our app and activating your thoughtful gift." },
    { title: "Delight Your Beloved!", description: "Unveil your gift and savor the moment as their eyes light up with joy, celebrating your love together!" },
  ];

  return (
    <div className="bg-pink-50 p-4 md:p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">How It Works</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white border border-pink-200 rounded-lg p-4 flex items-start space-x-4 md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
            <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 font-semibold">{index + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-pink-600 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
