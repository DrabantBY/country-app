import type { Routes } from "@angular/router";
import { CountryHttpService } from "@services";
import { CountryShellComponent } from "@shells";
import { CountryEntityStore } from "@store";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "countries",
    pathMatch: "full",
  },
  {
    path: "countries",
    component: CountryShellComponent,
    providers: [CountryHttpService, CountryEntityStore],
  },
  {
    path: "**",
    loadComponent: () =>
      import("@shells").then(
        ({ NopageShellComponent }) => NopageShellComponent,
      ),
  },
];
