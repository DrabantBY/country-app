import { Component, inject, linkedSignal } from "@angular/core";
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
import { ConfirmService } from "@shared";
import { CountryEntityStore } from "@store";
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
  #confirmService = inject(ConfirmService);
  #countryEntityStore = inject(CountryEntityStore);

  protected list = linkedSignal(this.#countryEntityStore.entities);

  protected listForm = form<CountryType.Data[]>(this.list, (root) => {
    applyEach(root, countryValidation);
  });

  protected async upsertCountry(
    id: number | string,
    name: string,
  ): Promise<void> {
    const hasConfirm = await this.#confirmService.open();
    if (!hasConfirm) return;
    this.#countryEntityStore.upsertCountry({ id, name });
  }

  protected async deleteCountry(id: number | string): Promise<void> {
    const hasConfirm = await this.#confirmService.open();
    if (!hasConfirm) return;
    this.#countryEntityStore.deleteCountry(id);
  }
}
