'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>(
    'idle'
  );
  // const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const extractVideoId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|v\/|.*[?&]v=))([^"&?\/\s]+)/
    );
    return match ? match[1] : null;
  };

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    // setVideoTitle(null);
    // setThumbnail(null);
    setLoading(true);

    const videoId = extractVideoId(inputUrl);
    if (videoId) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);

      const res = await fetch('/api/download/get-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await res.json();
      console.log({ videoTitle, url, status });

      if (data.status === 'success') {
        setVideoTitle(data.title);
      } else {
        setVideoTitle(null);
      }
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!url || !videoTitle) return;

    setStatus('downloading');
    // setMessage('Starting download...');

    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, title: videoTitle }),
    });

    const data = await res.json();
    // setMessage(data.message);

    if (data.status === 'completed') {
      setStatus('completed');
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-8 ">Video Downloader</h1>

      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={handleUrlChange}
        className="mt-4 px-4 py-2 w-80 bg-gray-800 border border-gray-600 rounded-md focus:outline-none"
      />

      {/* Skeleton Loader */}
      {loading && (
        <div className="mt-4 w-80 h-44 bg-gray-700 animate-pulse rounded-lg"></div>
      )}

      {!loading && thumbnail && (
        <div className="mt-4">
          <Image
            height={500}
            width={500}
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-80 rounded-lg"
          />
        </div>
      )}

      {!loading && videoTitle && (
        <p className="mt-2 p-2 text-lg text-gray-300 text-center">
          Video: {videoTitle}
        </p>
      )}

      {/* {!loading && videoTitle && ( */}
      {/* <button
        onClick={handleDownload}
        disabled={status === 'downloading'}
        className={`mt-4 px-6 py-2 rounded-lg transition ${
          loading && status === 'downloading'
            ? 'bg-gray-600 cursor-not-allowed bg-gray-300'
            : // : loading
              // ? 'cursor-not-allowed bg-gray-300'
              'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {status === 'downloading' ? 'Downloading...' : 'Download'}
      </button> */}

      {!loading && videoTitle ? (
        <button
          onClick={handleDownload}
          disabled={status === 'downloading'}
          className={`mt-4 px-6 py-2 rounded-lg transition ${
            status === 'downloading'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {status === 'downloading' ? 'Downloading...' : 'Download'}
        </button>
      ) : (
        <button
          disabled
          className="mt-4 px-6 py-2 rounded-lg bg-gray-300 cursor-not-allowed"
        >
          Download
        </button>
      )}

      {/* )} */}

      {/* {message && <p className="mt-4 text-gray-300">{message}</p>} */}
    </div>
  );
}
