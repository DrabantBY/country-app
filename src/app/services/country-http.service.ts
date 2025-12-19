import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import type { CountryType } from "@models";

@Injectable()
export class CountryHttpService {
  #http = inject(HttpClient);

  #url = (id: number | string = "") => `http://localhost:3000/countries/${id}`;

  fetchList = () => this.#http.get<CountryType.Data[]>(this.#url());

  insertOne = (name: string) =>
    this.#http.post<CountryType.Data>(this.#url(), { name });

  upsertOne = (id: string | number, name: string) =>
    this.#http.put<CountryType.Data>(this.#url(id), { name });

  deleteOne = (id: string | number) =>
    this.#http.delete<CountryType.Data>(this.#url(id));
}
