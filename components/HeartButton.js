import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useFavorites } from "../contexts/FavoritesContext";

const HeartButton = ({ nftId, style, size = 22, color = "#FF3B5C", inactiveColor = "#FFFFFF" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(nftId);

  const onPress = () => {
    toggleFavorite(nftId);
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={active ? "Remove from favorites" : "Add to favorites"}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={style}
    >
      <View style={styles.wrap}>
        <Text
          style={[
            styles.heart,
            {
              fontSize: size,
              lineHeight: size + 2,
              color: active ? color : inactiveColor,
            },
          ]}
        >
          {active ? "\u2665" : "\u2661"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  heart: {
    textAlign: "center",
  },
});

export default HeartButton;