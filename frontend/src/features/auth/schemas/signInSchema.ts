import z from 'zod';

export const signInSchema = z.object({
  email: z.email('Please enter a valid email address.').trim(),
  password: z.string().trim().min(1, 'Password is required'),
  rememberMe: z.boolean(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
