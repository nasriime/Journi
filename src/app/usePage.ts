import { IListedCountries } from "@/lib/types";
export default function usePage() {  

  async function getCountries(): Promise<IListedCountries[] | undefined> {
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

  return {
    getCurrentCountry,
    getCountries
  }
}