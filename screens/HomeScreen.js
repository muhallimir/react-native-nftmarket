import React, { useMemo, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { COLORS, NFTData } from "../constants";
import {
  FocusedStatusBar,
  HomeHeader,
  NFTCard,
  SortSelector,
} from "../components";

const SORT_OPTIONS = {
  newest: { label: "Newest", comparator: null },
  asc: {
    label: "Price low to high",
    comparator: (a, b) => a.price - b.price,
  },
  desc: {
    label: "Price high to low",
    comparator: (a, b) => b.price - a.price,
  },
};

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("newest");

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const base = term.length
      ? NFTData.filter((item) =>
          item.name.toLowerCase().includes(term)
        )
      : NFTData;
    const option = SORT_OPTIONS[sortKey] || SORT_OPTIONS.newest;
    if (!option.comparator) {
      return base;
    }
    return [...base].sort(option.comparator);
  }, [searchTerm, sortKey]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            ListHeaderComponent={
              <View>
                <HomeHeader onSearch={setSearchTerm} />
                <SortSelector value={sortKey} onChange={setSortKey} />
              </View>
            }
            data={filteredData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;