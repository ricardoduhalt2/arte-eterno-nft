// Define the Soneium chain configuration
export const Soneium = {
  id: 1868,
  chainId: 1868,  // Adding chainId property which is required
  name: "Soneium",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpc: [process.env.REACT_APP_SONEIUM_RPC_URL || "https://1868.rpc.thirdweb.com/a37f843ccef648163abc82ab025e7cf7"],
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
};