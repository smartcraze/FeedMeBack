import { z } from "zod";

const feedbackSchemaZod = z.object({
  companyId: z.string(),
  feedbackText: z.string().trim().min(1, "Feedback text is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  customerName: z.string().trim().optional(),
  customerEmail: z.string().email("Invalid email format").optional(),
});

export default feedbackSchemaZod;
