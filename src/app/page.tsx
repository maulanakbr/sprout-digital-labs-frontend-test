'use client';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-list-service';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { appendPokemons } from '@/redux/slices/pokemon-list-slice';
import type { RootState } from '@/redux/store';

const LIMIT = 20;

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemonList.pokemons);
  const [offset, setOffset] = React.useState(0);

  const { data, isFetching, error } = useGetPokemonListQuery({ limit: LIMIT, offset });

  const loadMore = React.useCallback(() => {
    setOffset((prev) => prev + LIMIT);
  }, []);

  const { observerRef, done } = useInfiniteScroll(loadMore);

  React.useEffect(() => {
    if (data) {
      dispatch(appendPokemons(data));
      done();
    }
  }, [data, dispatch, done]);

  if (error) return <div>Error loading Pokémon</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="p-4 rounded shadow bg-white">
          <img
            src={pokemon.image ?? ''}
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
      <div ref={observerRef} className="col-span-2 text-center py-6">
        {isFetching ? 'Loading more...' : 'Scroll to load more'}
      </div>
    </div>
  );
}
