import { Component, signal } from "@angular/core";

@Component({
  selector: "app-nopage-shell.",
  imports: [],
  templateUrl: "./nopage-shell.component.html",
  styleUrl: "./nopage-shell.component.scss",
})
export class NopageShellComponent {
  protected message = signal("404: Page not found!");
}
