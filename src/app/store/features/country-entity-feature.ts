import type { CountryType } from "@models";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStoreFeature, withMethods } from "@ngrx/signals";
import {
  addEntity,
  removeEntity,
  setAllEntities,
  upsertEntity,
  withEntities,
} from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

import { exhaustMap } from "rxjs";
import { CountryHttpService } from "@services";
import { inject } from "@angular/core";
import { MessageService } from "@shared";

export function countryEntityFeature<_>() {
  return signalStoreFeature(
    withEntities<CountryType.Data>(),
    withMethods(
      (
        store,
        countryHttpService = inject(CountryHttpService),
        messageService = inject(MessageService),
      ) => ({
        loadEntityCountries: rxMethod<void>(
          exhaustMap(() =>
            countryHttpService.fetchList().pipe(
              tapResponse({
                next: (countries) =>
                  patchState(store, setAllEntities(countries)),
                error: messageService.showError,
              }),
            ),
          ),
        ),

        insertEntityCountry: rxMethod<string>(
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

        upsertEntityCountry: rxMethod<Required<CountryType.Data>>(
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

        deleteEntityCountry: rxMethod<string | number>(
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
  );
}
