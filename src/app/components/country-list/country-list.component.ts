import { Component, inject } from "@angular/core";
import { applyEach, Field, form } from "@angular/forms/signals";
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
  selector: "app-country-list",
  imports: [
    Field,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
  ],
  templateUrl: "./country-list.component.html",
  styleUrl: "./country-list.component.scss",
})
export class CountryListComponent {
  #countryDataService = inject(CountryDataService);

  protected list = this.#countryDataService.list;

  protected listForm = form<CountryType.Data[]>(this.list, (root) => {
    applyEach(root, countryValidation);
  });

  protected upsertCountry = (index: number) => {
    const { id, name } = this.list()[index];
    if (!id) return;
    this.#countryDataService.upsertCountry(id, name);
  };

  protected deleteCountry = (index: number) => {
    const { id } = this.list()[index];
    if (!id) return;
    this.#countryDataService.deleteCountry(id);
  };
}
