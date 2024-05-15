import { NextResponse } from 'next/server';

import countries  from '@/data/countries.json';

export async function GET() {
  try {
    const options = countries.map(country => ({
      label: country.name, 
      value: country.name
    }));
    return NextResponse.json({ options });
  } catch (error) {
    return NextResponse.json({ error: `Failed because of ${error}` }, { status: 500 });  
  }
};

