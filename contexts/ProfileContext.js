import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/profile/v1";
const ProfileContext = createContext(null);

const DEFAULT_PROFILE = {
  displayName: "Victoria",
  bio: "Collector of generative art and pixel treasures.",
  avatar: null,
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            setProfile({ ...DEFAULT_PROFILE, ...parsed });
          }
        }
      } catch (err) {
        console.warn("ProfileContext: failed to load profile", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile)).catch((err) =>
      console.warn("ProfileContext: failed to persist profile", err)
    );
  }, [profile, hydrated]);

  const updateProfile = useCallback((patch) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetProfile = useCallback(() => setProfile(DEFAULT_PROFILE), []);

  const value = useMemo(
    () => ({ profile, updateProfile, resetProfile, hydrated }),
    [profile, updateProfile, resetProfile, hydrated]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside a ProfileProvider");
  }
  return ctx;
};

export default ProfileContext;
