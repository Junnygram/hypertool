'use client';
import { useState } from 'react';

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  // Extract video ID from YouTube URL
  const extractVideoId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|v\/|.*[?&]v=))([^"&?\/\s]+)/
    );
    return match ? match[1] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);

    const videoId = extractVideoId(inputUrl);
    if (videoId) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else {
      setThumbnail(null);
    }
  };

  const handleDownload = async () => {
    if (!url) return;

    setStatus('downloading');
    setMessage('Starting download...');

    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.status === 'completed') {
      setStatus('completed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">YouTube Video Downloader</h1>

      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={handleUrlChange}
        className="mt-4 px-4 py-2 w-80 bg-gray-800 border border-gray-600 rounded-md focus:outline-none"
      />

      {thumbnail && (
        <div className="mt-4">
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-80 rounded-lg"
          />
        </div>
      )}

      {url && (
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
      )}

      {message && <p className="mt-4 text-gray-300">{message}</p>}
    </div>
  );
}
