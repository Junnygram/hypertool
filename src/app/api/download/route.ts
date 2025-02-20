import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url, title }: { url?: string; title?: string } = await req.json();
    if (!url || !title) {
      return NextResponse.json(
        { status: 'error', message: 'YouTube URL and title are required' },
        { status: 400 }
      );
    }

    // Set download path with the confirmed title
    const outputPath = path.join(
      process.cwd(),
      'downloads',
      `${title}.%(ext)s`
    );

    const downloadCommand = `yt-dlp -f best -o "${outputPath}" "${url}"`;

    // Return a single promise that will be resolved
    return new Promise<NextResponse>((resolve) => {
      // First, immediately respond that the download has started
      // This will allow the client to know the request was accepted
      resolve(
        NextResponse.json({
          status: 'started',
          message: `Started download for ${title}...`,
        })
      );

      // The exec runs asynchronously in the background
      // This won't affect the response above since we already resolved
      exec(downloadCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('Download failed:', stderr);
        } else {
          console.log('Download completed:', stdout);
        }
      });
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error', details: error },
      { status: 500 }
    );
  }
}
