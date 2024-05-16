import { useState } from "react";

import { countryType, OptionType } from "@/lib/types";

import countries from '@/data/countries.json';


export default function usePage() {  
  const [selectedCountry, setSelectedCountry] = useState<countryType>();
  const [error, setError] = useState<string>();
  async function getCountries(query?: string): Promise<OptionType[] | undefined> {
    try {
      const response = await fetch(`/api/countries/${query}`);
      const data = await response.json();
      return data.results;
    } catch (error: any) {
      setError(error);
    }
  }

  const onChange = (option: OptionType, triggeredAction: string) => {
    if (triggeredAction === 'clear') {
      setSelectedCountry(undefined);
    }
    const selected: countryType | undefined = countries.find(country => country.name === option?.value);
    if(selected) {
      setSelectedCountry(selected);
    }
  }

  return {
    selectedCountry,
    getCountries,
    onChange,
    error
  }
}