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

  insertCountry = (countryName: string) => {
    this.#countryHttpService
      .insertOne(countryName)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((country) => {
        this.list.update((prev) => [...prev, country]);
      });
  };

  upsertCountry = (countryId: number | string, countryName: string) => {
    this.#countryHttpService
      .upsertOne(countryId, countryName)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((country) => {
        this.list.update((prev) =>
          prev.map((item) => (item.id === country.id ? country : item)),
        );
      });
  };

  deleteCountry = (countryId: number | string) => {
    this.#countryHttpService
      .deleteOne(countryId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(({ id }) => {
        this.list.update((prev) => prev.filter((item) => item.id !== id));
      });
  };
}
