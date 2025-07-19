import { z } from "zod";

export const registerSchema = z
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
      .length(11, "Contact number must be exactly 11 digits"),

    companyInfo: z.object({
      shopName: z.string().min(1, "Shop name is required"),
      ownerName: z.string().min(1, "Owner name is required"),
      designation: z.string().min(1, "Designation is required"),
      city: z.string().min(1, "City is required"),
      area: z.string().min(1, "Area is required"),
      tradeLicense: z.string().optional(),
    }),

    categories: z
      .array(z.number())
      .min(1, "At least one category is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export type RegisterDataProps = z.infer<typeof registerSchema>;
