import { readFileSync } from "fs";
import { sdk } from "./helpers.js";

async function main() {
  const bundleModuleAddress = '0xB376d86243E6c25396D0074562155a79F6aE05Da';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = '0xaeA97762469201f9F413E3d766C60398d90C3dbb';
  const packModule = sdk.getPackModule(packModuleAddress);

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