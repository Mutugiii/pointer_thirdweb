import { sdk } from "./helpers.js";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const packModule = sdk.getPackModule(process.env.PACK_MODULE_ADDRESS);

  console.log('Opening the pack...');
  const opened = await packModule.open('0');
  console.log('Opened');
  console.log(opened);
}

try {
  await main();
} catch (error) {
  console.error("Error opening the pack", error);
  process.exit(1);
}