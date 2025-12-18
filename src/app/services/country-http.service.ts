import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import type { CountryType } from "@models";

@Injectable({
  providedIn: "root",
})
export class CountryHttpService {
  #http = inject(HttpClient);

  #url = (id: number | string = "") => `http://localhost:3000/countries/${id}`;

  fetchList = () => this.#http.get<CountryType.Data[]>(this.#url());

  insertOne = (country: string) =>
    this.#http.post<CountryType.Data>(this.#url(), { country });

  upsertOne = (id: string | number, country: string) =>
    this.#http.put<CountryType.Data>(this.#url(id), { country });

  deleteOne = (id: string | number) => this.#http.delete<void>(this.#url(id));
}
