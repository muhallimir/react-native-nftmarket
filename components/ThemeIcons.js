import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export const SunIcon = ({ color = "#001F2D", size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="4" fill={color} />
    <Path
      d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const MoonIcon = ({ color = "#001F2D", size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21 13a8 8 0 0 1-10-10 8.5 8.5 0 1 0 10 10z"
      fill={color}
    />
  </Svg>
);
