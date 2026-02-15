import { Component, computed, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { FormFieldComponent } from "../form-field/form-field.component";
import { PolandDataService } from "@services";

@Component({
  selector: "app-poland-list",
  imports: [ReactiveFormsModule, FormFieldComponent],
  templateUrl: "poland-list.component.html",
  styleUrl: "poland-list.component.scss",
})
export class PolandListComponent {
  private readonly polandDataStore = inject(PolandDataService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly formGroup = computed(() => {
    const initialFormValue = this.polandDataStore.source();

    return this.formBuilder.group({
      name: this.formBuilder.nonNullable.control<string>(
        initialFormValue?.name ?? "",
      ),
      cities: this.formBuilder.array(
        (initialFormValue?.cities ?? []).map((city) =>
          this.formBuilder.group({
            name: this.formBuilder.nonNullable.control<string>(city.name),
            streets: this.formBuilder.array(
              (city?.streets ?? []).map((street) =>
                this.formBuilder.group({
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

  protected editData(data: string): void {
    console.log(data);
  }

  protected deleteData(data: string): void {
    console.log(data);
  }
}
