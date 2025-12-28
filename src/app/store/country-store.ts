import { signalStore, withHooks } from "@ngrx/signals";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

import { countrySignalFeature, countryEntityFeature } from "./features";

export const CountryStore = signalStore(
  withDevtools("store"),
  countrySignalFeature(),
  countryEntityFeature(),
  withHooks({
    onInit(store) {
      store.loadEntityCountries();
      store.loadCountries();
    },
  }),
);
