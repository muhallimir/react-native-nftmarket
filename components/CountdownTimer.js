import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const formatRemaining = (ms) => {
  if (ms <= 0) {
    return { ended: true, label: "Auction ended" };
  }
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  let label = "";
  if (days > 0) label += `${days}d `;
  if (days > 0 || hours > 0) label += `${hours}h `;
  label += `${minutes}m`;
  return { ended: false, label: label.trim(), detail: seconds };
};

const CountdownTimer = ({ endsAt, compact = false }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!endsAt) return undefined;
    const target = new Date(endsAt).getTime();
    if (Number.isNaN(target)) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!endsAt) return null;
  const target = new Date(endsAt).getTime();
  if (Number.isNaN(target)) return null;

  const { ended, label, detail } = formatRemaining(target - now);

  if (compact) {
    return (
      <View style={styles.compactWrap}>
        <Text style={styles.compactLabel}>{ended ? label : `${label} ${detail}s`}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{ended ? "Status" : "Auction ends in"}</Text>
      <Text style={[styles.value, ended && styles.ended]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...{
      shadowColor: COLORS.gray,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    borderRadius: SIZES.base,
  },
  heading: {
    fontSize: SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.primary,
  },
  value: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginTop: 2,
  },
  ended: {
    color: "#FF3B5C",
  },
  compactWrap: {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
    ...{
      shadowColor: COLORS.gray,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },
  compactLabel: {
    fontSize: SIZES.small,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});

export default CountdownTimer;