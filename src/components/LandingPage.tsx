'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const [visitCount, setVisitCount] = useState('0');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setVisitCount(data.count));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl w-full text-center px-6 py-12">
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-500 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          HyperTool
        </h1>

        <p className="text-xl mt-4 text-gray-300">
          Supercharge your digital experience with powerful AI and media tools
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-800 rounded-xl p-6 transform transition hover:scale-105">
            <div className="text-green-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">AI Chatbot</h2>
            <p className="text-gray-400 mb-4">
              Get instant answers, creative content, and smart assistance
              powered by advanced AI
            </p>
            <Link
              href="/chat"
              className="inline-block bg-green-500 px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Start Chatting
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 transform transition hover:scale-105">
            <div className="text-blue-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Video Downloader</h2>
            <p className="text-gray-400 mb-4">
              Download videos from multiple platforms quickly and easily in high
              quality formats
            </p>
            <Link
              href="/download"
              className="inline-block bg-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Download Now
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-gray-400 mb-6">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex justify-center space-x-6">
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">
              Lightning Fast
            </span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">
              Easy to Use
            </span>
            <span className="px-4 py-2 bg-gray-800 rounded-full text-sm">
              Secure
            </span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <a href="" className="text-sm text-gray-500 hover:text-white mx-2">
            About
          </a>
          <a href="" className="text-sm text-gray-500 hover:text-white mx-2">
            Privacy
          </a>
          <a href="" className="text-sm text-gray-500 hover:text-white mx-2">
            Contact
          </a>
        </div>

        <p className="text-sm mt-4 text-gray-600">
          This page has been accessed{' '}
          <span className="font-bold">{visitCount}</span> times.
        </p>
      </div>
    </main>
  );
};

export default LandingPage;
