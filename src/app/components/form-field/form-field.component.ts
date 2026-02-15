import { Component, inject, input, output } from "@angular/core";
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { ControlContainer } from "@angular/forms";
import type { AbstractControl } from "@angular/forms";

@Component({
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatSuffix,
  ],
  selector: "app-form-field",
  templateUrl: "form-field.component.html",
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class FormFieldComponent {
  readonly controlContainer = inject(ControlContainer);
  readonly label = input.required<string>();
  readonly fieldName = input.required<string>();

  readonly deleteEvent = output<void>();

  get field(): AbstractControl | undefined | null {
    return this.controlContainer.control?.get(this.fieldName());
  }

  protected onInput(event: Event): void {
    if (this.field) {
      this.field.setValue((event.target as HTMLInputElement).value);
    }
  }

  protected onDelete(): void {
    this.deleteEvent.emit();
  }
}
