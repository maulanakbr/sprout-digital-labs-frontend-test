'use client';

import type { PokemonDetails } from '@/lib/schemas/pokemon-details-schema';
import { cn, getPokemonTypeClass } from '@/lib/utils';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import MainLayout from './layout/main-layout';

interface PokemonDetailsProps {
  pokemon: PokemonDetails;
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div
        className={cn('relative pt-8 pb-4 px-6 rounded-b-3xl', getPokemonTypeClass(pokemon.types))}
      >
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-white capitalize">{pokemon.name}</h1>
          <span className="text-white text-lg font-medium">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>

        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="bg-white/30 px-3 py-1 text-white text-sm rounded-full capitalize backdrop-blur-sm"
            >
              {type}
            </span>
          ))}
        </div>

        {pokemon.image && (
          <div className="relative w-full h-44 mt-4">
            <Image src={pokemon.image} alt={pokemon.name} fill className="object-contain" />
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="bg-white rounded-t-3xl -mt-6 px-6 py-4">
        <TabsList className="flex gap-6 border-b mb-4">
          {['about', 'base-stats', 'evolution', 'moves'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="pb-2 text-sm font-semibold text-gray-600 border-b-2 border-transparent hover:border-gray-400"
            >
              {capitalizeTabName(tab)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="about" className="space-y-3 text-sm text-gray-700">
          <div>{/* <span className="font-semibold">Species:</span> {pokemon.species} */}</div>
          <div>
            <span className="font-semibold">Height:</span> {pokemon.height}
          </div>
          <div>
            <span className="font-semibold">Weight:</span> {pokemon.weight}
          </div>
          {/* <div>
            <span className="font-semibold">Abilities:</span> {pokemon.abilities.join(', ')}
          </div> */}
          {/* <div className="pt-2 border-t">
            <span className="font-semibold">Gender:</span> ♂ {pokemon.genderRatio.male}% ♀{' '}
            {pokemon.genderRatio.female}%
          </div> */}
          <div>
            <span className="font-semibold">Egg Group:</span> {pokemon.eggGroup}
          </div>
          <div>
            <span className="font-semibold">Egg Cycle:</span> {pokemon.eggCycle}
          </div>
        </TabsContent>

        <TabsContent value="base-stats" className="space-y-3 text-sm text-gray-700">
          {/* Example of rendering base stats */}
          {/* {pokemon.baseStats.map((stat) => (
            <div key={stat.name}>
              <span className="font-semibold">{stat.name}:</span> {stat.value}
            </div>
          ))} */}
        </TabsContent>

        <TabsContent value="evolution" className="space-y-3 text-sm text-gray-700">
          {/* Example of rendering evolution data */}
          <div>
            <span className="font-semibold">Evolution:</span> {pokemon.evolution}
          </div>
        </TabsContent>

        <TabsContent value="moves" className="space-y-3 text-sm text-gray-700">
          {/* Example of rendering moves */}
          {/* {pokemon.moves.map((move) => (
            <div key={move}>{move}</div>
          ))} */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Utility to capitalize tab names
function capitalizeTabName(tabName: string) {
  return tabName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
