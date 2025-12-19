import { Component } from "@angular/core";
import { CountryFormComponent, CountryListComponent } from "@components";

@Component({
  selector: "app-country-shell",
  imports: [CountryFormComponent, CountryListComponent],
  templateUrl: "./country-shell.component.html",
})
export class CountryShellComponent {}
