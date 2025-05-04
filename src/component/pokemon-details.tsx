'use client';

import type { PokemonDetails } from '@/lib/schemas/pokemon-details-schema';
import { capitalizeFirstLetter, cn, getPokemonTypeClass } from '@/lib/utils';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import Icon from './icon';
import * as React from 'react';
import { PokemonDetailsAboutSkeleton } from './skeleton/pokemon-details-about-skeleton';
import ContentNotAvailable from './misc/content-not-available';
import InfoRow from './rows/info-row';
import BaseStatRow from './rows/base-stat-row';

interface PokemonDetailsProps {
  pokemon: PokemonDetails;
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  function formatHeight(heightDm: number) {
    const cm = heightDm * 10;
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}" (${cm.toFixed(2)} cm)`;
  }

  const pokemonWeight = `${(pokemon.weight * 0.1 * 2.20462).toFixed(1)} lbs (${(pokemon.weight * 0.1).toFixed(1)} kg)`;

  console.log('PKKK', pokemon);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100">
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
      <div className="flex-1 flex flex-col">
        <Tabs
          defaultValue="about"
          className="relative z-10 flex-1 shadow-md flex flex-col bg-white rounded-t-3xl -mt-24 px-6 py-16"
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
          <TabsContent
            value="about"
            className="flex-1 space-y-4 text-sm text-gray-700 overflow-y-auto"
          >
            {!pokemon ? (
              <PokemonDetailsAboutSkeleton />
            ) : (
              <>
                <InfoRow label="Species" value={capitalizeFirstLetter(pokemon.species || '')} />
                <InfoRow label="Height" value={formatHeight(pokemon.height)} />
                <InfoRow label="Weight" value={pokemonWeight} />
                <InfoRow
                  label="Abilities"
                  value={pokemon.abilities.map((p) => capitalizeFirstLetter(p ?? '')).join(', ')}
                />
                <h2 className="mt-8 text-lg font-bold">Breeding</h2>
                <InfoRow
                  label="Gender"
                  value={
                    pokemon.genderRatio ? (
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Icon variants="male" size={16} className="text-blue-600" />
                          {pokemon.genderRatio.male}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon variants="female" size={16} className="text-pink-600" />
                          {pokemon.genderRatio.female}%
                        </span>
                      </div>
                    ) : (
                      'Genderless'
                    )
                  }
                />
                <InfoRow
                  label="Egg Groups"
                  value={pokemon.eggGroups?.map((p) => capitalizeFirstLetter(p ?? '')).join(', ')}
                />
                <InfoRow label="Egg Cycle" value={capitalizeFirstLetter(pokemon.eggCycle ?? '')} />
              </>
            )}
          </TabsContent>
          <TabsContent
            value="base-stats"
            className="flex-1 space-y-3 text-sm text-gray-700 overflow-y-auto"
          >
            {pokemon.stats.map((p) => (
              <BaseStatRow
                label={
                  p.stat === 'special-attack'
                    ? 'Sp. Atk'
                    : p.stat === 'special-defense'
                      ? 'Sp. Def'
                      : p.stat
                }
                value={p.baseStat}
                key={p.stat}
              />
            ))}
            <BaseStatRow
              label="Total"
              value={pokemon.stats.reduce((acc, cur) => acc + cur.baseStat, 0)}
              isTotal
            />
            <h2 className="mt-8 text-lg font-bold">Type Defenses</h2>
            <p className="font-medium text-gray-400">
              The effectiveness of each type on {capitalizeFirstLetter(pokemon.name)}
            </p>
          </TabsContent>
          <TabsContent
            value="evolution"
            className="flex-1 space-y-3 text-sm text-gray-700 overflow-y-auto"
          >
            <ContentNotAvailable />
          </TabsContent>
          {/* Moves Tab */}
          <TabsContent
            value="moves"
            className="flex-1 space-y-2 text-sm text-gray-700 overflow-y-auto"
          >
            <ContentNotAvailable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
