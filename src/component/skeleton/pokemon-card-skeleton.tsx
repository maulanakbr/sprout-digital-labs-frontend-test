export default function PokemonCardSkeleton() {
  return (
    <div className="p-4 rounded shadow bg-gray-100 animate-pulse">
      <div className="w-full h-32 bg-gray-300 rounded mb-3" />
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-gray-300 rounded" />
        <div className="h-4 w-12 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
