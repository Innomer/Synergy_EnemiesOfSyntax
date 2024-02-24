import {
  email,
  minLength,
  object,
  optional,
  string,
  enumType,
  toTrimmed,
} from "valibot";

export const LoginSchema = object({
  email: string([toTrimmed(), email()]),
  password: string([toTrimmed(), minLength(8)]),
  name: optional(string([toTrimmed(), minLength(3)])),
  role: optional(enumType(["companyAdmin", "employee", "user", "siteAdmin"])),
});
