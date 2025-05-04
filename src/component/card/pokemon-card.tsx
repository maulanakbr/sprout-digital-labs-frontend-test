'use client';

import type { PokemonListWithDetails } from '@/lib/schemas/pokemon-list-schema';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: PokemonListWithDetails;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  function getPokemonTypeClass(types: string[]): string {
    if (types.includes('fire') || types.includes('dragon') || types.includes('fighting'))
      return 'bg-red-400';
    if (types.includes('water') || types.includes('ice')) return 'bg-blue-400';
    if (types.includes('flying')) return 'bg-sky-300';
    if (types.includes('electric') || types.includes('normal')) return 'bg-amber-300';
    if (types.includes('ground')) return 'bg-orange-400';
    if (types.includes('dark') || types.includes('ghost')) return 'bg-neutral-600';
    if (types.includes('rock') || types.includes('steel')) return 'bg-gray-400';
    if (types.includes('grass') || types.includes('poison') || types.includes('bug'))
      return 'bg-emerald-400';
    if (types.includes('psychic') || types.includes('fairy')) return 'bg-purple-400';

    return 'bg-white';
  }

  return (
    <Link
      className={cn(
        'p-6 rounded-2xl shadow-md flex items-center justify-between gap-6 transition-transform hover:scale-[1.01]',
        getPokemonTypeClass(pokemon.types)
      )}
      href={`/pokemon/${pokemon.name}`}
      passHref
    >
      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="text-xl text-white font-bold capitalize">{pokemon.name}</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="text-xs px-3 py-1 rounded-full bg-white/30 text-white font-medium capitalize backdrop-blur-sm"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      {pokemon.image && (
        <div className="flex-shrink-0 w-28 h-28 relative">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="112px"
          />
        </div>
      )}
    </Link>
  );
}
