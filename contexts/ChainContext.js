import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/chain/v1";
export const CHAINS = [
  { id: "ethereum", label: "Ethereum", chainId: "0x1", gasGwei: 28, color: "#627EEA" },
  { id: "polygon", label: "Polygon", chainId: "0x89", gasGwei: 95, color: "#8247E5" },
  { id: "solana", label: "Solana", chainId: "solana", gasGwei: 0.000005, color: "#9945FF" },
  { id: "base", label: "Base", chainId: "0x2105", gasGwei: 1, color: "#0052FF" },
];

const ChainContext = createContext(null);

export const ChainProvider = ({ children }) => {
  const [chainId, setChainIdState] = useState("ethereum");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed.chainId === "string") {
            const found = CHAINS.find((c) => c.id === parsed.chainId);
            if (found) setChainIdState(found.id);
          }
        }
      } catch (err) {
        console.warn("ChainContext: failed to load selection", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ chainId })).catch((err) =>
      console.warn("ChainContext: failed to persist selection", err)
    );
  }, [chainId, hydrated]);

  const chain = useMemo(() => CHAINS.find((c) => c.id === chainId) || CHAINS[0], [chainId]);

  const setChain = useCallback((id) => {
    if (CHAINS.some((c) => c.id === id)) {
      setChainIdState(id);
    }
  }, []);

  const value = useMemo(
    () => ({ chain, chainId, setChain, chains: CHAINS, hydrated }),
    [chain, chainId, setChain, hydrated]
  );

  return <ChainContext.Provider value={value}>{children}</ChainContext.Provider>;
};

export const useChain = () => {
  const ctx = useContext(ChainContext);
  if (!ctx) {
    throw new Error("useChain must be used inside a ChainProvider");
  }
  return ctx;
};

export const estimateGasFee = (chain, amountEth) => {
  if (!chain) return 0;
  // 200k gas units, gas price in gwei -> convert to ETH
  const gasUnits = 200000;
  const feeEth = (gasUnits * chain.gasGwei) / 1e9;
  // Cap at 25% of the bid for sanity.
  if (!amountEth) return feeEth;
  return Math.min(feeEth, amountEth * 0.25);
};

export default ChainContext;
