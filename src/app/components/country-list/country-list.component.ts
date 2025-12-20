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
import { ConfirmService } from "@shared";

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
  #confirmService = inject(ConfirmService);

  protected list = this.#countryDataService.list;

  protected listForm = form<CountryType.Data[]>(this.list, (root) => {
    applyEach(root, countryValidation);
  });

  protected async upsertCountry(
    id: number | string,
    name: string,
  ): Promise<void> {
    const hasConfirm = await this.#confirmService.open();
    if (!hasConfirm) return;
    this.#countryDataService.upsertCountry(id, name);
  }

  protected async deleteCountry(id: number | string): Promise<void> {
    const hasConfirm = await this.#confirmService.open();
    if (!hasConfirm) return;
    this.#countryDataService.deleteCountry(id);
  }
}
