'use client';

import * as React from 'react';

/**
 * A custom hook that debounces a value by a specified delay.
 * This hook is useful for preventing excessive updates when dealing with
 * rapidly changing values like search inputs or form fields.
 *
 * @template T - The type of the value to debounce
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds (default: 500ms)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
 *
 *   useEffect(() => {
 *     // This will only run 500ms after the user stops typing
 *     if (debouncedSearchTerm) {
 *       fetchSearchResults(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 *
 *   return (
 *     <input
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function FilterComponent() {
 *   const [filters, setFilters] = useState({ category: '', price: 0 });
 *   const debouncedFilters = useDebounceValue(filters, 300);
 *
 *   useEffect(() => {
 *     // Apply filters 300ms after user stops adjusting them
 *     applyFilters(debouncedFilters);
 *   }, [debouncedFilters]);
 *
 *   return (
 *     <div>
 *       <input
 *         value={filters.category}
 *         onChange={(e) => setFilters({ ...filters, category: e.target.value })}
 *       />
 *       <input
 *         type="number"
 *         value={filters.price}
 *         onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function useDebounceValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
