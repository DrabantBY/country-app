import type { Routes } from "@angular/router";
import { CountryShellComponent } from "@shells";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "countries",
    pathMatch: "full",
  },
  {
    path: "countries",
    component: CountryShellComponent,
  },
  {
    path: "**",
    loadComponent: () =>
      import("@components").then(({ NotFoundComponent }) => NotFoundComponent),
  },
];
