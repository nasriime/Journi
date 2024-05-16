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
      <section className="mx-auto max-w-2xl">
        <div className="layout relative flex min-h-screen flex-col justify-center py-12">
          <h2 className="mb-8">Find your closest countries</h2>
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
          {selectedCountry && <div className="mt-8">
            <h4>Country: {selectedCountry.name}</h4>
            <h4>Capital: {selectedCountry.capital}</h4>
          </div>}
        </div>
      </section>
    </main>
  );
}
