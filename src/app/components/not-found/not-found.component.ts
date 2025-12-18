import { Component, signal } from "@angular/core";

@Component({
  selector: "app-not-found",
  imports: [],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {
  protected message = signal("404: Page not found!");
}
