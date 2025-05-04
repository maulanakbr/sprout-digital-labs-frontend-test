import * as z from 'zod';

export const baseRequestSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

export const baseArrayResponseSchema = <T extends z.ZodTypeAny>(resultSchema: T) =>
  z.object({
    count: z.number(),
    next: z.string().optional(),
    previous: z.string().optional(),
    results: z.array(resultSchema),
  });

export type BaseRequest = z.infer<typeof baseRequestSchema>;
