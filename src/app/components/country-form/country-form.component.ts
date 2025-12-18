import { Component, computed, inject, signal } from "@angular/core";
import { Field, form, maxLength, required } from "@angular/forms/signals";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from "@angular/material/input";
import type { CountryType } from "@models";
import { CountryHttpService } from "@services";

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
  #countryService = inject(CountryHttpService);

  #modelForm = signal<CountryType.FormValue>({
    country: "",
  });

  protected countryForm = form(this.#modelForm, (schema) => {
    required(schema.country, { message: "country name is required" });
    maxLength(schema.country, 255, { message: "max 255 characters" });
  });

  protected invalid = this.countryForm.country().invalid;
  protected value = this.countryForm.country().value;
  protected message = computed(
    () => this.countryForm.country().errors()[0]?.message ?? "",
  );

  protected insertCountry = () => {
    this.#countryService.insertOne(this.value()).subscribe();
  };
}
