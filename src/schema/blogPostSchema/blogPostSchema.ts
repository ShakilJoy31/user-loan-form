import { z } from "zod";

export const blogSchema = z.object({
  status: z.enum(["Draft", "Trust", "Published"]),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  categoryId: z.number().min(1, "Category is required"),
  tagId: z.number().min(1, "Tag is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Invalid URL").optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  alt: z.string().optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;