import z from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().nonempty('Name is required'),
  email: z.email('Invalid email address').trim(),
  password: z
    .string()
    .trim()
    .min(8, 'Password should be at least 8 characters')
    .max(25, 'Password should not be more than 25 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])/,
      'Password must contain at least one uppercase letter and one number'
    ),
});

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().trim().min(1, 'Password is required'),
});

export const googleLoginSchema = z.object({
  tokenId: z.string().trim().min(1, 'Token is required'),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().trim().nonempty('Password is required'),
  newPassword: z
    .string()
    .trim()
    .min(8, 'Password should be at least 8 characters')
    .max(25, 'Password should not be more than 25 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])/,
      'Password must contain at least one uppercase letter and one number'
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type GoogleLoginSchema = z.infer<typeof googleLoginSchema>;
