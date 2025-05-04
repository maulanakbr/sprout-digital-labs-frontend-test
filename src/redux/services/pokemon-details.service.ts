import { apiBaseQuery } from '@/lib/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { transformResponse } from '@/lib/utils';
import {
  PokemonDetails,
  pokemonDetailsFromApiSchema,
  PokemonSpecies,
} from '@/lib/schemas/pokemon-details-schema';

const pokemonDetailsApi = createApi({
  reducerPath: 'pokemonDetailsApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Pokemons'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200,
  endpoints: (builder) => ({
    getPokemonDetails: builder.query<PokemonDetails, { name: string }>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const detailsResponse = await fetchWithBQ(`/pokemon/${arg.name}`);
        if (detailsResponse.error) return { error: detailsResponse.error };

        const parsed = pokemonDetailsFromApiSchema.safeParse(detailsResponse.data);

        if (!parsed.success) {
          return {
            error: {
              status: 500,
              data: {
                message: 'Failed to parse detail response',
                issues: parsed.error.flatten(),
              },
            },
          };
        }

        const detailsJson = transformResponse(parsed.data);

        const speciesResponse = await fetchWithBQ(`/pokemon-species/${detailsJson.id}`);
        if (speciesResponse.error) return { error: speciesResponse.error };

        const speciesData = transformResponse(speciesResponse.data) as PokemonSpecies;

        const genderRatio =
          speciesData.genderRate !== -1
            ? {
                male: speciesData.genderRate * 12.5,
                female: 100 - speciesData.genderRate * 12.5,
              }
            : { male: 50, female: 50 };

        return {
          data: {
            id: detailsJson.id,
            name: detailsJson.name,
            image: detailsJson.sprites.other['officialArtwork']?.frontDefault,
            types: detailsJson.types.map((t) => t.type.name),
            height: detailsJson.height,
            weight: detailsJson.weight,
            stats: detailsJson.stats.map((stat) => ({
              stat: stat.stat.name,
              baseStat: stat.baseStat,
            })),
            abilities: detailsJson.abilities.map((ability) => ability.ability?.name as string),
            genderRatio,
            species: speciesData.evolvesFromSpecies.name,
            eggGroups: speciesData.eggGroups.map((egg) => egg.name),
            eggCycle: speciesData.habitat.name,
            evolution: 'Evolves from Charmander',
            moves: detailsJson.moves.map((move) => move.move.name),
          },
        };
      },
    }),
  }),
});

export const { useGetPokemonDetailsQuery } = pokemonDetailsApi;

export default pokemonDetailsApi;
