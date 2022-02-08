import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

if(!process.env.WALLET_PRIVATE_KEY) {
  console.error("Wallet Private Key Missing");
  process.exit(1);
}

export const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY,
    // Polygon Mumbai Network
    ethers.getDefaultProvider("https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/")
  ),
);

// Thirdweb app contract address
const appAddress = '0x89Af5735E595b1E7D385420aC153925fed1e5094';

export async function getApp() {
  const app = await sdk.getAppModule(appAddress);
  return app;
}
