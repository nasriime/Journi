import { OptionType } from "@/lib/types";

import countries from "@/data/countries.json";

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: string
): number {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

export function listingCountries(lat: number, lng: number) {
  const sortedCountries: OptionType[] = [];
  for (let i = 0; i < countries.length; i++) {
    const distance = calculateDistance(
      lat,
      lng,
      countries[i]["latlng"][0],
      countries[i]["latlng"][1],
      "K"
    );
    sortedCountries.push({
      label: countries[i]["name"],
      value: countries[i]["name"],
      distance,
    });
  }
  return sortedCountries.sort(function (a: OptionType, b: OptionType) {
    return a.distance - b.distance;
  });
}

export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(null, ...args);
    }, delay);
  };
}
