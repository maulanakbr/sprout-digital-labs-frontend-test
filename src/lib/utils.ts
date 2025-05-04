import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { typeEffectiveness } from './type-effectiveness';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCamelCase(str: string) {
  return str
    .split(/[-_]+/)
    .map((word, index) => (index === 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join('');
}

export function transformResponse<T>(response: T, type: 'response' | 'params' = 'response'): T {
  if (Array.isArray(response)) {
    return response.map((item) => transformResponse(item)) as T;
  }

  if (typeof response === 'object' && response !== null) {
    let result: Record<string, any> = {};

    Object.keys(response).forEach((key) => {
      let newKey = type === 'response' ? toCamelCase(key) : toCamelCase(key);
      let value = response[key as keyof typeof response];

      result[newKey] =
        typeof value === 'object' && value !== null ? transformResponse(value) : value;
    });

    return result as T;
  }

  return response;
}

export function capitalizeFirstLetter(letter: string) {
  return letter
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getPokemonTypeClass(types: string[]): string {
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

export function calculateTypeDefenses(types: string[]): Record<string, number> {
  const result: Record<string, number> = {};

  for (const attacker in typeEffectiveness) {
    let multiplier = 1;

    for (const defender of types) {
      const typeEffect = typeEffectiveness[attacker]?.[defender] ?? 1;
      multiplier *= typeEffect;
    }

    result[attacker] = multiplier;
  }

  return result;
}
