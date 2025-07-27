import { z } from "zod";

// Define enums for better type safety and reusability
const returnReasonEnum = z.enum([
  "Damage_Product",
  "Delay_Delivery",
  "Wrong_Product",
  "Out_Of_Zone",
  "Fraud_Customer",
  "Delivery_Man_Careless",
]);

const productSchema = z.object({
  orderItemId: z.number().min(1, "Order Item ID is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

export const returnOrderSchema = z.object({
  orderId: z.number().min(1, "Order ID is required"),
  reason: returnReasonEnum.refine(val => val !== undefined, {
    message: "Reason is required"
  }),
  products: z.array(productSchema).min(1, "At least one product is required"),
});

// Infer the TypeScript type from the Zod schema
export type ReturnOrderFormData = z.infer<typeof returnOrderSchema>;