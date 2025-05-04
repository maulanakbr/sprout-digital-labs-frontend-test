'use client';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonListQuery } from '@/redux/services/pokemon-list-service';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { appendPokemons } from '@/redux/slices/pokemon-list-slice';
import type { RootState } from '@/redux/store';
import PokemonCard from '@/component/card/pokemon-card';
import PokemonCardSkeleton from '@/component/skeleton/pokemon-card-skeleton';
import LoadingSpinner from '@/component/misc/loading-spinner';

const LIMIT = 20;

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemonList.pokemons);
  const [offset, setOffset] = React.useState(0);

  const { data, isFetching, isLoading, error } = useGetPokemonListQuery({ limit: LIMIT, offset });

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

  if (error) return <div className="text-red-500">Error loading Pokémon</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {isLoading && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
        </>
      )}

      {!isLoading && pokemons.length > 0 && <PokemonCard pokemons={pokemons} />}

      {!isLoading && pokemons.length === 0 && (
        <div className="col-span-2 text-center text-gray-500">No Pokémon found.</div>
      )}

      <div ref={observerRef} className="col-span-2 text-center py-6">
        {isFetching && !isLoading ? (
          <LoadingSpinner />
        ) : (
          <span className="text-sm text-gray-500">Scroll to load more</span>
        )}
      </div>
    </div>
  );
}
