import { z } from "zod";

// Define enums for better type safety
const orderTypeEnum = z.enum([
  "CONFIRMED",
  "PROCESSING",
  "CANCELLED",
  "HOLD",
  "SHIPPED",
  "IN_DELIVERY",
  "DELIVERED",
  "COMPLETED",
]);

const cancelReasonEnum = z.enum([
  "High_Price",
  "Sort_Time_Delivery",
  "Fake_Order",
  "Out_Of_Zone",
  "Duplicate_Order",
  "Changed_Mind",
]);

export const bulkStatusSchema = z.object({
  orders: z.array(z.number().min(1, "Order ID must be a positive number"))
    .min(1, "At least one order is required"),
    
  note: z.string().optional(),
  
  type: orderTypeEnum.optional(),
  
  cancelReason: cancelReasonEnum.optional(),
  
  courierId: z.number().optional(),
});

// Infer TypeScript type from the schema
export type BulkStatusSchema = z.infer<typeof bulkStatusSchema>;