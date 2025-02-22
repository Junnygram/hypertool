import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url }: { url?: string } = await req.json();

    if (!url) {
      return NextResponse.json(
        { status: 'error', message: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // Fetch the YouTube page HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to fetch video page' },
        { status: 500 }
      );
    }

    const html = await response.text();

    // Extract title from OpenGraph metadata
    const match = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/);
    const videoTitle = match ? match[1] : 'Unknown Title';

    return NextResponse.json({
      status: 'success',
      title: videoTitle,
      message: 'Video title fetched successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to get video title', details: error },
      { status: 500 }
    );
  }
}
