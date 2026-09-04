import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightPalette, darkPalette } from "./palettes";

const STORAGE_KEY = "@nftmarket/theme/v1";

const ThemeContext = createContext(null);

const resolveMode = (pref) => {
  if (pref === "light" || pref === "dark") return pref;
  const sys = Appearance.getColorScheme();
  return sys === "dark" ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
  const [pref, setPref] = useState("system");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed.preference === "string") {
            setPref(parsed.preference);
          }
        }
      } catch (err) {
        console.warn("ThemeContext: failed to load preference", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ preference: pref })).catch((err) =>
      console.warn("ThemeContext: failed to persist preference", err)
    );
  }, [pref, hydrated]);

  const [systemScheme, setSystemScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    return () => {
      if (sub && typeof sub.remove === "function") sub.remove();
    };
  }, []);

  const effectiveMode = pref === "system" ? (systemScheme === "dark" ? "dark" : "light") : pref;
  const colors = effectiveMode === "dark" ? darkPalette : lightPalette;

  const setPreference = useCallback((next) => {
    if (next === "light" || next === "dark" || next === "system") {
      setPref(next);
    }
  }, []);

  const toggle = useCallback(() => {
    setPref((cur) => {
      const base = cur === "system" ? resolveMode("system") : cur;
      return base === "dark" ? "light" : "dark";
    });
  }, []);

  const value = useMemo(
    () => ({ pref, mode: effectiveMode, colors, setPreference, toggle, hydrated }),
    [pref, effectiveMode, colors, setPreference, toggle, hydrated]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return ctx;
};

export default ThemeContext;
