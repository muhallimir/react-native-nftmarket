import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path, Rect, Line, G } from "react-native-svg";

const NoResultsIllustration = ({ size = 140, color = "#9AA3AB" }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    <Circle cx="50" cy="50" r="28" fill="none" stroke={color} strokeWidth="6" />
    <Line x1="72" y1="72" x2="100" y2="100" stroke={color} strokeWidth="6" strokeLinecap="round" />
    <Line x1="40" y1="40" x2="60" y2="60" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
  </Svg>
);

const NoFavoritesIllustration = ({ size = 140, color = "#FF3B5C" }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    <Path
      d="M60 96 C 24 72 18 50 32 36 C 44 26 56 32 60 44 C 64 32 76 26 88 36 C 102 50 96 72 60 96 Z"
      fill="none"
      stroke={color}
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </Svg>
);

const NoBidsIllustration = ({ size = 140, color = "#001F2D" }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    <G>
      <Rect x="44" y="30" width="32" height="64" rx="4" fill="none" stroke={color} strokeWidth="5" />
      <Line x1="48" y1="46" x2="72" y2="46" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <Line x1="48" y1="58" x2="72" y2="58" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <Line x1="48" y1="70" x2="72" y2="70" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </G>
    <Path d="M76 70 L96 70 L88 60 Z" fill={color} />
  </Svg>
);

const ILLUSTRATIONS = {
  results: NoResultsIllustration,
  favorites: NoFavoritesIllustration,
  bids: NoBidsIllustration,
};

const EmptyState = ({ kind = "results", title, message, accentColor }) => {
  const Illustration = ILLUSTRATIONS[kind] || NoResultsIllustration;
  const color = accentColor || (kind === "favorites" ? "#FF3B5C" : kind === "bids" ? "#001F2D" : "#9AA3AB");
  return (
    <View style={styles.wrap} accessibilityRole="text" accessibilityLabel={`${title}. ${message}`}>
      <Illustration color={color} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#001F2D",
  },
  message: {
    marginTop: 6,
    fontSize: 13,
    color: "#4D626C",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default EmptyState;
