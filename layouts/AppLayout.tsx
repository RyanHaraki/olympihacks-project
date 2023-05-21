import React from "react";
import { SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Header from "@/components/Header";

interface Props {
  children?:
    | string
    | JSX.Element
    | JSX.Element[]
    | React.ReactNode
    | React.ReactNode[];
}

const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <Header />
      <div className="p-6">{children}</div>
    </div>
  );
};

export default AppLayout;
