import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    return NextResponse.json({ results: data });
  } catch (error) {
    return NextResponse.json({ error: `Failed because of ${error}` }, { status: 500 });  
  }
};
