import * as z from 'zod';
import { baseArrayResponseSchema } from './base-schema';

export const pokemonItemSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const pokemonListSchema = baseArrayResponseSchema(pokemonItemSchema);

export const pokemonListWithDetailSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable(),
    types: z.array(z.string()),
  })
);

export type PokemonList = z.infer<typeof pokemonListSchema>;
export type PokemonListWithDetails = z.infer<typeof pokemonListWithDetailSchema>;
