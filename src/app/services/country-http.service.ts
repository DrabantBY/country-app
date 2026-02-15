import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import type { CountryType } from "@models";
import type { Observable } from "rxjs";

@Injectable()
export class CountryHttpService {
  private readonly http = inject(HttpClient);

  private buildUrl(id: number | string = ""): string {
    return `http://localhost:3000/countries/${id}`;
  }

  fetchList(): Observable<CountryType.Data[]> {
    return this.http.get<CountryType.Data[]>(this.buildUrl());
  }

  insertOne(name: string): Observable<CountryType.Data> {
    return this.http.post<CountryType.Data>(this.buildUrl(), { name });
  }

  upsertOne(id: string | number, name: string): Observable<CountryType.Data> {
    return this.http.put<CountryType.Data>(this.buildUrl(id), { name });
  }

  deleteOne(id: string | number): Observable<CountryType.Data> {
    return this.http.delete<CountryType.Data>(this.buildUrl(id));
  }
}
