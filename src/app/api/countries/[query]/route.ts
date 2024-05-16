import { NextResponse } from 'next/server';

import { listingCountries } from '@/lib/helper';



export async function GET(request: Request, { params }: { params: { query: string } }) {
  try {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    
    const list = listingCountries(data.lat, data.lon);
    const options = list.filter(country => country.value.toLowerCase().includes(params.query.toLowerCase())); 
    return NextResponse.json({ results: options });
  } catch (error) {
    return NextResponse.json({ error: `Failed because of ${error}` }, { status: 500 });  
  }
};

