import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import FavoritesBadge from "./FavoritesBadge";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useFilters } from "../contexts/FilterContext";
import { SunIcon, MoonIcon } from "./ThemeIcons";

const HomeHeader = ({ onSearch, onOpenFilters }) => {
  const navigation = useNavigation();
  const { colors, toggle, pref } = useTheme();
  const { filters } = useFilters();

  const activeFilterCount =
    (filters.priceMax < 200 ? 1 : 0) +
    (filters.category !== "All" ? 1 : 0) +
    (filters.status !== "all" ? 1 : 0);

  return (
    <View
      style={{
        backgroundColor: colors.headerBg,
        padding: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 90, height: 25 }}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={toggle}
            accessibilityRole="button"
            accessibilityLabel={`Switch theme, currently ${pref}`}
            style={[styles.iconBtn, { backgroundColor: "rgba(255,255,255,0.18)" }]}
          >
            {pref === "dark" ? (
              <SunIcon color="#FFFFFF" />
            ) : (
              <MoonIcon color="#FFFFFF" />
            )}
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            onPress={() => navigation.navigate("Profile")}
            style={[styles.iconBtn, { backgroundColor: "rgba(255,255,255,0.18)" }]}
          >
            <Image
              source={assets.person01}
              resizeMode="contain"
              style={{ width: 22, height: 22 }}
            />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <FavoritesBadge />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello Victoria 👋
        </Text>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Let’s find masterpiece Art
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: "rgba(255,255,255,0.92)",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search NFTs"
            placeholderTextColor="#74858C"
            style={{ flex: 1, color: "#001F2D" }}
            onChangeText={onSearch}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open filters"
            onPress={onOpenFilters}
            style={styles.filterBtn}
          >
            <Text style={styles.filterIcon}>{activeFilterCount > 0 ? `${activeFilterCount}\u00d7` : "\u2630"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  filterIcon: {
    fontSize: 18,
    color: "#001F2D",
    fontWeight: "700",
  },
});

export default HomeHeader;
