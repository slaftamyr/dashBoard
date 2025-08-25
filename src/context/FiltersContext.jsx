import { createContext, useContext, useMemo, useState } from 'react';

const FiltersContext = createContext(null);

const defaultFilters = { range: '12m', category: 'all', q: '' };

export function FiltersProvider({ children, initial = defaultFilters }) {
  const [filters, setFilters] = useState(initial);

  const value = useMemo(() => ({
    filters,
    setFilters,
    update: (patch) => setFilters((prev) => ({ ...prev, ...patch })),
    reset: () => setFilters(defaultFilters),
  }), [filters]);

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters must be used within FiltersProvider');
  return ctx;
}
