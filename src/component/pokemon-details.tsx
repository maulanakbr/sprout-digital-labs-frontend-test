'use client';

import type { PokemonDetails } from '@/lib/schemas/pokemon-details-schema';
import { capitalizeFirstLetter, cn, getPokemonTypeClass } from '@/lib/utils';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface PokemonDetailsProps {
  pokemon: PokemonDetails;
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Header Section */}
      <div
        className={cn(
          'relative pt-10 pb-6 px-6 rounded-b-3xl shadow-md',
          getPokemonTypeClass(pokemon.types)
        )}
      >
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold text-white capitalize">{pokemon.name}</h1>
          <span className="text-white text-xl font-semibold">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="bg-white/30 px-3 py-1 text-white text-sm rounded-full backdrop-blur-sm"
            >
              {type}
            </span>
          ))}
        </div>
        {pokemon.image && (
          <div className="relative z-20 flex justify-center -mt-20">
            <div className="w-[470px] h-[470px]">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs Section */}
      <div className="flex-1 flex flex-col">
        <Tabs
          defaultValue="about"
          className="relative z-10 flex-1 flex flex-col bg-white rounded-t-3xl -mt-24 px-6 py-16"
        >
          <TabsList className="w-full flex justify-between border-b border-gray-200">
            {['about', 'base-stats', 'evolution', 'moves'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 text-center pb-2 text-sm font-semibold text-gray-600 border-b-2 border-transparent transition-all hover:border-gray-300"
              >
                {capitalizeFirstLetter(tab)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* About Tab */}
          <TabsContent
            value="about"
            className="flex-1 space-y-4 text-sm text-gray-700 overflow-y-auto"
          >
            <InfoRow label="Species" value={pokemon.species} />
            <InfoRow label="Height" value={`${pokemon.height} dm`} />
            <InfoRow label="Weight" value={`${pokemon.weight} hg`} />
            <InfoRow
              label="Abilities"
              value={pokemon.abilities.map((p) => capitalizeFirstLetter(p)).join(', ')}
            />
            <h2 className="mb-6 mt-10 text-xl font-bold">Breeding</h2>
            <InfoRow label="Gender" value={pokemon.genderRatio?.male as number} />
            <InfoRow label="Egg Group" value={pokemon.eggGroup} />
            <InfoRow label="Egg Cycle" value={pokemon.eggCycle} />
          </TabsContent>

          {/* Base Stats Tab */}
          <TabsContent
            value="base-stats"
            className="flex-1 space-y-3 text-sm text-gray-700 overflow-y-auto"
          >
            {/* Uncomment and map your base stats here */}
            {/* {pokemon.baseStats.map((stat) => (
              <InfoRow key={stat.name} label={stat.name} value={stat.value.toString()} />
            ))} */}
          </TabsContent>

          {/* Evolution Tab */}
          <TabsContent
            value="evolution"
            className="flex-1 space-y-3 text-sm text-gray-700 overflow-y-auto"
          >
            <InfoRow label="Evolution" value={pokemon.evolution} />
          </TabsContent>

          {/* Moves Tab */}
          <TabsContent
            value="moves"
            className="flex-1 space-y-2 text-sm text-gray-700 overflow-y-auto"
          >
            {/* Uncomment and map your moves here */}
            {/* {pokemon.moves.map((move) => (
              <span key={move} className="block">
                {move}
              </span>
            ))} */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="grid grid-cols-[120px_1fr] w-full gap-4">
      <span className="font-medium text-gray-400">{label}</span>
      <span className="text-gray-900">{value || '-'}</span>
    </div>
  );
}
