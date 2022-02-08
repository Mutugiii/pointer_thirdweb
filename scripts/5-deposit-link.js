import { ethers } from "ethers.js";
import { sdk } from "./helpers.js";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const packModule = sdk.getPackModule(process.env.PACK_MODULE_ADDRESS);

  console.log('Depositing LINK...');

  // LINK uses 18 decimals, same as Eth, so this gives the amount to use for 2 Link
  const amount = ethers.utils.parseEther('2');

  await packModule.depositLink(amount);
  console.log('Deposited');

  const balance = await packModule.getLinkBalance();
  console.log(`LINK balance ${balance}`);
}

try {
  await main();
} catch (error) {
  console.error("Error depositing LINK to thirdweb");
  process.exit(1);
}