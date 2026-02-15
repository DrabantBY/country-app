import { DestroyRef, Injectable, inject, linkedSignal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { CountryHttpService } from "@services";
import { MessageService } from "@shared";
import { catchError } from "rxjs";

@Injectable()
export class CountryDataService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly countryHttpService = inject(CountryHttpService);

  source = toSignal(this.countryHttpService.fetchList(), {
    initialValue: [],
  });

  list = linkedSignal(() => this.source());

  insertCountry(countryName: string): void {
    this.countryHttpService
      .insertOne(countryName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => this.messageService.showError(err)),
      )
      .subscribe((country) => {
        this.list.update((prev) => [...prev, country]);
        this.messageService.showSuccess(
          `${country.name} is successfully added`,
        );
      });
  }

  upsertCountry(countryId: number | string, countryName: string): void {
    this.countryHttpService
      .upsertOne(countryId, countryName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => this.messageService.showError(err)),
      )
      .subscribe((country) => {
        this.list.update((prev) =>
          prev.map((item) => (item.id === country.id ? country : item)),
        );
        this.messageService.showSuccess(`country is successfully updated`);
      });
  }

  deleteCountry(countryId: number | string): void {
    this.countryHttpService
      .deleteOne(countryId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => this.messageService.showError(err)),
      )
      .subscribe(({ id, name }) => {
        this.list.update((prev) => prev.filter((item) => item.id !== id));
        this.messageService.showSuccess(`${name} is successfully removed`);
      });
  }
}
