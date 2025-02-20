import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// OR (alternative using path.resolve)
const filePath = path.resolve('./count.csv');

// // Define CSV file path
// const filePath = path.join(process.cwd(), 'count.csv');

export async function GET() {
  let count = 1;

  try {
    // Read count from CSV if it exists
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8').trim();
      count = data ? parseInt(data) + 1 : 1;
    }

    // Write updated count back to CSV
    fs.writeFileSync(filePath, count.toString());
  } catch (error) {
    console.error('Error updating count:', error);
  }

  return NextResponse.json({ count: formatNumber(count) });
}

// Helper function to format numbers
const formatNumber = (num: number) => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + 'M';
  if (num >= 1_000)
    return (num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1) + 'K';
  return num.toString();
};
