import type { Routes } from "@angular/router";
import {
  CountryHttpService,
  PolandDataService,
  PolandHttpService,
} from "@services";
import { CountryShellComponent } from "@shells";
import { CountryStore } from "@store";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "countries",
    pathMatch: "full",
  },
  {
    path: "countries",
    providers: [CountryHttpService, CountryStore],
    component: CountryShellComponent,
  },
  {
    path: "country",
    providers: [PolandHttpService, PolandDataService],
    loadComponent: () =>
      import("@shells").then(
        ({ PolandShellComponent }) => PolandShellComponent,
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("@shells").then(
        ({ NopageShellComponent }) => NopageShellComponent,
      ),
  },
];
