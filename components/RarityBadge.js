import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { computeRarity } from "../utils/rarity";

const RarityBadge = ({ nft, compact = false }) => {
  const { tier, score } = computeRarity(nft);
  return (
    <View
      accessibilityLabel={`${tier.tier} rarity, score ${score}`}
      style={[
        styles.wrap,
        compact && styles.compactWrap,
        { backgroundColor: tier.color },
      ]}
    >
      <Text style={styles.icon}>{tier.icon}</Text>
      {!compact && (
        <View style={styles.textCol}>
          <Text style={styles.tier}>{tier.tier}</Text>
          <Text style={styles.score}>Score {score}</Text>
        </View>
      )}
      {compact && <Text style={styles.compactTier}>{tier.tier}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  compactWrap: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  icon: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
    marginRight: 6,
  },
  compactTier: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 10,
    marginLeft: 4,
  },
  textCol: {
    flexDirection: "column",
  },
  tier: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
  },
  score: {
    color: "#FFFFFF",
    fontSize: 9,
    opacity: 0.85,
  },
});

export default RarityBadge;
