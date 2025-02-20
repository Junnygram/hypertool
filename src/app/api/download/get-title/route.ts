import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const { url }: { url?: string } = await req.json();

    if (!url) {
      return NextResponse.json(
        { status: 'error', message: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // Get video title before downloading
    const titleCommand = `yt-dlp --print title "${url}"`;
    const { stdout: title } = await execPromise(titleCommand);
    const videoTitle = title.trim();

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
