import { defineChain } from "thirdweb/chains";

// Configuración personalizada para Soneium con el RPC real
export const soneiumCustom = defineChain({
  id: 1868,
  name: "Soneium",
  nativeCurrency: {
    name: "Soneium",
    symbol: "SON",
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
});