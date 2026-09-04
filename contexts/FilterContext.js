import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/filters/v1";
const SORT_KEY = "@nftmarket/sort/v1";

const FilterContext = createContext(null);

const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 200,
  category: "All",
  status: "all",
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortKey, setSortKeyState] = useState("newest");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [rawFilters, rawSort] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(SORT_KEY),
        ]);
        if (!cancelled) {
          if (rawFilters) {
            const parsed = JSON.parse(rawFilters);
            if (parsed && typeof parsed === "object") {
              setFilters({ ...DEFAULT_FILTERS, ...parsed });
            }
          }
          if (rawSort) {
            const parsed = JSON.parse(rawSort);
            if (parsed && typeof parsed.sortKey === "string") {
              setSortKeyState(parsed.sortKey);
            }
          }
        }
      } catch (err) {
        console.warn("FilterContext: failed to load state", err);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filters)).catch((err) =>
      console.warn("FilterContext: failed to persist filters", err)
    );
  }, [filters, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(SORT_KEY, JSON.stringify({ sortKey })).catch((err) =>
      console.warn("FilterContext: failed to persist sort", err)
    );
  }, [sortKey, hydrated]);

  const setFilter = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const setSortKey = useCallback((key) => {
    if (typeof key === "string") setSortKeyState(key);
  }, []);

  const value = useMemo(
    () => ({ filters, setFilter, resetFilters, sortKey, setSortKey, hydrated }),
    [filters, setFilter, resetFilters, sortKey, setSortKey, hydrated]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilters must be used inside a FilterProvider");
  }
  return ctx;
};

export default FilterContext;
