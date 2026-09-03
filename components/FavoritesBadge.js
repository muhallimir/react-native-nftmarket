import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { useFavorites } from "../contexts/FavoritesContext";

const FavoritesBadge = () => {
  const { favorites, hydrated } = useFavorites();
  const count = hydrated ? favorites.length : 0;
  return (
    <View style={styles.wrap} accessibilityRole="text" accessibilityLabel={`${count} favorites`}>
      <Text style={styles.heart}>{count > 0 ? "\u2665" : "\u2661"}</Text>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.base,
    paddingVertical: 6,
    borderRadius: SIZES.extraLarge,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  heart: {
    fontSize: 14,
    color: COLORS.white,
    marginRight: 6,
  },
  text: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});

export default FavoritesBadge;