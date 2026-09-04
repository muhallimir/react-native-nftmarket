import React, { useMemo } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import { NFTData } from "../constants";
import { useTheme } from "../contexts/ThemeContext";
import { SIZES } from "../constants";

const TILE = 110;

const RecentlyViewedRow = () => {
  const navigation = useNavigation();
  const { ids, hydrated } = useRecentlyViewed();
  const { colors } = useTheme();

  const items = useMemo(() => {
    if (!ids.length) return [];
    const lookup = new Map(NFTData.map((n) => [n.id, n]));
    return ids.map((id) => lookup.get(id)).filter(Boolean);
  }, [ids]);

  if (!hydrated || items.length === 0) return null;

  return (
    <View style={styles.wrap}>
      <Text style={[styles.heading, { color: colors.text }]}>Recently viewed</Text>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            accessibilityLabel={`Open ${item.name}`}
            accessibilityRole="button"
            onPress={() => navigation.navigate("Details", { data: item })}
            style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.divider }]}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 4,
    paddingBottom: 12,
  },
  heading: {
    fontSize: SIZES.medium,
    fontWeight: "700",
    paddingHorizontal: SIZES.font,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: SIZES.font,
  },
  tile: {
    width: TILE,
    marginRight: 10,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  image: {
    width: TILE,
    height: TILE - 30,
  },
  name: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default RecentlyViewedRow;
