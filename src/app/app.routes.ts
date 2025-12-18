import type { Routes } from "@angular/router";
import { CountriesComponent } from "./components/countries/countries.component";

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
      import("./components/not-found/not-found.component").then(
        ({ NotFoundComponent }) => NotFoundComponent,
      ),
  },
];
