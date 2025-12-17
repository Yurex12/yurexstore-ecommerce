import z from 'zod';

export const colorSchema = z.object({
  name: z.string().trim().nonempty('Color name is required'),
  code: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{6})$/, 'Enter a valid hex color code'),
});

export type ColorFormValues = z.infer<typeof colorSchema>;
