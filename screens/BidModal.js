import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useBids } from "../contexts/BidsContext";
import { useChain, estimateGasFee } from "../contexts/ChainContext";
import ChainSelector from "../components/ChainSelector";
import { SIZES } from "../constants";

const Confetti = ({ theme }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 250,
        delay: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.05] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.confetti,
        { transform: [{ scale }], opacity, borderColor: theme.colors.success },
      ]}
    >
      <Text style={[styles.confettiText, { color: theme.colors.success }]}>Bid placed</Text>
    </Animated.View>
  );
};

const BidModal = ({ visible, nft, onClose }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { placeBid } = useBids();
  const { chain } = useChain();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const topBid = nft && nft.bids && nft.bids.length ? nft.bids[0].price : nft?.price || 0;
  const minNext = Number((topBid + 0.05).toFixed(2));
  const maxAllowed = 100000;

  useEffect(() => {
    if (!visible) {
      setAmount("");
      setError(null);
      setShowConfetti(false);
    }
  }, [visible]);

  if (!nft) return null;

  const handleSubmit = () => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Enter a valid amount");
      return;
    }
    if (value < minNext) {
      setError(`Bid must be at least ${minNext} ETH`);
      return;
    }
    if (value > maxAllowed) {
      setError("Bid is too high");
      return;
    }
    setError(null);
    placeBid(nft.id, { amount: value, bidderName: "You" });
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      onClose();
    }, 900);
  };

  const gasFee = estimateGasFee(chain, Number(amount) || 0);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.divider }]}>
            <View style={styles.handle} />
            <Text style={[styles.title, { color: colors.text }]}>Place a bid</Text>
            <Text style={[styles.sub, { color: colors.textMuted }]} numberOfLines={1}>
              {nft.name}
            </Text>

            <View style={[styles.statRow, { backgroundColor: colors.inputBg }]}>
              <View style={styles.stat}>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Top bid</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{topBid} ETH</Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Bids</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{nft.bids.length}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Min next</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{minNext} ETH</Text>
              </View>
            </View>

            <View style={styles.rowBetween}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Network</Text>
              <ChainSelector compact />
            </View>

            <Text style={[styles.label, { color: colors.textMuted }]}>Your bid (ETH)</Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBg,
                  borderColor: error ? colors.danger : colors.divider,
                },
              ]}
              keyboardType="decimal-pad"
              placeholder={`Min ${minNext}`}
              placeholderTextColor={colors.textMuted}
              value={amount}
              onChangeText={(txt) => {
                setAmount(txt);
                if (error) setError(null);
              }}
            />
            {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}

            <View style={styles.gasRow}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Estimated gas</Text>
              <Text style={[styles.gasValue, { color: colors.text }]}>
                {gasFee < 0.0001 ? gasFee.toExponential(2) : gasFee.toFixed(6)} ETH
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.btn, { backgroundColor: colors.inputBg }]}
              >
                <Text style={[styles.btnLabel, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.btn, { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.btnLabel, { color: colors.textInverse }]}>Confirm bid</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
      {showConfetti && <Confetti theme={theme} />}
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
  },
  sub: {
    fontSize: 12,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: "row",
    borderRadius: SIZES.font,
    padding: 12,
    marginBottom: 12,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  gasRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  gasValue: {
    fontSize: 13,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    marginTop: 18,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: SIZES.extraLarge,
    alignItems: "center",
    marginHorizontal: 4,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  confetti: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  confettiText: {
    fontSize: 14,
    fontWeight: "800",
  },
});

export default BidModal;
