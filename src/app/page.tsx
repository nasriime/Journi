"use client";

import React, { useCallback, useId } from "react";
import AsyncSelect from "react-select/async";
import "@/lib/env";

import { debounce } from "@/lib/helper";
import { OptionType } from "@/lib/types";

import usePage from "@/app/usePage";

export default function HomePage() {
  const { selectedCountry, onChange, getCountries, error } = usePage();

  const loadOptionsDebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      getCountries(inputValue).then((options) => callback(options));
    }, 500),
    []
  );

  return (
    <main>
      <section className="mx-auto max-w-2xl">
        <div className="layout relative flex min-h-screen flex-col items-center py-12">
          <h2 className="w-2/3 mb-4">Find your closest countries</h2>
          <AsyncSelect
            cacheOptions
            instanceId={useId()}
            className="w-2/3"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="country"
            placeholder="Select a country"
            loadOptions={loadOptionsDebounced}
            onChange={(option, meta) =>
              onChange(option as OptionType, meta.action)
            }
          />
          {selectedCountry && (
            <div className="w-2/3 mt-4 flex flex-col md:flex-row justify-between items-center bg-slate-100 px-2 py-4 rounded-md">
              <div>
                <h4>Capital: {selectedCountry.capital}</h4>
                <h4>Language: {selectedCountry.languages[0]["name"]}</h4>
                <h4>Region: {selectedCountry.region}</h4>
              </div>
              <img
                className="w-1/4 h-[70px] mt-3 border-2 rounded-md object-cover"
                src={selectedCountry.flags.svg}
                alt="Flag"
              />
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </section>
    </main>
  );
}
