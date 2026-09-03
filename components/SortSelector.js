import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const SortButton = ({ label, active: isActive, onPress }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityState={{ selected: isActive }}
    onPress={onPress}
    style={[styles.button, isActive && styles.buttonActive]}
  >
    <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
  </TouchableOpacity>
);

const SortSelector = ({ value, onChange }) => {
  return (
    <View style={styles.wrap}>
      <SortButton label="Newest" active={value === "newest"} onPress={() => onChange("newest")} />
      <SortButton label="Price ↑" active={value === "asc"} onPress={() => onChange("asc")} />
      <SortButton label="Price ↓" active={value === "desc"} onPress={() => onChange("desc")} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F5",
  },
  button: {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.extraLarge,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#E0E5E9",
    marginRight: SIZES.base,
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  labelActive: {
    color: COLORS.white,
  },
});

export default SortSelector;