import { z } from "zod";

export const customerRegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    contactNo: z
      .string()
      .length(11, "Contact number must be exactly 11 digits")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export type CustomerRegisterDataProps = z.infer<typeof customerRegisterSchema>;
