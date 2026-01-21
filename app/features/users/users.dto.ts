import z from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(100),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;


export const UpdateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;