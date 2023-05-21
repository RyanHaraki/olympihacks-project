import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import WalletContextProvider from "@/contexts/WalletProviderContext";
import { Toaster } from "@/components/Toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <ClerkProvider>
        <Component {...pageProps} />
        <Toaster />
      </ClerkProvider>
    </WalletContextProvider>
  );
}
