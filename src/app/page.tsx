'use client';

import Head from 'next/head';
import React, { useEffect, useId, useState } from 'react';
import Select from 'react-select';
import '@/lib/env';

import countries  from '@/data/countries.json';
interface IListedCountries {
  label: string;
  value: string;
}
export default function HomePage() {
  const [listedCountries, setListedCountries] = useState<IListedCountries[]>([]);

  useEffect(() => {
    const options = countries.map(country => ({
      label: country.name, 
      value: country.name
    }));

    setListedCountries(options) 
  },[])

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
        <Select
          instanceId={useId()}
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          name="country"
          options={listedCountries}
      />
        </div>
      </section>
    </main>
  );
}
