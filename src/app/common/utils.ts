import { DEFAULT_COUNTRY } from "./constants"
import { Country } from "./model"

export const transformCountry = (country: Country) => {
  if (country && country.name) {
    return {
      name: country.name,
      capital: country.capital,
      region: country.region,
      population: country.population,
      flag: country.flag
    }
  } else {
    return DEFAULT_COUNTRY
  }
}