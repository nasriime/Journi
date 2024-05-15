export type listedCountriesType = {
  label: string;
  value: string;
}

export type OptionType = {
  value: string;
  label: string;
  distance: number
};

type flags = {
  svg: string;
  png: string;
}

type currency = {
  code: string;
  name: string;
  symbol: string;
}

type language = {
  iso639_1?: string;
  iso639_2: string;
  name: string;
  nativeName?: string;
}

type translations = {
  br:  string;
  pt:  string;
  nl:  string;
  hr:  string;
  fa?: string;
  de:  string;
  es:  string;
  fr:  string;
  ja:  string;
  it:  string;
  hu:  string;
}

type regionalBloc= {
  acronym: string;
  name: string;
  otherNames?: string[];
  otherAcronyms?: string[];
}

export type countryType = {
  name:           string;
  topLevelDomain: string[];
  alpha2Code:     string;
  alpha3Code:     string;
  callingCodes:   string[];
  capital?:       string;
  altSpellings?:  string[];
  subregion:      string;
  region:         string;
  population:     number;
  latlng:         number[];
  demonym:        string;
  area?:          number;
  timezones:      string[];
  borders?:       string[];
  nativeName:     string;
  numericCode:    string;
  flags:          flags;
  currencies?:    currency[];
  languages:      language[];
  translations:   translations;
  flag:           string;
  regionalBlocs?: regionalBloc[];
  cioc?:          string;
  independent:    boolean;
  gini?:          number;
}