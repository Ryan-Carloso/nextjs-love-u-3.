import React from 'react';

interface HeaderProps {
  user: { email: string };
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div>
      <p className="black text-xl flex justify-center">**** you 365 days!</p>
      <p className="black text-xl flex justify-center">Welcome, {user.email}</p> {/* Display the user's email */}
    </div>
  );
};

export default Header;