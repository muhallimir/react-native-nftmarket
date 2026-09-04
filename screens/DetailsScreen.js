import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Share,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import {
  CircleButton,
  SubInfo,
  DetailsDesc,
  DetailsBid,
  FocusedStatusBar,
  HeartButton,
  CountdownTimer,
} from "../components";
import RarityBadge from "../components/RarityBadge";
import VerifiedBadge from "../components/VerifiedBadge";
import BidModal from "./BidModal";
import ReportModal from "../components/ReportModal";
import { useTheme } from "../contexts/ThemeContext";
import { useBids } from "../contexts/BidsContext";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";

const DetailsHeader = ({ data, navigation, onReport, onShare }) => {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%", height: 373 }}>
      <Image
        source={data.image}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight - 15}
      />
      <View
        style={{
          position: "absolute",
          right: 15,
          top: StatusBar.currentHeight - 15,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: SIZES.extraLarge,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.light,
            marginRight: 8,
          }}
        >
          <HeartButton nftId={data.id} size={22} />
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Share NFT"
          onPress={onShare}
          style={{
            width: 40,
            height: 40,
            borderRadius: SIZES.extraLarge,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.light,
            marginRight: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: colors.primary }}>{"\u2197"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Report NFT"
          onPress={onReport}
          style={{
            width: 40,
            height: 40,
            borderRadius: SIZES.extraLarge,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.light,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: colors.danger }}>!</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          left: 15,
          bottom: 15,
        }}
      >
        <RarityBadge nft={data} />
      </View>
    </View>
  );
};

const BidButton = ({ onPress, theme }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel="Place a bid"
    onPress={onPress}
    style={{
      backgroundColor: theme.colors.primary,
      padding: SIZES.small,
      borderRadius: SIZES.extraLarge,
      minWidth: 170,
      ...SHADOWS.dark,
    }}
  >
    <Text
      style={{
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
        color: theme.colors.textInverse,
        textAlign: "center",
      }}
    >
      Place a bid
    </Text>
  </TouchableOpacity>
);

const DetailsScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const theme = useTheme();
  const { bidsFor, placeBid } = useBids();
  const { track } = useRecentlyViewed();
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const storedBids = bidsFor(data.id);
  const mergedData = storedBids.length
    ? { ...data, bids: [...storedBids, ...data.bids] }
    : data;

  useEffect(() => {
    track(data.id);
  }, [data.id, track]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${data.name} by ${data.creator} on NFT Marketplace for ${data.price} ETH. nftmarket://nft/${data.id}`,
        title: data.name,
      });
    } catch (err) {
      // ignore - user cancelled or share unavailable
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FocusedStatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        transLucent={true}
      />
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.overlay,
          zIndex: 1,
        }}
      >
        <BidButton theme={theme} onPress={() => setBidModalOpen(true)} />
      </View>
      <FlatList
        data={mergedData.bids}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader
              data={data}
              navigation={navigation}
              onReport={() => setReportOpen(true)}
              onShare={handleShare}
            />
            <SubInfo data={data} />
            <View
              style={{
                paddingHorizontal: SIZES.font,
                marginTop: SIZES.font,
              }}
            >
              <CountdownTimer endsAt={data.endsAt} />
            </View>
            <View
              style={{
                padding: SIZES.font,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: SIZES.extraLarge,
                    fontFamily: FONTS.semiBold,
                    color: theme.colors.text,
                  }}
                >
                  {data.name}
                </Text>
                {data.creatorVerified && <VerifiedBadge size={18} />}
              </View>
              <Text
                style={{
                  fontSize: SIZES.font,
                  fontFamily: FONTS.regular,
                  color: theme.colors.textMuted,
                  marginTop: 2,
                }}
              >
                by {data.creator}
              </Text>
              {Array.isArray(data.traits) && data.traits.length > 0 && (
                <View style={{ marginTop: SIZES.font }}>
                  <Text
                    style={{
                      fontSize: SIZES.small,
                      fontFamily: FONTS.semiBold,
                      color: theme.colors.text,
                      marginBottom: 6,
                    }}
                  >
                    Traits
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {data.traits.map((t, idx) => (
                      <View
                        key={`${t.trait_type}-${idx}`}
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: theme.colors.inputBg,
                          marginRight: 6,
                          marginBottom: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            color: theme.colors.textMuted,
                          }}
                        >
                          {t.trait_type}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "700",
                            color: theme.colors.text,
                          }}
                        >
                          {t.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              <DetailsDesc data={data} />
              {mergedData.bids.length > 0 && (
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: theme.colors.primary,
                  }}
                >
                  Current Bids
                </Text>
              )}
            </View>
          </React.Fragment>
        )}
      />
      <BidModal
        visible={bidModalOpen}
        nft={mergedData}
        onClose={() => setBidModalOpen(false)}
      />
      <ReportModal
        visible={reportOpen}
        nftId={data.id}
        onClose={() => setReportOpen(false)}
      />
    </SafeAreaView>
  );
};

export default DetailsScreen;
