import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmComponent } from "@shared";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfirmService {
  private readonly dialog = inject(MatDialog);

  open(): Promise<boolean> {
    return firstValueFrom<boolean>(
      this.dialog.open(ConfirmComponent).afterClosed(),
    );
  }
}
