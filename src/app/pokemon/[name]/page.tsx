'use client';

import LoadingSpinner from '@/component/misc/loading-spinner';
import { useGetPokemonDetailsQuery } from '@/redux/services/pokemon-details.service';
import PokemonDetails from '@/component/pokemon-details';
import * as React from 'react';
import MainLayout from '@/component/layout/main-layout';
import { getPokemonTypeClass } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  const { name } = React.use(params);

  const { data, error, isLoading } = useGetPokemonDetailsQuery({ name });

  let getBackgroundColor!: string;
  if (data) {
    getBackgroundColor = getPokemonTypeClass(data.types);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading Pokémon details!</div>;
  }

  const handleClick = () => {
    router.push('/');
  };

  return (
    <MainLayout headerClassName={getBackgroundColor} handleClick={handleClick}>
      {data && <PokemonDetails pokemon={data} />}
    </MainLayout>
  );
}
