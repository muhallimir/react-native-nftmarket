import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { RectButton } from "./Button";
import { SubInfo, EThPrice, NFTTitle } from "./SubInfo";
import HeartButton from "./HeartButton";
import RarityBadge from "./RarityBadge";
import VerifiedBadge from "./VerifiedBadge";
import { useTheme } from "../contexts/ThemeContext";

const NFTCard = ({ data }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, shadowColor: colors.textMuted },
      ]}
    >
      <View style={styles.media}>
        <Image
          source={data.image}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.heart}>
          <HeartButton nftId={data.id} size={20} />
        </View>
        <View style={styles.rarityBadge}>
          <RarityBadge nft={data} compact />
        </View>
      </View>
      <SubInfo />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <NFTTitle
            title={data.name}
            subTitle={data.creator}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
            verified={Boolean(data.creatorVerified)}
          />
        </View>
        <View style={styles.row}>
          <EThPrice price={data.price} />
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("Details", { data })}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  media: {
    width: "100%",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  rarityBadge: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  body: {
    width: "100%",
    padding: SIZES.font,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    marginTop: SIZES.font,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default NFTCard;
