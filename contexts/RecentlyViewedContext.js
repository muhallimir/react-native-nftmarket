import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/recently-viewed/v1";
const MAX_ITEMS = 10;
const RecentlyViewedContext = createContext(null);

export const RecentlyViewedProvider = ({ children }) => {
  const [ids, setIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setIds(parsed.filter((id) => typeof id === "string").slice(0, MAX_ITEMS));
          }
        }
      } catch (err) {
        console.warn("RecentlyViewedContext: failed to load ids", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch((err) =>
      console.warn("RecentlyViewedContext: failed to persist ids", err)
    );
  }, [ids, hydrated]);

  const track = useCallback((id) => {
    if (!id || typeof id !== "string") return;
    setIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, track, clear, hydrated }),
    [ids, track, clear, hydrated]
  );

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
};

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) {
    throw new Error("useRecentlyViewed must be used inside a RecentlyViewedProvider");
  }
  return ctx;
};

export default RecentlyViewedContext;
