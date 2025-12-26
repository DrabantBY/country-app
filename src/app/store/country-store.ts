import { signalStore, withHooks } from "@ngrx/signals";

import { countrySignalFeature, countryEntityFeature } from "./features";

export const CountryStore = signalStore(
  countrySignalFeature(),
  countryEntityFeature(),
  withHooks({
    onInit(store) {
      store.loadEntityCountries();
      store.loadCountries();
    },
  }),
);
