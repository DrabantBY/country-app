import { DestroyRef, Injectable, inject, linkedSignal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { PolandHttpService } from "@services";
import { MessageService } from "@shared";
import { catchError } from "rxjs";
import type { CountryType } from "@models";

@Injectable()
export class PolandDataService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly polandHttpService = inject(PolandHttpService);

  source = toSignal(this.polandHttpService.fetchCountry());

  country = linkedSignal(() => this.source());

  // insertCountry(countryName: string): void {
  //   this.polandHttpService
  //     .insertOne(countryName)
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //       catchError((err) => this.messageService.showError(err)),
  //     )
  //     .subscribe((country) => {
  //       this.list.update((prev) => [...prev, country]);
  //       this.messageService.showSuccess(
  //         `${country.name} is successfully added`,
  //       );
  //     });
  // }
  //
  upsertCountry(data: CountryType.Country): void {
    this.polandHttpService
      .upsertOne(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => this.messageService.showError(err)),
      )
      .subscribe((data) => {
        this.country.set(data);
        this.messageService.showSuccess(`country is successfully updated`);
      });
  }
  //
  // deleteCountry(countryId: number | string): void {
  //   this.polandHttpService
  //     .deleteOne(countryId)
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //       catchError((err) => this.messageService.showError(err)),
  //     )
  //     .subscribe(({ id, name }) => {
  //       this.list.update((prev) => prev.filter((item) => item.id !== id));
  //       this.messageService.showSuccess(`${name} is successfully removed`);
  //     });
  // }
}
