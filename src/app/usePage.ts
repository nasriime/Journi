import { useState } from "react";

import { countryType, OptionType } from "@/lib/types";

import countries from '@/data/countries.json';


export default function usePage() {  
  const [listedCountries, setListedCountries] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<countryType>();
  async function getCountries(query?: string): Promise<OptionType[] | undefined> {
    try {
      const response = await fetch(`/api/countries/${query}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async function getCurrentCountry() {
    try {
      const response = await fetch('/api/currentCountry');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const onChange = (option: OptionType) => {
    const selected: countryType | undefined = countries.find(country => country.name === option?.value);
    if(selected) {
      setSelectedCountry(selected);
    }
  }

  return {
    listedCountries,
    setListedCountries,
    selectedCountry,
    setSelectedCountry,
    getCurrentCountry,
    getCountries,
    onChange,
  }
}