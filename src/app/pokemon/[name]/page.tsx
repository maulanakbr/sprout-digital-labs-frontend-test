'use client';

import LoadingSpinner from '@/component/misc/loading-spinner';
import { useGetPokemonDetailsQuery } from '@/redux/services/pokemon-details.service';
import PokemonDetails from '@/component/pokemon-details';
import * as React from 'react';
import MainLayout from '@/component/layout/main-layout';
import { getPokemonTypeClass } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import ErrorNotFound from '@/component/misc/error-not-found';

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
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <ErrorNotFound
        message={
          <>
            We couldn’t load this Pokémon’s details. Maybe it used <strong>Teleport</strong>?
          </>
        }
      />
    );
  }

  const handleClick = () => {
    router.push('/');
  };

  return (
    <MainLayout
      headerClassName={getBackgroundColor}
      buttonClassName="text-white"
      handleClick={handleClick}
    >
      {data && <PokemonDetails pokemon={data} />}
    </MainLayout>
  );
}
