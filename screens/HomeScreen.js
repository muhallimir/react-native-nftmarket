import React, { useMemo, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { NFTData } from "../constants";
import {
  FocusedStatusBar,
  HomeHeader,
  NFTCard,
  SortSelector,
  TrendingCarousel,
} from "../components";
import RecentlyViewedRow from "../components/RecentlyViewedRow";
import SearchFilters from "../components/SearchFilters";
import EmptyState from "../components/EmptyState";
import { useFilters } from "../contexts/FilterContext";
import { useTheme } from "../contexts/ThemeContext";

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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { sortKey, setSortKey, filters } = useFilters();
  const { colors } = useTheme();

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const now = Date.now();
    let base = NFTData;
    if (term.length) {
      base = base.filter((item) =>
        item.name.toLowerCase().includes(term) ||
        item.creator.toLowerCase().includes(term)
      );
    }
    if (filters.category && filters.category !== "All") {
      base = base.filter((item) => item.category === filters.category);
    }
    base = base.filter((item) => {
      const price = item.price;
      const ok = price >= (filters.priceMin || 0) && price <= (filters.priceMax || 200);
      if (!ok) return false;
      if (filters.status === "active") {
        return new Date(item.endsAt).getTime() > now;
      }
      if (filters.status === "ended") {
        return new Date(item.endsAt).getTime() <= now;
      }
      return true;
    });
    const option = SORT_OPTIONS[sortKey] || SORT_OPTIONS.newest;
    if (!option.comparator) {
      return base;
    }
    return [...base].sort(option.comparator);
  }, [searchTerm, sortKey, filters]);

  const empty = filteredData.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FocusedStatusBar background={colors.headerBg} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            ListHeaderComponent={
              <View>
                <HomeHeader
                  onSearch={setSearchTerm}
                  onOpenFilters={() => setFiltersOpen(true)}
                />
                <SortSelector value={sortKey} onChange={setSortKey} />
                <TrendingCarousel />
                <RecentlyViewedRow />
              </View>
            }
            data={filteredData}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              empty ? (
                <EmptyState
                  kind="results"
                  title="No NFTs match"
                  message="Try a different search term or clear filters to see more results."
                />
              ) : null
            }
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
          <View style={{ height: 300, backgroundColor: colors.headerBg }} />
          <View style={{ flex: 1, backgroundColor: colors.background }} />
        </View>
      </View>
      <SearchFilters visible={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
