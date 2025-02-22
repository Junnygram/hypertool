import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HyperTool - AI & Media Tools',
  description:
    'Supercharge your digital experience with AI chatbots and a powerful video downloader.',
  keywords:
    'AI chatbot, video downloader, YouTube downloader, media tools, AI assistant',
  // openGraph: {
  //   title: 'HyperTool - AI & Media Tools',
  //   description:
  //     'Supercharge your digital experience with AI chatbots and a powerful video downloader.',
  //   url: 'https://yourdomain.com',
  //   type: 'website',
  //   images: [
  //     {
  //       url: 'https://yourdomain.com/og-image.jpg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'HyperTool - AI & Media Tools',
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
