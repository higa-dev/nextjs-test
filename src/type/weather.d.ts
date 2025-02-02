export interface WeatherData {
  publicTime: string,
  publicTimeFormatted: string,
  publishingOffice: string,
  title: string,
  link: string,
  description: description,
  forecasts: forecast[],
  location: location,
  copyright: copyright
}

interface description {
  publicTime: string,
  publicTimeFormatted: string,
  headlineText: string,
  bodyText: string,
  text: string
}

export interface forecast {
  date: string,
  dateLabel: string,
  telop: string,
  detail: {
    weather: string,
    wind: string,
    wave: string
  },
  temperature: {
    min: {
      celsius: string,
      fahrenheit: string
    },
    max: {
      celsius: string,
      fahrenheit: string
    }
  },
  chanceOfRain: {
    T00_06: string,
    T06_12: string,
    T12_18: string,
    T18_24: string
  },
  image: {
    title: string,
    url: string,
    width: number,
    height: number
  }
}

interface location {
  area: string,
  prefecture: string,
  district: string,
  city: string
}

interface copyright {
  title: string,
  link: string,
  image: {
    title: string,
    link: string,
    url: string,
    width: number,
    height: number
  },
  provider: provider[]
}

interface provider {
  link: string,
  name: string,
  note: string
}