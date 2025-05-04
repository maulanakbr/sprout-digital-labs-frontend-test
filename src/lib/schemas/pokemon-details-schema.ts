import * as z from 'zod';

export const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    other: z.object({
      // 'official-artwork': z.object({
      //   front_default: z.string().nullable(),
      // }),
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
