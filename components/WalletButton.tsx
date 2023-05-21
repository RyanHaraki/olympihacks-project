import React from "react";
import dynamic from "next/dynamic";

const WalletButton = () => {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return <WalletMultiButtonDynamic />;
};

export default WalletButton;
