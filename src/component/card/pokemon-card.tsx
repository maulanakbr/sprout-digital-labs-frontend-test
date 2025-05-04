import type { PokemonListWithDetails } from '@/lib/schemas/pokemon-list-schema';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemons: PokemonListWithDetails;
}

export default function PokemonCard({ pokemons }: PokemonCardProps) {
  function getPokemonTypeClass(types: string[]): string {
    if (types.includes('fire') || types.includes('dragon')) return 'bg-red-300';
    if (types.includes('water') || types.includes('ice')) return 'bg-blue-300';
    if (types.includes('flying')) return 'bg-sky-200';
    if (types.includes('electric')) return 'bg-amber-200';
    if (types.includes('ground')) return 'bg-orange-300';
    if (types.includes('dark') || types.includes('ghost')) return 'bg-neutral-500';
    if (types.includes('rock') || types.includes('steel')) return 'bg-gray-300';
    if (types.includes('grass') || types.includes('poison')) return 'bg-emerald-300';
    return 'bg-white';
  }

  return (
    <>
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className={cn('p-4 rounded shadow-md', getPokemonTypeClass(pokemon.types))}
        >
          <img
            src={pokemon.image as string}
            alt={pokemon.name}
            className="w-full h-32 object-contain"
          />
          <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
          <div className="flex gap-2 mt-1">
            {pokemon.types.map((type) => (
              <span key={type} className="text-sm px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                {type}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
