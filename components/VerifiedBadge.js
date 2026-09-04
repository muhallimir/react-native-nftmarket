import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const VerifiedBadge = ({ size = 14, color = "#1DA1F2", background = "#FFFFFF" }) => {
  return (
    <View
      accessibilityLabel="Verified creator"
      style={[
        styles.wrap,
        {
          width: size + 6,
          height: size + 6,
          borderRadius: (size + 6) / 2,
          backgroundColor: background,
        },
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="11" fill={color} />
        <Path
          d="M7 12.5l3 3 7-7"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
});

export default VerifiedBadge;
