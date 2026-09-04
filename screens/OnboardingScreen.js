import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { useOnboarding } from "../contexts/OnboardingContext";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BrowseIllustration = ({ color }) => (
  <Svg width={220} height={160} viewBox="0 0 220 160">
    <Rect x="20" y="20" width="80" height="100" rx="10" fill={color} opacity="0.85" />
    <Rect x="60" y="40" width="80" height="100" rx="10" fill={color} opacity="0.65" />
    <Rect x="100" y="60" width="80" height="100" rx="10" fill={color} opacity="0.45" />
  </Svg>
);

const BidIllustration = ({ color }) => (
  <Svg width={220} height={160} viewBox="0 0 220 160">
    <G>
      <Rect x="80" y="30" width="60" height="100" rx="8" fill={color} />
      <Path d="M140 80 L170 80 L160 65 Z" fill={color} />
      <Circle cx="110" cy="50" r="6" fill="#FFFFFF" />
    </G>
  </Svg>
);

const CollectIllustration = ({ color }) => (
  <Svg width={220} height={160} viewBox="0 0 220 160">
    <G>
      <Path
        d="M110 130 C 60 100 50 70 70 50 C 90 35 110 50 110 60 C 110 50 130 35 150 50 C 170 70 160 100 110 130 Z"
        fill={color}
      />
      <Circle cx="60" cy="40" r="6" fill={color} opacity="0.6" />
      <Circle cx="170" cy="120" r="8" fill={color} opacity="0.6" />
    </G>
  </Svg>
);

const SLIDES = [
  {
    id: "browse",
    title: "Browse unique art",
    body: "Discover thousands of NFTs curated by category, price, and trending momentum.",
    Illustration: BrowseIllustration,
  },
  {
    id: "bid",
    title: "Bid with confidence",
    body: "Track auctions, place bids on the go, and never miss a closing window.",
    Illustration: BidIllustration,
  },
  {
    id: "collect",
    title: "Collect and own",
    body: "Build a watchlist, follow verified creators, and grow your digital collection.",
    Illustration: CollectIllustration,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { complete } = useOnboarding();
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems[0]) {
      setIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = async () => {
    if (index < SLIDES.length - 1) {
      const next = index + 1;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    } else {
      await complete();
      if (navigation && navigation.replace) {
        navigation.replace("Home");
      }
    }
  };

  return (
    <View style={[styles.wrap, { backgroundColor: colors.background }]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({ item }) => {
          const Illustration = item.Illustration;
          return (
            <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
              <Illustration color={colors.primaryAccent} />
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.body, { color: colors.textMuted }]}>{item.body}</Text>
            </View>
          );
        }}
      />

      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View
            key={s.id}
            style={[
              styles.dot,
              {
                backgroundColor: i === index ? colors.primary : colors.divider,
                width: i === index ? 22 : 8,
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={index === SLIDES.length - 1 ? "Get started" : "Next"}
        onPress={handleNext}
        style={[styles.cta, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.ctaLabel, { color: colors.textInverse }]}>
          {index === SLIDES.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Skip onboarding"
        onPress={() => {
          complete();
          if (navigation && navigation.replace) navigation.replace("Home");
        }}
        style={styles.skip}
      >
        <Text style={[styles.skipLabel, { color: colors.textMuted }]}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 60,
  },
  slide: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 24,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  cta: {
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 14,
    borderRadius: SIZES.extraLarge,
    alignItems: "center",
  },
  ctaLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  skip: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export default OnboardingScreen;
