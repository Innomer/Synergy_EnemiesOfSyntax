import { number, object, string } from "valibot";

export const InsertEmployeeSchema = object({
  phoneNumber: string(),
  companyId: number(),
  userId: string(),
  department: string(),
  position: string(),
});
