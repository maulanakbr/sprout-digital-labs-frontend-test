import { apiBaseQuery } from '@/lib/api';
import type { BaseRequest } from '@/lib/schemas/base-schema';
import {
  pokemonDetailsFromApiSchema,
  pokemonDetailsSchema,
} from '@/lib/schemas/pokemon-details-schema';
import { pokemonListSchema, type PokemonListWithDetails } from '@/lib/schemas/pokemon-list-schema';
import { transformResponse } from '@/lib/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

const pokemonListApi = createApi({
  reducerPath: 'pokemonListApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Pokemons'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200,
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListWithDetails[], BaseRequest>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const listResponse = await fetchWithBQ(`/pokemon?limit=${arg.limit}&offset=${arg.offset}`);
        if (listResponse.error) return { error: listResponse.error };

        const parsed = pokemonListSchema.safeParse(listResponse.data);
        if (!parsed.success) {
          return {
            error: {
              status: 500,
              data: 'Failed to parse list response',
            },
          };
        }

        const results = await Promise.all(
          parsed.data.results.map(async (pokemon) => {
            const detailRes = await fetch(pokemon.url);
            const detailJson = transformResponse(await detailRes.json());

            const parsedDetail = pokemonDetailsFromApiSchema.safeParse(detailJson);
            if (!parsedDetail.success) return null;

            return {
              id: parsedDetail.data.id,
              name: parsedDetail.data.name,
              image: parsedDetail.data.sprites.other['officialArtwork']?.frontDefault,
              types: parsedDetail.data.types.map((t) => t.type.name),
            };
          })
        );

        return { data: results.filter(Boolean) as PokemonListWithDetails[] };
      },
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonListApi;

export default pokemonListApi;
