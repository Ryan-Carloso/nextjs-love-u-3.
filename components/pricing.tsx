import React from 'react';
import { X, Heart } from 'lucide-react';

// Custom Button component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`w-full px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Card components
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden border border-pink-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`px-6 py-4 bg-pink-50 border-b border-pink-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h2 className={`text-2xl font-bold text-pink-600 ${className}`} {...props}>
      {children}
    </h2>
  );
};

const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  );
};

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`px-6 py-4 bg-pink-100 border-t border-pink-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: Array<{ name: string; included: boolean }>;
  checkoutUrl: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic Love",
    price: 13,
    description: "Essential features for keeping love strong.",
    features: [
      { name: "Up to 7 photos", included: true },
      { name: "30 compliments", included: true },
      { name: "Notify He/She every day on mobile!", included: true },
      { name: "Automatic love reminders", included: true },
      { name: "Basic customization", included: true },
      { name: "Email support", included: true },
      { name: "Unlimited photos", included: false },
      { name: "Unlimited compliments", included: false },
      { name: "Advanced customization", included: false },
    ],
    checkoutUrl: "https://checkout.hotmart.com/your-basic-love-link",
  },
  {
    name: "Eternal Love",
    price: 18,
    description: "Unlimited expressions of love, forever.",
    features: [
      { name: "All Basic Love features", included: true },
      { name: "Unlimited photos", included: true },
      { name: "Unlimited compliments", included: true },
      { name: "Automatic love reminders", included: true },
      { name: "Advanced customization", included: true },
    ],
    checkoutUrl: "https://checkout.hotmart.com/your-eternal-love-link",
  },
];

function PricingTierComponent({ tier }: { tier: PricingTier }) {
  const handleChoose = () => {
    // Redirect to the external checkout URL
    window.location.href = tier.checkoutUrl;
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{tier.name}</CardTitle>
        <CardDescription>{tier.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-3xl font-bold text-pink-600 mb-4">
          ${tier.price}
          <span className="text-xl font-normal"> one-time payment</span>
        </p>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              {feature.name && feature.included ? (
                <Heart className="mr-2 h-4 w-4 text-pink-500" />
              ) : feature.name && !feature.included ? (
                <X className="mr-2 h-4 w-4 text-gray-400" />
              ) : <div className='mt-2'></div>}
              {feature.name && feature.name}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleChoose}>Choose {tier.name}</Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingModel() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-600 mb-8">Choose Your Love Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <PricingTierComponent key={index} tier={tier} />
        ))}
      </div>
    </div>
  );
}
