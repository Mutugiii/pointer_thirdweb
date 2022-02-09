import { PackModule } from "@3rdweb/sdk";
import { useState } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "./primary-button";
import NFT from "./nft";

type Props = {
  packModule: PackModule,
  afterOpen: () => Promise<void>,
}

export default function OpenButton({ packModule, afterOpen}: Props) {
  const [opening, setOpening] = useState(false);

  const openPack = async () => {
    setOpening(true);
    try {
      console.log('Opening');
      const nftMetadata = await packModule.open('0');
      console.log('Still Opening');
      setOpening(false);
      toast.success(
        <NFT metadata={nftMetadata[0]} />,
        {
          style: {
            minWidth: '300px',
          },
          duration: 5000,
        }
      );
      console.log('Opened');
      await afterOpen();
    } catch (error) {
      console.error(error);
      setOpening(false);
    }
  }

  return (
    <PrimaryButton onClick={openPack} disabled={opening}>
      {opening ? 'Opening...' : 'Open!'}
    </PrimaryButton>
  )
}