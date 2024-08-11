"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-6">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          SaaS Boilerplate
        </Link>
        <nav>
          <Link href="/" className="text-gray-800 mx-2 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-800 mx-2 hover:text-blue-500">
            About
          </Link>
          <Link href="/contact" className="text-gray-800 mx-2 hover:text-blue-500">
            Contact
          </Link>
          {status === 'authenticated' ? (
            <>
              <Link href="/pricing" className="text-gray-800 mx-2 hover:text-blue-500">
                Pricing
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-800 mx-2 hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="text-gray-800 mx-2 hover:text-blue-500">
                Register
              </Link>
              <Link href="/login" className="text-gray-800 mx-2 hover:text-blue-500">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
