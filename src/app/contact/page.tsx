"use client";

import { useState } from 'react';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject,
          text: message,
        }),
      });

      if (response.ok) {
        setSuccess('Email sent successfully!');
        setEmail('');
        setSubject('');
        setMessage('');
        setError('');
      } else {
        const { error } = await response.json();
        setError(error);
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred while sending the email.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Send an Email</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">To</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700">Subject</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Send Email
      </button>
    </form>
  );
}
