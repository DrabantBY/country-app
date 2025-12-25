import { inject } from "@angular/core";
import type { CountryType } from "@models";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withHooks, withMethods } from "@ngrx/signals";
import {
  addEntity,
  removeEntity,
  setAllEntities,
  upsertEntity,
  withEntities,
} from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { CountryHttpService } from "@services";
import { MessageService } from "@shared";
import { switchMap, exhaustMap } from "rxjs";

export const CountryEntityStore = signalStore(
  withEntities<CountryType.Data>(),
  withMethods(
    (
      store,
      countryHttpService = inject(CountryHttpService),
      messageService = inject(MessageService),
    ) => ({
      loadCountries: rxMethod<void>(
        switchMap(() =>
          countryHttpService.fetchList().pipe(
            tapResponse({
              next: (countries) => patchState(store, setAllEntities(countries)),
              error: messageService.showError,
            }),
          ),
        ),
      ),

      insertCountry: rxMethod<string>(
        exhaustMap((name) =>
          countryHttpService.insertOne(name).pipe(
            tapResponse({
              next: (country) => {
                patchState(store, addEntity(country));

                messageService.showSuccess(
                  `${country.name} is successfully added`,
                );
              },
              error: messageService.showError,
            }),
          ),
        ),
      ),

      upsertCountry: rxMethod<Required<CountryType.Data>>(
        exhaustMap(({ id, name }) =>
          countryHttpService.upsertOne(id, name).pipe(
            tapResponse({
              next: (country) => {
                patchState(store, upsertEntity(country));
                messageService.showSuccess(`country is successfully updated`);
              },
              error: messageService.showError,
            }),
          ),
        ),
      ),

      deleteCountry: rxMethod<string | number>(
        exhaustMap((id) =>
          countryHttpService.deleteOne(id).pipe(
            tapResponse({
              next: ({ id, name }) => {
                patchState(store, removeEntity(id));
                messageService.showSuccess(`${name} is successfully removed`);
              },
              error: messageService.showError,
            }),
          ),
        ),
      ),
    }),
  ),

  withHooks({
    onInit(store) {
      store.loadCountries();
    },
  }),
);
