import { defineChain } from "@thirdweb-dev/chains";

export const Soneium = defineChain({
  id: 1868,
  name: "Soneium",
  nativeCurrency: {
    name: "Soneium",
    symbol: "SON",
    decimals: 18,
  },
  rpc: [process.env.REACT_APP_SONEIUM_RPC_URL || "https://1868.rpc.thirdweb.com"],
  shortName: "soneium",
  slug: "soneium",
  testnet: false,
  chain: "Soneium",
  explorers: [
    {
      name: "Soneium Explorer",
      url: "https://explorer.soneium.com",
    },
  ],
});
