import { Component, inject, input, output } from "@angular/core";

import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from "@angular/material/input";

import type { AbstractControl } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { ControlContainer } from "@angular/forms";

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
  readonly editEvent = output<string>();
  readonly deleteEvent = output<string>();

  get field(): AbstractControl | undefined | null {
    return this.controlContainer.control?.get(this.fieldName());
  }

  protected emitEditEvent(): void {
    this.editEvent.emit("edit");
  }
  protected emitDeleteEvent(): void {
    this.deleteEvent.emit("delete");
  }
}
