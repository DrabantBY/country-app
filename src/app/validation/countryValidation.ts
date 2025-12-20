import { maxLength, required, schema } from "@angular/forms/signals";
import type { CountryType } from "@models";

export const countryValidation = schema<CountryType.Data>((rootPath) => {
  required(rootPath.name, { message: "country name is required" });
  maxLength(rootPath.name, 255, { message: "max name length is 255 char" });
});
