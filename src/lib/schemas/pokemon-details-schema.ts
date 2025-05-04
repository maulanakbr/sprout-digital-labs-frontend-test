import * as z from 'zod';

export const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    other: z.object({
      officialArtwork: z.object({
        frontDefault: z.string().nullable(),
      }),
    }),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
});
