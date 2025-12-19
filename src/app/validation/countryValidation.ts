import { maxLength, required, schema } from "@angular/forms/signals";
import type { CountryType } from "@models";

export const countryValidation = schema<CountryType.Data>((rootPath) => {
  required(rootPath.country, { message: "country name is required" });
  maxLength(rootPath.country, 255, { message: "max 255 characters" });
});
