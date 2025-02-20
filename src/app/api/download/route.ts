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

    return new Promise((resolve) => {
      exec(downloadCommand, (error, stdout, stderr) => {
        if (error) {
          resolve(
            NextResponse.json(
              { status: 'error', message: 'Download failed', details: stderr },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({
              status: 'completed',
              message: 'Download finished!',
              output: stdout,
            })
          );
        }
      });

      resolve(
        NextResponse.json({
          status: 'started',
          message: `Downloading ${title}...`,
        })
      );
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error', details: error },
      { status: 500 }
    );
  }
}
