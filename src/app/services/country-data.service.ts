import { DestroyRef, Injectable, inject, linkedSignal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { CountryHttpService, MessageService } from "@services";
import { catchError } from "rxjs";

@Injectable()
export class CountryDataService {
  #destroyRef = inject(DestroyRef);
  #messageService = inject(MessageService);
  #countryHttpService = inject(CountryHttpService);

  #source = toSignal(this.#countryHttpService.fetchList(), {
    initialValue: [],
  });

  list = linkedSignal(() => this.#source());

  insertCountry = (countryName: string) => {
    this.#countryHttpService
      .insertOne(countryName)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        catchError((err) => this.#messageService.showError(err)),
      )
      .subscribe((country) => {
        this.list.update((prev) => [...prev, country]);
        this.#messageService.showSuccess(
          `${country.name} is successfully added`,
        );
      });
  };

  upsertCountry = (countryId: number | string, countryName: string) => {
    this.#countryHttpService
      .upsertOne(countryId, countryName)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        catchError((err) => this.#messageService.showError(err)),
      )
      .subscribe((country) => {
        this.list.update((prev) =>
          prev.map((item) => (item.id === country.id ? country : item)),
        );
        this.#messageService.showSuccess(`country is successfully updated`);
      });
  };

  deleteCountry = (countryId: number | string) => {
    this.#countryHttpService
      .deleteOne(countryId)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        catchError((err) => this.#messageService.showError(err)),
      )
      .subscribe(({ id, name }) => {
        this.list.update((prev) => prev.filter((item) => item.id !== id));
        this.#messageService.showSuccess(`${name} is successfully removed`);
      });
  };
}
