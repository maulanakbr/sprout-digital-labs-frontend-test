import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
