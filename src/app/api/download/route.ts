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

    // Run the download in the background
    exec(downloadCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Download failed:', stderr);
      } else {
        console.log('Download completed:', stdout);
      }
    });

    // Return response immediately before command completes
    return NextResponse.json({
      status: 'started',
      message: `Started download for ${title}...`,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
