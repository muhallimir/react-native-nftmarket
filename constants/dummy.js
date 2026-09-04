import assets from "./assets";

const baseDate = new Date("2026-09-03T12:00:00Z").getTime();
const day = 24 * 60 * 60 * 1000;
const offsetFromBase = (days, hours = 0) =>
  new Date(baseDate + days * day + hours * 60 * 60 * 1000).toISOString();

const NFTData = [
  {
    id: "NFT-01",
    name: "Abstracto #312",
    creator: "Putri Intan",
    creatorVerified: true,
    category: "Abstract",
    price: 4.25,
    endsAt: offsetFromBase(2, 4),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.",
    image: assets.nft01,
    traits: [
      { trait_type: "Background", value: "Crimson" },
      { trait_type: "Palette", value: "Warm" },
      { trait_type: "Stroke", value: "Bold" },
    ],
    bids: [
      {
        id: "BID-11",
        name: "Jessica Tan",
        price: 4.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-12",
        name: "Jennifer Sia",
        price: 4.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "BID-13",
        name: "Rosie Wong",
        price: 4.75,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "NFT-02",
    name: "Green Coins",
    creator: "Siti Nurhaliza",
    creatorVerified: true,
    category: "Generative",
    price: 7.25,
    endsAt: offsetFromBase(0, 6),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft02,
    traits: [
      { trait_type: "Background", value: "Forest" },
      { trait_type: "Palette", value: "Earth" },
      { trait_type: "Stroke", value: "Fine" },
    ],
    bids: [
      {
        id: "BID-21",
        name: "Jessica Tan",
        price: 7.05,
        image: assets.person04,
        date: "December 12, 2019 at 12:10 PM",
      },
    ],
  },
  {
    id: "NFT-03",
    name: "NFT coins race",
    creator: "Elisabeth aho",
    category: "Animation",
    price: 95.25,
    endsAt: offsetFromBase(5, 12),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft03,
    traits: [
      { trait_type: "Background", value: "Chrome" },
      { trait_type: "Palette", value: "Mono" },
      { trait_type: "Stroke", value: "Geometric" },
    ],
    bids: [
      {
        id: "BID-31",
        name: "Jessica Tan",
        price: 95.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-32",
        name: "Jennifer Sia",
        price: 95.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
    ],
  },
  {
    id: "NFT-04",
    name: "Nifty NFT",
    creator: "Putri Intan",
    creatorVerified: true,
    category: "Pixel",
    price: 54.25,
    endsAt: offsetFromBase(1, 2),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur.",
    image: assets.nft04,
    traits: [
      { trait_type: "Background", value: "Pixel Blue" },
      { trait_type: "Palette", value: "Retro" },
      { trait_type: "Stroke", value: "Blocky" },
    ],
    bids: [
      {
        id: "BID-41",
        name: "Jessica Tan",
        price: 56.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-42",
        name: "Jennifer Sia",
        price: 54.25,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "BID-43",
        name: "Rosie Wong",
        price: 55.15,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "BID-44",
        name: "Vincent Swift",
        price: 54.15,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "NFT-05",
    name: "Colorful circles",
    creator: "David doe",
    category: "Generative",
    price: 10.25,
    endsAt: offsetFromBase(3, 8),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.",
    image: assets.nft05,
    traits: [
      { trait_type: "Background", value: "Rainbow" },
      { trait_type: "Palette", value: "Vivid" },
      { trait_type: "Stroke", value: "Soft" },
    ],
    bids: [
      {
        id: "BID-51",
        name: "Jessica Tan",
        price: 10.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
    ],
  },
  {
    id: "NFT-06",
    name: "Black box model",
    creator: "Leo Messi",
    category: "Sculpture",
    price: 20.25,
    endsAt: offsetFromBase(7),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft06,
    traits: [
      { trait_type: "Background", value: "Charcoal" },
      { trait_type: "Palette", value: "Mono" },
      { trait_type: "Stroke", value: "Geometric" },
    ],
    bids: [
      {
        id: "BID-61",
        name: "Jessica Tan",
        price: 20.25,
        image: assets.person02,
        date: "December 12, 2019 at 12:10 PM",
      },
      {
        id: "BID-62",
        name: "Jennifer Sia",
        price: 20.5,
        image: assets.person03,
        date: "December 27, 2019 at 1:50 PM",
      },
      {
        id: "BID-63",
        name: "Rosie Wong",
        price: 20.75,
        image: assets.person04,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "BID-64",
        name: "Siti Nurhaliza",
        price: 21.25,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
      {
        id: "BID-65",
        name: "Kaitlyn Lee",
        price: 7.25,
        image: assets.person02,
        date: "December 31, 2019 at 3:50 PM",
      },
    ],
  },
  {
    id: "NFT-07",
    name: "Abstracto soulful art",
    creator: "Victor de la Cruz",
    category: "Abstract",
    price: 18.25,
    endsAt: offsetFromBase(14),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Ullamcorper platea penatibus ornare egestas nulla ligula hendrerit nisl suscipit sociosqu maximus, tincidunt aptent habitant purus pharetra ultrices dapibus laoreet nisi lacinia. Porta malesuada netus vel sapien conubia porttitor aliquam ut pretium ante litora molestie senectus magna egestas sociosqu, eget aliquet fames pharetra felis posuere varius fringilla quisque in arcu montes eu ullamcorper.",
    image: assets.nft07,
    traits: [
      { trait_type: "Background", value: "Sunset" },
      { trait_type: "Palette", value: "Warm" },
      { trait_type: "Stroke", value: "Bold" },
    ],
    bids: [],
  },
];

export { NFTData };
