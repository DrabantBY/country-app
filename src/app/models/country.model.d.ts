export namespace CountryType {
  export type Data = {
    id: number | string;
    country: string;
  };

  export type FormValue = Omit<Data, "id">;
}
