import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "app-confirm",
  imports: [MatDialogContent, MatDialogActions, MatButton],
  templateUrl: "./confirm.component.html",
  styleUrl: "./confirm.component.scss",
})
export class ConfirmComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
