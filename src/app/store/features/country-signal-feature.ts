import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from "@ngrx/signals";

import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { switchMap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import type { CountryType } from "@models";
import { inject } from "@angular/core";
import { CountryHttpService } from "@services";
import { MessageService } from "@shared";

const initialState: { countries: CountryType.Data[] } = { countries: [] };

export const countrySignalFeature = () =>
  signalStoreFeature(
    withState(initialState),
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
                next: (countries) => patchState(store, { countries }),
                error: messageService.showError,
              }),
            ),
          ),
        ),

        insertCountry: rxMethod<string>(
          switchMap((name) =>
            countryHttpService.insertOne(name).pipe(
              tapResponse({
                next: (country) => {
                  patchState(store, (state) => ({
                    countries: [...state.countries, country],
                  }));

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
          switchMap(({ id, name }) =>
            countryHttpService.upsertOne(id, name).pipe(
              tapResponse({
                next: (country) => {
                  patchState(store, (state) => ({
                    countries: state.countries.map((item) =>
                      item.id === country.id ? country : item,
                    ),
                  }));
                  messageService.showSuccess(`country is successfully updated`);
                },
                error: messageService.showError,
              }),
            ),
          ),
        ),

        deleteCountry: rxMethod<string | number>(
          switchMap((id) =>
            countryHttpService.deleteOne(id).pipe(
              tapResponse({
                next: ({ id, name }) => {
                  patchState(store, (state) => ({
                    countries: state.countries.filter((item) => item.id !== id),
                  }));
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
