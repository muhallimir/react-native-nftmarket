import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@nftmarket/bids/v1";
const BidsContext = createContext(null);

export const BidsProvider = ({ children }) => {
  const [bidsByNft, setBidsByNft] = useState({});
  const [activity, setActivity] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            if (parsed.bidsByNft && typeof parsed.bidsByNft === "object") {
              setBidsByNft(parsed.bidsByNft);
            }
            if (Array.isArray(parsed.activity)) {
              setActivity(parsed.activity);
            }
          }
        }
      } catch (err) {
        console.warn("BidsContext: failed to load state", err);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ bidsByNft, activity })).catch((err) =>
      console.warn("BidsContext: failed to persist state", err)
    );
  }, [bidsByNft, activity, hydrated]);

  const placeBid = useCallback((nftId, payload) => {
    const bid = {
      id: `BID-${Date.now()}`,
      name: payload.bidderName || "You",
      price: Number(payload.amount),
      image: payload.image,
      date: new Date().toLocaleString(),
      nftId,
    };
    setBidsByNft((prev) => {
      const list = Array.isArray(prev[nftId]) ? prev[nftId] : [];
      return { ...prev, [nftId]: [bid, ...list] };
    });
    setActivity((prev) => [
      { type: "bid", nftId, amount: bid.price, at: bid.date, id: bid.id },
      ...prev,
    ].slice(0, 50));
    return bid;
  }, []);

  const bidsFor = useCallback((nftId) => bidsByNft[nftId] || [], [bidsByNft]);

  const totalBidsPlaced = useMemo(
    () => activity.filter((a) => a.type === "bid").length,
    [activity]
  );

  const value = useMemo(
    () => ({ bidsByNft, bidsFor, placeBid, activity, totalBidsPlaced, hydrated }),
    [bidsByNft, bidsFor, placeBid, activity, totalBidsPlaced, hydrated]
  );

  return <BidsContext.Provider value={value}>{children}</BidsContext.Provider>;
};

export const useBids = () => {
  const ctx = useContext(BidsContext);
  if (!ctx) {
    throw new Error("useBids must be used inside a BidsProvider");
  }
  return ctx;
};

export default BidsContext;
