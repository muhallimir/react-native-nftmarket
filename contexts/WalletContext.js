import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/wallet/v1";
const WalletContext = createContext(null);

const DEFAULT_WALLET = {
  address: "",
  connected: false,
  chainId: "0x1",
  ens: "",
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(DEFAULT_WALLET);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            setWallet({ ...DEFAULT_WALLET, ...parsed });
          }
        }
      } catch (err) {
        console.warn("WalletContext: failed to load state", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wallet)).catch((err) =>
      console.warn("WalletContext: failed to persist state", err)
    );
  }, [wallet, hydrated]);

  const connect = useCallback((payload = {}) => {
    const address = payload.address || "0x4F3aB6C8b91D8e9C7a6e5D4c3B2A1098F7E6D5C4";
    const ens = payload.ens || "victoria.eth";
    setWallet({ address, ens, connected: true, chainId: wallet.chainId || "0x1" });
  }, [wallet.chainId]);

  const disconnect = useCallback(() => {
    setWallet({ ...DEFAULT_WALLET, chainId: wallet.chainId });
  }, [wallet.chainId]);

  const setChain = useCallback((chainId) => {
    setWallet((prev) => ({ ...prev, chainId }));
  }, []);

  const value = useMemo(
    () => ({ wallet, connect, disconnect, setChain, hydrated }),
    [wallet, connect, disconnect, setChain, hydrated]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used inside a WalletProvider");
  }
  return ctx;
};

export default WalletContext;
