import type { Routes } from "@angular/router";
import { CountryHttpService } from "@services";
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
    component: CountryShellComponent,
    providers: [CountryHttpService, CountryStore],
  },
  {
    path: "**",
    loadComponent: () =>
      import("@shells").then(
        ({ NopageShellComponent }) => NopageShellComponent,
      ),
  },
];
