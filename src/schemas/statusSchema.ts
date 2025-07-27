import { z } from "zod";

const orderStatusEnum = z.enum([
  "CONFIRMED",
  "CANCELLED",
  "PROCESSING",
  "HOLD",
  "SHIPPED",
  "IN_DELIVERY",
  "DELIVERED",
  "COMPLETED"
]);

const cancelReasonEnum = z.enum([
  "High_Price",
  "Sort_Time_Delivery",
  "Fake_Order",
  "Out_Of_Zone",
  "Duplicate_Order",
  "Changed_Mind"
]);

export const statusSchema = z.object({
  orderStatus: orderStatusEnum
    .refine(val => val !== undefined, {
      message: "Order status is required"
    }),

  note: z.string().optional(),

  cancelReason: cancelReasonEnum.optional(),

  paymentStatus: z.boolean().optional(),

  courierId: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.orderStatus === "SHIPPED" && !data.courierId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Courier is required when status is SHIPPED",
      path: ["courierId"] // This points the error to the courierId field
    });
  }
});

// You can also extract the types if needed
export type StatusSchema = z.infer<typeof statusSchema>;
export type OrderStatus = z.infer<typeof orderStatusEnum>;
export type CancelReason = z.infer<typeof cancelReasonEnum>;