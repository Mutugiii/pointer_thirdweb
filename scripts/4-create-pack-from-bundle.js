import { readFileSync } from "fs";
import { sdk } from "./helpers.js";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const bundleModule = sdk.getBundleModule(process.env.BUNDLE_MODULE_ADDRESS);

  const packModule = sdk.getPackModule(process.env.PACK_MODULE_ADDRESS);

  console.log('Getting all NFTs from bundle');
  const nftsInBundle = await bundleModule.getAll();

  console.log('NFTs in Bundle');
  console.log(nftsInBundle);

  console.log('Creating a pack containing the NFTs from the bundle...');
  const created = await packModule.create({
    assetContract: bundleModuleAddress,
    metadata: {
      name: 'Fancy Cars Pack!',
      image: readFileSync('./assets/fancy-cars.jpg'),
    },
    assets: nftsInBundle.map(nft => ({
      tokenId: nft.metadata.id,
      amount: nft.supply,
    })),
  });

  console.log('Pack created!');
  console.log(created);
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}