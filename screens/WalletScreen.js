import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { useWallet } from "../contexts/WalletContext";
import { useChain } from "../contexts/ChainContext";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const MetaMaskMark = ({ size = 56 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width="64" height="64" rx="14" fill="#F0A744" />
    <Path
      d="M32 12 L48 22 L44 44 L32 52 L20 44 L16 22 Z"
      fill="#FFFFFF"
      opacity="0.95"
    />
    <Circle cx="32" cy="34" r="6" fill="#F0A744" />
  </Svg>
);

const WalletScreen = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { wallet, connect, disconnect } = useWallet();
  const { chain, chains } = useChain();
  const [modalVisible, setModalVisible] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (connecting) {
      Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 900,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spin.stopAnimation();
      spin.setValue(0);
    }
  }, [connecting, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  const handleConnect = () => {
    setModalVisible(true);
    setConnecting(true);
    setTimeout(() => {
      connect();
      setConnecting(false);
      setModalVisible(false);
    }, 1300);
  };

  const balance = wallet.connected ? "2.4831" : "0.0000";

  return (
    <SafeAreaView style={[styles.wrap, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: colors.inputBg }]}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={[styles.backArrow, { color: colors.text }]}>{"\u2039"}</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Wallet</Text>
          <View style={{ width: 40 }} />
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: wallet.connected ? colors.primary : colors.card,
              borderColor: colors.divider,
            },
          ]}
        >
          <View style={styles.cardTop}>
            <MetaMaskMark size={56} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[
                  styles.cardLabel,
                  { color: wallet.connected ? colors.textInverse : colors.textMuted },
                ]}
              >
                {wallet.connected ? "Connected" : "Not connected"}
              </Text>
              <Text
                style={[
                  styles.cardAddress,
                  { color: wallet.connected ? colors.textInverse : colors.text },
                ]}
                numberOfLines={1}
              >
                {wallet.connected
                  ? wallet.ens || shortAddress(wallet.address)
                  : "0x0000\u20260000"}
              </Text>
            </View>
          </View>
          <View style={styles.cardStats}>
            <View>
              <Text
                style={[
                  styles.cardStatLabel,
                  { color: wallet.connected ? colors.textInverse : colors.textMuted },
                ]}
              >
                Balance
              </Text>
              <Text
                style={[
                  styles.cardStatValue,
                  { color: wallet.connected ? colors.textInverse : colors.text },
                ]}
              >
                {balance} ETH
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.cardStatLabel,
                  { color: wallet.connected ? colors.textInverse : colors.textMuted },
                ]}
              >
                Network
              </Text>
              <Text
                style={[
                  styles.cardStatValue,
                  { color: wallet.connected ? colors.textInverse : colors.text },
                ]}
              >
                {chain.label}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={wallet.connected ? "Disconnect wallet" : "Connect wallet"}
          onPress={wallet.connected ? disconnect : handleConnect}
          style={[
            styles.cta,
            {
              backgroundColor: wallet.connected ? colors.danger : colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.ctaLabel,
              { color: wallet.connected ? colors.textInverse : colors.textInverse },
            ]}
          >
            {wallet.connected ? "Disconnect wallet" : "Connect wallet"}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.section, { color: colors.textMuted }]}>Supported networks</Text>
        <View style={styles.chainGrid}>
          {chains.map((c) => (
            <View
              key={c.id}
              style={[
                styles.chainRow,
                {
                  backgroundColor: colors.card,
                  borderColor: c.id === chain.id ? colors.primary : colors.divider,
                },
              ]}
            >
              <View style={[styles.chainDot, { backgroundColor: c.color }]} />
              <Text style={[styles.chainLabel, { color: colors.text }]}>{c.label}</Text>
              <Text style={[styles.chainGas, { color: colors.textMuted }]}>
                {c.gasGwei < 1 ? `${c.gasGwei} SOL` : `${c.gasGwei} gwei`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={[styles.modalBackdrop, { backgroundColor: colors.overlay }]}>
          <View
            style={[
              styles.modalSheet,
              { backgroundColor: colors.card, borderColor: colors.divider },
            ]}
          >
            <Animated.View style={{ transform: [{ rotate }] }}>
              <MetaMaskMark size={64} />
            </Animated.View>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {connecting ? "Connecting to MetaMask" : "Connected"}
            </Text>
            <Text style={[styles.modalSub, { color: colors.textMuted }]}>
              {connecting
                ? "Confirm the connection in your wallet."
                : "You are now connected to the marketplace."}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const shortAddress = (addr) => {
  if (!addr) return "";
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}\u2026${addr.slice(-4)}`;
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 24,
    fontWeight: "700",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  cardAddress: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  cardStatLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  cardStatValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  cta: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: SIZES.extraLarge,
    alignItems: "center",
  },
  ctaLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontWeight: "700",
  },
  chainGrid: {
    marginHorizontal: -4,
  },
  chainRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  chainDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  chainLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  chainGas: {
    fontSize: 12,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalSheet: {
    width: "100%",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  modalTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
  },
  modalSub: {
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
  },
});

export default WalletScreen;
