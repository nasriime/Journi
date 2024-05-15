import { useState } from "react";

import { countryType, listedCountriesType, OptionType } from "@/lib/types";

import countries from '@/data/countries.json';


export default function usePage() {  
  const [listedCountries, setListedCountries] = useState<listedCountriesType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<countryType>();
  async function getCountries(): Promise<listedCountriesType[] | undefined> {
    try {
      const response = await fetch('/api/countries', {
        headers: {
          Accept: 'application/json',
          method: 'GET',
        }
      });

      if(!response) {
        throw new Error('Failed to fetch countries');
      }

      const data = await response.json();
      return data.options;
    } catch (error) {
      console.error(error);
    }
  }

  async function getCurrentCountry() {
    try {
      const response = await fetch('/api/currentCountry', {
        headers: {
          Accept: 'application/json',
          method: 'GET',
        }
      });

      if(!response) {
        throw new Error('Failed to fetch ip');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    const radlat1 = Math.PI * lat1/180
    const radlat2 = Math.PI * lat2/180
    const radlon1 = Math.PI * lon1/180
    const radlon2 = Math.PI * lon2/180
    const theta = lon1-lon2
    const radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }
  
  function listingCountries(lat: number, lng: number) {
    const sortedCountries: OptionType[] = []
    for ( let i = 0; i < countries.length; i++) {
      const distance = calculateDistance(lat, lng, countries[i]["latlng"][0], countries[i]["latlng"][1],"K");
      sortedCountries.push({label: countries[i]["name"], value: countries[i]["name"], distance})
    }
    return sortedCountries.sort(function(a: OptionType, b: OptionType) { 
      return a.distance - b.distance;
    });
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
    listingCountries,
  }
}