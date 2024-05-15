import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch ip');
    }
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: `Failed because of ${error}` }, { status: 500 });  
  }
};
