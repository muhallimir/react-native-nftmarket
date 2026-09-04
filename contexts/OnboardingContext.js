import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/onboarding/v1";
const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object" && parsed.done === true) {
            setDone(true);
          }
        }
      } catch (err) {
        console.warn("OnboardingContext: failed to load state", err);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const complete = useCallback(async () => {
    setDone(true);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ done: true }));
    } catch (err) {
      console.warn("OnboardingContext: failed to persist state", err);
    }
  }, []);

  const reset = useCallback(async () => {
    setDone(false);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ done: false }));
    } catch (err) {
      console.warn("OnboardingContext: failed to reset state", err);
    }
  }, []);

  const value = useMemo(
    () => ({ done, complete, reset, hydrated }),
    [done, complete, reset, hydrated]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used inside an OnboardingProvider");
  }
  return ctx;
};

export default OnboardingContext;
