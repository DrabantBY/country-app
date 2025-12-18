import { Component, signal } from "@angular/core";
import type { CountryType } from "@models";
import { form, Field, required, maxLength } from "@angular/forms/signals";

import {
  MatFormField,
  MatInput,
  MatError,
  MatLabel,
  MatSuffix,
} from "@angular/material/input";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-country-form",
  imports: [
    Field,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    MatSuffix,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: "./country-form.component.html",
  styleUrl: "./country-form.component.scss",
})
export class CountryFormComponent {
  #modelForm = signal<CountryType.FormValue>({
    country: "",
  });

  protected countryForm = form(this.#modelForm, (schema) => {
    required(schema.country, { message: "field is required" });
    maxLength(schema.country, 255, { message: "max 255 characters" });
  });
}
