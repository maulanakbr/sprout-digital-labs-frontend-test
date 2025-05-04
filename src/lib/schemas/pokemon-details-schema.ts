import * as z from 'zod';

const namedAPIResourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const pokemonMoveVersionSchema = z.object({
  moveLearnMethod: namedAPIResourceSchema,
  versionGroup: namedAPIResourceSchema,
  levelLearnedAt: z.number(),
});

const pokemonMoveSchema = z.object({
  move: namedAPIResourceSchema,
  versionGroupDetails: z.array(pokemonMoveVersionSchema),
});

const pokemonAbilitySchema = z.object({
  isHidden: z.boolean(),
  slot: z.number(),
  ability: namedAPIResourceSchema.nullable(),
});

const pokemonTypeSchema = z.object({
  slot: z.number(),
  type: namedAPIResourceSchema,
});

const pokemonStatSchema = z.object({
  baseStat: z.number(),
  effort: z.number(),
  stat: namedAPIResourceSchema,
});

const pokemonSpritesSchema = z
  .object({
    frontDefault: z.string().optional(),
    frontShiny: z.string().optional(),
    frontFemale: z.string().optional(),
    frontShinyFemale: z.string().optional(),
    backDefault: z.string().optional(),
    backShiny: z.string().optional(),
    backFemale: z.string().optional(),
    backShinyFemale: z.string().optional(),
  })
  .optional();

const pokemonCriesSchema = z.object({
  latest: z.string(),
  legacy: z.string(),
});

const pokemonGameIndicesSchema = z.object({
  gameIndex: z.number(),
  version: namedAPIResourceSchema,
});

const pokemonHeldItemsSchema = z.object({
  item: namedAPIResourceSchema,
  versionDetails: z.array(
    z.object({
      rarity: z.number(),
      version: namedAPIResourceSchema,
    })
  ),
});

const pokemonPastAbilitiesSchema = z.object({
  abilities: z.array(pokemonAbilitySchema),
  generation: namedAPIResourceSchema,
});

const pokemonPastTypesSchema = z.object({
  types: z.array(pokemonTypeSchema),
  generation: namedAPIResourceSchema,
});

export const pokemonSpeciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  genderRate: z.number(),
  eggGroups: z.array(namedAPIResourceSchema),
  evolvesFromSpecies: namedAPIResourceSchema,
  habitat: namedAPIResourceSchema,
  shape: namedAPIResourceSchema,
});

export const pokemonDetailsFromApiSchema = z.object({
  id: z.number(),
  name: z.string(),
  baseExperience: z.number(),
  height: z.number(),
  isDefault: z.boolean(),
  order: z.number(),
  weight: z.number(),
  abilities: z.array(pokemonAbilitySchema),
  forms: z.array(namedAPIResourceSchema),
  gameIndices: z.array(pokemonGameIndicesSchema),
  heldItems: z.array(pokemonHeldItemsSchema),
  locationAreaEncounters: z.string(),
  pastTypes: z.array(pokemonPastTypesSchema),
  pastAbilities: z.array(pokemonPastAbilitiesSchema).optional().nullable(),
  sprites: z.object({
    other: z.object({
      officialArtwork: pokemonSpritesSchema,
    }),
  }),
  cries: pokemonCriesSchema,
  species: namedAPIResourceSchema,
  stats: z.array(pokemonStatSchema),
  types: z.array(pokemonTypeSchema),
  moves: z.array(pokemonMoveSchema),
});

export const pokemonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().optional(),
  types: z.array(z.string()),
  height: z.number(),
  weight: z.number(),
  stats: z.array(
    z.object({
      stat: z.string(),
      baseStat: z.number(),
    })
  ),
  abilities: z.array(z.string()),
  genderRatio: z
    .object({
      male: z.number(),
      female: z.number(),
    })
    .optional(),
  species: z.string(),
  eggGroups: z.array(z.string()),
  eggCycle: z.string(),
  evolution: z.string().optional(),
  moves: z.array(z.string()).optional(),
});

export type PokemonSpecies = z.infer<typeof pokemonSpeciesSchema>;
export type PokemonDetailsFromApi = z.infer<typeof pokemonDetailsFromApiSchema>;
export type PokemonDetails = z.infer<typeof pokemonDetailsSchema>;
