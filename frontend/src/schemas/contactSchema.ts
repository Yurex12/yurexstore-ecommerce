import z from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name should not be more than 50 characters'),
  email: z.email('Enter a valid email address.'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message should not be more than 500 character'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
