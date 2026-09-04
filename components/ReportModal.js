import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useReports } from "../contexts/ReportsContext";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const REASONS = [
  { id: "spam", label: "Spam or misleading" },
  { id: "copyright", label: "Copyright violation" },
  { id: "other", label: "Other" },
];

const Toast = ({ visible, message, theme }) => {
  if (!visible) return null;
  return (
    <View
      style={[
        styles.toast,
        { backgroundColor: theme.colors.primary },
      ]}
      accessibilityLiveRegion="polite"
    >
      <Text style={[styles.toastText, { color: theme.colors.textInverse }]}>{message}</Text>
    </View>
  );
};

const ReportModal = ({ visible, nftId, onClose }) => {
  const { submit } = useReports();
  const theme = useTheme();
  const { colors } = theme;
  const [reason, setReason] = useState("spam");
  const [note, setNote] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = () => {
    submit(nftId, reason, note);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setReason("spam");
      setNote("");
      onClose();
    }, 900);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.divider }]}>
            <Text style={[styles.title, { color: colors.text }]}>Report this NFT</Text>
            <Text style={[styles.sub, { color: colors.textMuted }]}>
              Tell us what's wrong so the moderation team can review it.
            </Text>

            {REASONS.map((r) => (
              <TouchableOpacity
                key={r.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: reason === r.id }}
                style={[
                  styles.option,
                  {
                    borderColor: reason === r.id ? colors.primary : colors.divider,
                    backgroundColor: reason === r.id ? colors.inputBg : "transparent",
                  },
                ]}
                onPress={() => setReason(r.id)}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      borderColor: colors.primary,
                      backgroundColor: reason === r.id ? colors.primary : "transparent",
                    },
                  ]}
                />
                <Text style={[styles.optionLabel, { color: colors.text }]}>{r.label}</Text>
              </TouchableOpacity>
            ))}

            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBg,
                  borderColor: colors.divider,
                },
              ]}
              placeholder="Add a note (optional)"
              placeholderTextColor={colors.textMuted}
              multiline
              value={note}
              onChangeText={setNote}
            />

            <View style={styles.row}>
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
                <Text style={[styles.btnLabel, { color: colors.textInverse }]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
      <Toast visible={toastVisible} message="Report submitted, thanks" theme={theme} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  sheet: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  sub: {
    fontSize: 12,
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    minHeight: 60,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
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
  toast: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toastText: {
    fontSize: 13,
    fontWeight: "700",
  },
});

export default ReportModal;
