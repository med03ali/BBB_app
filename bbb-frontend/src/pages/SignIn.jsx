import React from 'react';
import SignInForm from "../components/auth/SinInForm";

export default function SignIn({ onSignIn }) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <SignInForm onSignIn={onSignIn} />
    </div>
  );
}
