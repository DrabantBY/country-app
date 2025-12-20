import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import type { Observable } from "rxjs";
import { EMPTY } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  #snackBar = inject(MatSnackBar);

  showError(err: unknown, action: string = "CLOSE"): Observable<never> {
    if (err instanceof Error || err instanceof HttpErrorResponse) {
      this.#snackBar.open(err.message || "error", action);
    } else {
      console.error(err);
    }

    return EMPTY;
  }

  showSuccess(message: string, action: string = "CLOSE"): void {
    this.#snackBar.open(message, action);
  }
}
