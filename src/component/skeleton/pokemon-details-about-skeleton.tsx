function InfoRowSkeleton() {
  return (
    <div className="grid grid-cols-[120px_1fr] w-full gap-4 items-center">
      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
    </div>
  );
}

export function PokemonDetailsAboutSkeleton() {
  return (
    <div className="flex-1 space-y-4 text-sm text-gray-700 overflow-y-auto">
      <InfoRowSkeleton />
      <InfoRowSkeleton />
      <InfoRowSkeleton />
      <InfoRowSkeleton />
      <div className="h-5 w-24 bg-gray-300 rounded mt-8 animate-pulse" />
      <InfoRowSkeleton />
      <InfoRowSkeleton />
      <InfoRowSkeleton />
    </div>
  );
}
