import React from 'react';

interface HeaderProps {
  user: { email: string };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Love you 365 days a year</h1>
      <p className="black text-xl flex justify-center">Welcome, {user.email}</p> {/* Display the user's email */}
    </div>
  );
};

export default Header;