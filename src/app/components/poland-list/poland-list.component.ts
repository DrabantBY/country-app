import { Component, computed, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { FormFieldComponent } from "../form-field/form-field.component";
import { PolandDataService } from "@services";
import type { FormArray } from "@angular/forms";
import type { CountryType } from "@models";

@Component({
  imports: [ReactiveFormsModule, FormFieldComponent],
  selector: "app-poland-list",
  templateUrl: "poland-list.component.html",
  styleUrl: "poland-list.component.scss",
  standalone: true,
})
export class PolandListComponent {
  private readonly polandDataStore = inject(PolandDataService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly formGroup = computed(() => {
    const initialFormValue = this.polandDataStore.country();

    return this.formBuilder.group({
      id: this.formBuilder.nonNullable.control<string | number>(
        initialFormValue?.id ?? "",
      ),
      name: this.formBuilder.nonNullable.control<string>(
        initialFormValue?.name ?? "",
      ),
      cities: this.formBuilder.array(
        (initialFormValue?.cities ?? []).map((city) =>
          this.formBuilder.group({
            id: this.formBuilder.nonNullable.control<string | number>(city.id),
            name: this.formBuilder.nonNullable.control<string>(city.name),
            streets: this.formBuilder.array(
              (city?.streets ?? []).map((street) =>
                this.formBuilder.group({
                  id: this.formBuilder.nonNullable.control<string | number>(
                    street.id,
                  ),
                  name: this.formBuilder.nonNullable.control<string>(
                    street.name,
                  ),
                }),
              ),
            ),
          }),
        ),
      ),
    });
  });

  protected onSubmit(): void {
    this.polandDataStore.upsertCountry(
      this.formGroup().value as CountryType.Country,
    );
  }

  protected onDelete(...args: Array<string | number>): void {
    const removeIndex = args.pop() as number;
    (this.formGroup().get(args) as FormArray).removeAt(removeIndex);
  }
}
