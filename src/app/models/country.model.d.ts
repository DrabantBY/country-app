export namespace CountryType {
  export type Data = {
    id: number;
    country: string;
  };

  export type FormValue = Omit<Data, "id">;
}
