import { Component, computed, inject, signal } from "@angular/core";
import { Field, form } from "@angular/forms/signals";
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
import { CountryDataService } from "@services";
import { countryValidation } from "@validation";

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
})
export class CountryFormComponent {
  #countryDataService = inject(CountryDataService);

  protected countryForm = form<CountryType.Data>(
    signal({
      country: "",
    }),
    countryValidation,
  );

  protected invalid = this.countryForm.country().invalid;
  protected value = this.countryForm.country().value;
  protected message = computed(
    () => this.countryForm.country().errors()[0]?.message ?? "",
  );

  protected insertCountry = () => {
    this.#countryDataService.insertCountry(this.value());
  };
}
