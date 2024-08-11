"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

type LoginFormProps = {
  onLoginSuccess: () => void
}

const AuthForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setError('');
      onLoginSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-left">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-left">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default AuthForm;
