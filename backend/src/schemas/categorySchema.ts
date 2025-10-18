import z from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  image: z.url().nonempty('Please provide an image url'),
});

export type CategorySchema = z.infer<typeof categorySchema>;
