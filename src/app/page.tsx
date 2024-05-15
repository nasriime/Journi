'use client';

import Head from 'next/head';
import React, { useEffect, useId,useState } from 'react';
import Select  from 'react-select';
import '@/lib/env';

import { IListedCountries } from "@/lib/types";

import usePage  from '@/app/usePage';

export default function HomePage() {
  const { getCountries } = usePage();
  const [listedCountries, setListedCountries] = useState<IListedCountries[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      if (data) {
          setListedCountries(data);
      }
  };

  // fetchData();
  }, [getCountries])

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
