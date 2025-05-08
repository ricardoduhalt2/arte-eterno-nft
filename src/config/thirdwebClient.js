import { createThirdwebClient, defineChain } from "thirdweb";

// Initialize the Thirdweb client with Client ID from environment variables
// Ensure REACT_APP_THIRDWEB_CLIENT_ID is set in your .env file
export const client = createThirdwebClient({ clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID });

// Define the Soneium Mainnet chain
export const soneium = defineChain(1868);
