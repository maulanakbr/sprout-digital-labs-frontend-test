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
import MainLayout from '@/component/layout/main-layout';

const LIMIT = 20;

export default function Page() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemonList.pokemons);
  const [offset, setOffset] = React.useState(0);

  const { data, isFetching, isLoading } = useGetPokemonListQuery({ limit: LIMIT, offset });

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

  return (
    <MainLayout mainClassName="p-4 sm:p-6 lg:p-10">
      <h2 className="mb-6 text-3xl sm:text-4xl font-bold">Pokedex</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {isLoading && pokemons.length === 0 && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
          </>
        )}
        {pokemons.length > 0 &&
          pokemons.map((pokemon) => <PokemonCard pokemon={pokemon} key={pokemon.name} />)}
        {!isLoading && pokemons.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No Pokémon found.</div>
        )}
        <div ref={observerRef} className="col-span-full text-center py-6">
          {isFetching && !isLoading ? (
            <LoadingSpinner />
          ) : (
            <span className="text-sm text-gray-500">Scroll to load more</span>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
