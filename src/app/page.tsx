'use client';

import Head from 'next/head';
import React, { useEffect, useId } from 'react';
import Select  from 'react-select';
import '@/lib/env';

import { OptionType } from "@/lib/types";

import usePage  from '@/app/usePage';

export default function HomePage() {
  const {  listedCountries,
          setListedCountries,
          selectedCountry,
          getCountries,
          onChange
        } = usePage();
 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      if (data) {
          setListedCountries(data);
      }
  };

  fetchData();
  }, [])

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
          onChange={(option) => onChange((option as OptionType))}
          />
          {selectedCountry && <>
            <h1>{selectedCountry.name}</h1>
            <h1>{selectedCountry.capital}</h1>
          </>}
        </div>
      </section>
    </main>
  );
}
