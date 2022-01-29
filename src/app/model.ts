export interface Country {
    name: string,
    capital: string,
    region: string,
    population: number,
    flag: string
}

export const DefaultCountry = {
    name: '',
    capital: '',
    region: '',
    population: 0,
    flag: ''
}

export interface CountriesMap {
    [key: string]: Country
}

export interface CountriesReducerResult {
    countryList: Country[], 
    countryMap: CountriesMap
}