'use client';

import React, { useEffect, useId } from 'react';
import Select  from 'react-select';
import '@/lib/env';

import { listingCountries } from '@/lib/helper';
import { OptionType } from "@/lib/types";

import usePage  from '@/app/usePage';

export default function HomePage() {
  const {  
          listedCountries,
          setListedCountries,
          selectedCountry,
          getCurrentCountry,
          onChange
        } = usePage();
 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentCountry();
      if (data) {
        const list = listingCountries(data.results.lat, data.results.lon);
        setListedCountries(list);
      }
    };

    fetchData();
  }, [])

  return (
    <main>
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
