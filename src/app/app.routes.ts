import type { Routes } from "@angular/router";
import { CountriesComponent } from "@components";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "countries",
    pathMatch: "full",
  },
  {
    path: "countries",
    component: CountriesComponent,
  },
  {
    path: "**",
    loadComponent: () =>
      import("@components").then(({ NotFoundComponent }) => NotFoundComponent),
  },
];
