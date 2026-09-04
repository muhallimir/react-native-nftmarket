import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/reports/v1";
const ReportsContext = createContext(null);

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setReports(parsed);
        }
      } catch (err) {
        console.warn("ReportsContext: failed to load reports", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reports)).catch((err) =>
      console.warn("ReportsContext: failed to persist reports", err)
    );
  }, [reports, hydrated]);

  const submit = useCallback((nftId, reason, note) => {
    const entry = {
      id: `REP-${Date.now()}`,
      nftId,
      reason,
      note: note || "",
      at: new Date().toISOString(),
    };
    setReports((prev) => [entry, ...prev].slice(0, 100));
    return entry;
  }, []);

  const value = useMemo(
    () => ({ reports, submit, hydrated }),
    [reports, submit, hydrated]
  );

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

export const useReports = () => {
  const ctx = useContext(ReportsContext);
  if (!ctx) {
    throw new Error("useReports must be used inside a ReportsProvider");
  }
  return ctx;
};

export default ReportsContext;
