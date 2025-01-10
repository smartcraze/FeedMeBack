import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters"),
  website: z.string().url("Invalid website URL"),
  logo: z.string().url("Invalid logo URL").optional(),
});

export const companyLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});
