import React, { useMemo } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useFilters } from "../contexts/FilterContext";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const CATEGORIES = ["All", "Abstract", "Generative", "Animation", "Pixel", "Sculpture"];
const STATUS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "ended", label: "Ended" },
];

const PRICE_STEPS = [0, 25, 50, 100, 200];

const FilterChip = ({ label, active, onPress, theme }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityState={{ selected: active }}
    onPress={onPress}
    style={[
      styles.chip,
      {
        backgroundColor: active ? theme.colors.primary : theme.colors.inputBg,
        borderColor: theme.colors.divider,
      },
    ]}
  >
    <Text
      style={[
        styles.chipLabel,
        { color: active ? theme.colors.textInverse : theme.colors.text },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const SearchFilters = ({ visible, onClose }) => {
  const { filters, setFilter, resetFilters } = useFilters();
  const theme = useTheme();
  const { colors } = theme;

  const activePrice = useMemo(() => {
    const idx = PRICE_STEPS.findIndex((v) => v >= filters.priceMax);
    return idx < 0 ? PRICE_STEPS.length - 1 : idx;
  }, [filters.priceMax]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.divider }]}
        >
          <View style={styles.handle} />
          <Text style={[styles.title, { color: colors.text }]}>Filters</Text>

          <Text style={[styles.section, { color: colors.textMuted }]}>Price ceiling</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
            {PRICE_STEPS.map((value, idx) => (
              <FilterChip
                key={value}
                theme={theme}
                label={`\u2264 ${value} ETH`}
                active={activePrice === idx}
                onPress={() => setFilter({ priceMax: value })}
              />
            ))}
          </ScrollView>

          <Text style={[styles.section, { color: colors.textMuted }]}>Category</Text>
          <View style={styles.wrapRow}>
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                theme={theme}
                label={cat}
                active={filters.category === cat}
                onPress={() => setFilter({ category: cat })}
              />
            ))}
          </View>

          <Text style={[styles.section, { color: colors.textMuted }]}>Status</Text>
          <View style={styles.row}>
            {STATUS.map((s) => (
              <FilterChip
                key={s.id}
                theme={theme}
                label={s.label}
                active={filters.status === s.id}
                onPress={() => setFilter({ status: s.id })}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={resetFilters}
              style={[styles.btn, { backgroundColor: colors.inputBg }]}
            >
              <Text style={[styles.btnLabel, { color: colors.text }]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={onClose}
              style={[styles.btn, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.btnLabel, { color: colors.textInverse }]}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: "transparent",
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#A0A0A0",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  section: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: SIZES.extraLarge,
    alignItems: "center",
    marginRight: 8,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
});

export default SearchFilters;
