import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url }: { url?: string } = await req.json();

    if (!url) {
      return NextResponse.json(
        { status: 'error', message: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    const outputPath = path.join(
      process.cwd(),
      'downloads',
      '%(title)s.%(ext)s'
    );
    const command = `yt-dlp -f best -o "${outputPath}" "${url}"`;

    return new Promise((resolve) => {
      let progress = 'Downloading...';

      const process = exec(command, (error, stdout, stderr) => {
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

      process.stdout?.on('data', (data) => {
        console.log('Download Progress:', data);
        progress = 'Downloading...';
      });

      resolve(NextResponse.json({ status: 'started', message: progress }));
    });
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
