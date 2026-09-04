import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NFTData } from "../constants";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const TILE_WIDTH = 160;
const TILE_HEIGHT = 200;

const TrendingCarousel = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const listRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const trending = useMemo(() => {
    return [...NFTData]
      .sort((a, b) => (b.bids?.length || 0) - (a.bids?.length || 0))
      .slice(0, 5);
  }, []);

  useEffect(() => {
    if (paused || trending.length <= 1) return undefined;
    const id = setInterval(() => {
      setIndex((cur) => {
        const next = (cur + 1) % trending.length;
        if (listRef.current) {
          try {
            listRef.current.scrollToIndex({ index: next, animated: true });
          } catch (e) {
            // noop: scrollToIndex can fail if not yet mounted
          }
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [paused, trending.length]);

  return (
    <View style={styles.wrap}>
      <View style={styles.headingRow}>
        <Text style={[styles.heading, { color: colors.text }]}>Trending now</Text>
        <View style={[styles.tag, { backgroundColor: colors.inputBg }]}>
          <Text style={[styles.tagText, { color: colors.textMuted }]}>Top 5 by bids</Text>
        </View>
      </View>
      <FlatList
        ref={listRef}
        horizontal
        data={trending}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onTouchStart={() => setPaused(true)}
        onMomentumScrollEnd={() => setPaused(false)}
        onScrollToIndexFailed={() => {
          // ignore
        }}
        getItemLayout={(_, i) => ({ length: TILE_WIDTH + 12, offset: (TILE_WIDTH + 12) * i, index: i })}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.name}`}
            onPress={() => navigation.navigate("Details", { data: item })}
            style={[
              styles.tile,
              { backgroundColor: colors.card, borderColor: colors.divider },
            ]}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.body}>
              <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.bids, { color: colors.textMuted }]}>
                {item.bids.length} bids
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.dots}>
        {trending.map((t, i) => (
          <View
            key={t.id}
            style={[
              styles.dot,
              {
                backgroundColor: i === index ? colors.primaryAccent : colors.divider,
                width: i === index ? 16 : 6,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.font,
    marginBottom: 8,
  },
  heading: {
    fontSize: SIZES.medium,
    fontWeight: "700",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: SIZES.font,
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    marginRight: 12,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: TILE_HEIGHT - 56,
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
  },
  bids: {
    fontSize: 11,
    marginTop: 2,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});

export default TrendingCarousel;
