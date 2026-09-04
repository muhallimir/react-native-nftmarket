import { Share } from "react-native";

export const shareNft = async (nft, deepLinkBase = "nftmarket://nft/") => {
  if (!nft || !nft.id) return;
  const url = `${deepLinkBase}${nft.id}`;
  const message = [
    `${nft.name || "Check out this NFT"}`,
    nft.creator ? `by ${nft.creator}` : "",
    typeof nft.price === "number" ? `Current price: ${nft.price} ETH` : "",
    "",
    `View in app: ${url}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await Share.share(
      {
        title: nft.name || "NFT",
        message,
        url,
      },
      {
        dialogTitle: "Share NFT",
        subject: nft.name || "NFT",
      }
    );
    return { ok: true, action: result.action };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const shareProfile = async (profile, appUrl = "nftmarket://profile/") => {
  if (!profile) return { ok: false, error: "no profile" };
  const url = `${appUrl}${profile.address || "guest"}`;
  const message = [
    profile.name || "Anonymous collector",
    profile.bio ? profile.bio : "",
    `Owned: ${profile.ownedCount || 0} NFTs`,
    `Watchlist: ${profile.watchlistCount || 0} NFTs`,
    "",
    `View profile: ${url}`,
  ]
    .filter(Boolean)
    .join("\n");
  try {
    await Share.share(
      { title: profile.name || "Profile", message, url },
      { dialogTitle: "Share profile" }
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};
