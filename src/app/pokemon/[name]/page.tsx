'use client';

import LoadingSpinner from '@/component/misc/loading-spinner';
import { useGetPokemonDetailsQuery } from '@/redux/services/pokemon-details.service';
import PokemonDetails from '@/component/pokemon-details';
import * as React from 'react';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { name } = React.use(params);

  const { data, error, isLoading } = useGetPokemonDetailsQuery({ name });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log('ER', error);
    return <div>Error loading Pokémon details!</div>;
  }

  return <>{data && <PokemonDetails pokemon={data} />}</>;
}
