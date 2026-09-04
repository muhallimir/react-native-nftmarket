import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { useChain, CHAINS } from "../contexts/ChainContext";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const ChainSelector = ({ compact = false }) => {
  const { chain, setChain } = useChain();
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Selected chain ${chain.label}`}
        onPress={() => setOpen(true)}
        style={[
          styles.button,
          compact && styles.compactButton,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.divider,
          },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: chain.color }]} />
        <Text style={[styles.label, { color: colors.text }]}>{chain.label}</Text>
        <Text style={[styles.caret, { color: colors.textMuted }]}>{"\u25BE"}</Text>
      </TouchableOpacity>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View
            style={[
              styles.sheet,
              { backgroundColor: colors.card, borderColor: colors.divider },
            ]}
          >
            <Text style={[styles.title, { color: colors.text }]}>Select chain</Text>
            <FlatList
              data={CHAINS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.row,
                    item.id === chain.id && {
                      backgroundColor: colors.inputBg,
                    },
                  ]}
                  onPress={() => {
                    setChain(item.id);
                    setOpen(false);
                  }}
                >
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <Text style={[styles.rowLabel, { color: colors.text }]}>{item.label}</Text>
                  <Text style={[styles.gas, { color: colors.textMuted }]}>
                    {item.gasGwei < 1 ? `${item.gasGwei} SOL` : `${item.gasGwei} gwei`}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: SIZES.extraLarge,
    borderWidth: 1,
  },
  compactButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  label: {
    fontWeight: "600",
    fontSize: 12,
    marginRight: 4,
  },
  caret: {
    fontSize: 12,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    maxHeight: 360,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  gas: {
    fontSize: 12,
  },
});

export default ChainSelector;
