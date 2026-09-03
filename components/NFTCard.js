import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { RectButton } from "./Button";
import { SubInfo, EThPrice, NFTTitle } from "./SubInfo";
import HeartButton from "./HeartButton";

const NFTCard = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.media}>
        <Image
          source={data.image}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.heart}>
          <HeartButton nftId={data.id} size={20} />
        </View>
      </View>
      <SubInfo />
      <View style={styles.body}>
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
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
    backgroundColor: COLORS.white,
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
  body: {
    width: "100%",
    padding: SIZES.font,
  },
  row: {
    marginTop: SIZES.font,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default NFTCard;