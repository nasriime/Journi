'use client';

import React, { useId } from 'react';
import AsyncSelect from 'react-select/async';
import '@/lib/env';

import { OptionType } from "@/lib/types";

import usePage  from '@/app/usePage';

export default function HomePage() {
  const {  
          selectedCountry,
          onChange,
          getCountries
        } = usePage();

  const promiseOptions = async (inputValue: string) =>
    new Promise<OptionType[]>((resolve) => {
        getCountries(inputValue)
          .then(results => {
              resolve(results || []);
          });
    });

  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
        <AsyncSelect
          instanceId={useId()}
          className="w-full"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          name="country"
          placeholder="Select a country"
          loadOptions={promiseOptions}
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
