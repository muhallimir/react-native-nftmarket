import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NFTData } from "../constants";
import { useFavorites } from "../contexts/FavoritesContext";
import { useBids } from "../contexts/BidsContext";
import { useWallet } from "../contexts/WalletContext";
import { useProfile } from "../contexts/ProfileContext";
import { useTheme } from "../contexts/ThemeContext";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import EmptyState from "../components/EmptyState";
import RarityBadge from "../components/RarityBadge";
import { SIZES, FONTS } from "../constants";

const TABS = ["Owned", "Watchlist", "Activity"];

const Stat = ({ label, value, theme }) => (
  <View style={[styles.stat, { backgroundColor: theme.colors.inputBg }]}>
    <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>{label}</Text>
  </View>
);

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { profile, updateProfile } = useProfile();
  const { favorites } = useFavorites();
  const { bidsByNft, activity, totalBidsPlaced } = useBids();
  const { wallet } = useWallet();
  const { ids: recentIds } = useRecentlyViewed();
  const [tab, setTab] = useState("Owned");
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(profile.displayName);
  const [draftBio, setDraftBio] = useState(profile.bio);

  const owned = useMemo(() => NFTData.slice(0, 5), []);
  const watchlist = useMemo(() => {
    const lookup = new Map(NFTData.map((n) => [n.id, n]));
    return favorites.map((id) => lookup.get(id)).filter(Boolean);
  }, [favorites]);
  const userBidCount = useMemo(() => {
    let count = 0;
    Object.values(bidsByNft).forEach((list) => {
      count += list.filter((b) => b.name === "You").length;
    });
    return count;
  }, [bidsByNft]);

  const onSaveProfile = () => {
    updateProfile({ displayName: draftName.trim() || "Victoria", bio: draftBio });
    setEditing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.name}`}
      onPress={() => navigation.navigate("Details", { data: item })}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.divider }]}
    >
      <Image source={item.image} style={styles.cardImg} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <RarityBadge nft={item} compact />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.wrap, { backgroundColor: colors.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: colors.inputBg }]}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={[styles.backArrow, { color: colors.text }]}>{"\u2039"}</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={[styles.avatarBlock, { backgroundColor: colors.card, borderColor: colors.divider }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.textInverse }]}>
              {profile.displayName.slice(0, 1).toUpperCase()}
            </Text>
          </View>
          {editing ? (
            <>
              <TextInput
                value={draftName}
                onChangeText={setDraftName}
                style={[
                  styles.editInput,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBg,
                    borderColor: colors.divider,
                  },
                ]}
                placeholder="Display name"
                placeholderTextColor={colors.textMuted}
              />
              <TextInput
                value={draftBio}
                onChangeText={setDraftBio}
                multiline
                style={[
                  styles.editBio,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBg,
                    borderColor: colors.divider,
                  },
                ]}
                placeholder="Bio"
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.editRow}>
                <TouchableOpacity
                  style={[styles.editBtn, { backgroundColor: colors.inputBg }]}
                  onPress={() => {
                    setDraftName(profile.displayName);
                    setDraftBio(profile.bio);
                    setEditing(false);
                  }}
                >
                  <Text style={[styles.editBtnLabel, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editBtn, { backgroundColor: colors.primary }]}
                  onPress={onSaveProfile}
                >
                  <Text style={[styles.editBtnLabel, { color: colors.textInverse }]}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.name, { color: colors.text }]}>{profile.displayName}</Text>
              <Text style={[styles.bio, { color: colors.textMuted }]}>{profile.bio}</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Edit profile"
                style={[styles.editBtn, { backgroundColor: colors.inputBg }]}
                onPress={() => setEditing(true)}
              >
                <Text style={[styles.editBtnLabel, { color: colors.text }]}>Edit profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.statsRow}>
          <Stat theme={theme} label="Owned" value={owned.length} />
          <Stat theme={theme} label="Watchlist" value={favorites.length} />
          <Stat theme={theme} label="Bids placed" value={userBidCount} />
        </View>

        <View
          style={[
            styles.walletCard,
            { backgroundColor: colors.card, borderColor: colors.divider },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.walletLabel, { color: colors.textMuted }]}>Wallet</Text>
            <Text style={[styles.walletValue, { color: colors.text }]}>
              {wallet.connected ? wallet.ens || shortAddress(wallet.address) : "Not connected"}
            </Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open wallet"
            onPress={() => navigation.navigate("Wallet")}
            style={[styles.walletBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.walletBtnLabel, { color: colors.textInverse }]}>
              {wallet.connected ? "Manage" : "Connect"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((t) => (
            <TouchableOpacity
              key={t}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === t }}
              onPress={() => setTab(t)}
              style={[
                styles.tab,
                {
                  borderBottomColor: tab === t ? colors.primary : "transparent",
                  color: tab === t ? colors.text : colors.textMuted,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: tab === t ? colors.text : colors.textMuted,
                    fontFamily: tab === t ? FONTS.bold : FONTS.medium,
                  },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === "Owned" && (
          <FlatList
            data={owned}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
          />
        )}
        {tab === "Watchlist" && (
          <>
            {watchlist.length === 0 ? (
              <EmptyState
                kind="favorites"
                title="No favorites yet"
                message="Tap the heart on any NFT to add it to your watchlist."
              />
            ) : (
              <FlatList
                data={watchlist}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                scrollEnabled={false}
                contentContainerStyle={styles.grid}
              />
            )}
          </>
        )}
        {tab === "Activity" && (
          <View>
            {activity.length === 0 ? (
              <EmptyState
                kind="bids"
                title="No activity yet"
                message="Place a bid on any NFT to see it appear here."
              />
            ) : (
              activity.map((a) => (
                <View
                  key={a.id}
                  style={[
                    styles.activityRow,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.divider,
                    },
                  ]}
                >
                  <Text style={[styles.activityType, { color: colors.primaryAccent }]}>
                    {a.type === "bid" ? "Bid placed" : a.type}
                  </Text>
                  <Text style={[styles.activityTitle, { color: colors.text }]}>
                    {a.nftId} - {a.amount} ETH
                  </Text>
                  <Text style={[styles.activityDate, { color: colors.textMuted }]}>{a.at}</Text>
                </View>
              ))
            )}
          </View>
        )}

        {recentIds.length > 0 && (
          <Text style={[styles.recentHint, { color: colors.textMuted }]}>
            {recentIds.length} NFT{recentIds.length === 1 ? "" : "s"} viewed recently
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const shortAddress = (addr) => {
  if (!addr) return "";
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}\u2026${addr.slice(-4)}`;
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 24,
    fontWeight: "700",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  avatarBlock: {
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "800",
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  bio: {
    marginTop: 4,
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 12,
    lineHeight: 18,
  },
  editInput: {
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginTop: 10,
    borderWidth: 1,
  },
  editBio: {
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    marginTop: 8,
    minHeight: 60,
    borderWidth: 1,
    textAlignVertical: "top",
  },
  editRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  editBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.extraLarge,
    alignItems: "center",
    marginHorizontal: 4,
  },
  editBtnLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 12,
    marginHorizontal: -4,
  },
  stat: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 2,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  walletCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 12,
  },
  walletLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  walletValue: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
  },
  walletBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  walletBtnLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  tabsRow: {
    flexDirection: "row",
    marginTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F5",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontSize: 13,
  },
  grid: {
    paddingTop: 12,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 12,
  },
  cardImg: {
    width: "100%",
    height: 130,
  },
  cardBody: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  cardName: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
  },
  activityRow: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  activityType: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontWeight: "700",
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  activityDate: {
    fontSize: 11,
    marginTop: 2,
  },
  recentHint: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
  },
});

export default ProfileScreen;
