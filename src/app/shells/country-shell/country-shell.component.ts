import { Component } from "@angular/core";
import { CountryFormComponent } from "@components";

@Component({
  selector: "app-country-shell",
  imports: [CountryFormComponent],
  templateUrl: "./country-shell.component.html",
  styleUrl: "./country-shell.component.scss",
})
export class CountryShellComponent {}
