import { Component, inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
} from "@angular/material/dialog";

import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-confirm",
  imports: [MatDialogContent, MatDialogActions, MatButton],
  templateUrl: "./confirm.component.html",
  styleUrl: "./confirm.component.scss",
})
export class ConfirmComponent {
  #dialogRef = inject(MatDialogRef<ConfirmComponent>);

  cancel(): void {
    this.#dialogRef.close(false);
  }

  confirm(): void {
    this.#dialogRef.close(true);
  }
}
