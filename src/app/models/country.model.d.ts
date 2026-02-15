export namespace CountryType {
  export interface Data {
    id: number | string;
    name: string;
  }

  export interface City extends Data {
    streets: Data[];
  }

  export interface Country extends Data {
    cities: City[];
  }
}
