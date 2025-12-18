import { DestroyRef, Injectable, inject, linkedSignal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { CountryHttpService } from "@services";

@Injectable()
export class CountryDataService {
  #destroyRef = inject(DestroyRef);
  #countryHttpService = inject(CountryHttpService);

  #source = toSignal(this.#countryHttpService.fetchList(), {
    initialValue: [],
  });

  list = linkedSignal(() => this.#source());

  insertCountry = (name: string) => {
    this.#countryHttpService
      .insertOne(name)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((country) => {
        this.list.update((prev) => [...prev, country]);
      });
  };

  upsertCountry = (id: number | string, name: string) => {
    this.#countryHttpService
      .upsertOne(id, name)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((country) => {
        this.list.update((prev) =>
          prev.map((item) => (item.id === country.id ? country : item)),
        );
      });
  };

  deleteCountry = (id: number | string) => {
    this.#countryHttpService
      .deleteOne(id)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.list.update((prev) => prev.filter((item) => item.id !== id));
      });
  };
}
