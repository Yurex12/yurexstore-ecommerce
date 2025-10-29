import z from 'zod';

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .trim()
      .min(8, 'Password should be at least 8 characters')
      .max(25, 'Password should not be more than 25 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        'Password must contain at least one uppercase letter and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
