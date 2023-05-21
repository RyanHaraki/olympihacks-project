import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { getResponsesFromUserId, getFormsForUserId } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Rewards = () => {
  const [amountToSend, setAmountToSend] = useState(0);
  const { publicKey, sendTransaction } = useWallet();
  const [recipients, setRecipients] = useState<any[]>([]);
  const [whitelisted, setWhitelisted] = useState<any[]>([]);
  const [choice, setChoice] = useState<any>("all");
  const { connection } = useConnection();
  const { user, isLoaded } = useUser();

  // get all wallets from responses
  useEffect(() => {
    if (!user || !isLoaded) return;

    const responses = getResponsesFromUserId(user!.id).then((res) => {
      setRecipients(res.map((r) => r.publicKey));
    });

    const forms = getFormsForUserId(user!.id).then((res) => {
      setWhitelisted(res.map((r) => r.whitelist));
    });
  }, [isLoaded]);

  const sendSol = async (event: any) => {
    event.preventDefault();
    if (!publicKey) return;

    if (choice === "all") {
      recipients.forEach((recipient) => {
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports: web3.LAMPORTS_PER_SOL * amountToSend,
          })
        );
        sendTransaction(transaction, connection).then((signature) => {});
      });
      whitelisted.forEach((recipient) => {
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports: web3.LAMPORTS_PER_SOL * amountToSend,
          })
        );
        sendTransaction(transaction, connection).then((signature) => {});
      });
    } else if (choice === "whitelist") {
      whitelisted.forEach((recipient) => {
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports: web3.LAMPORTS_PER_SOL * amountToSend,
          })
        );
        sendTransaction(transaction, connection).then((signature) => {});
      });
    } else if (choice === "responses") {
      recipients.forEach((recipient) => {
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipient,
            lamports: web3.LAMPORTS_PER_SOL * amountToSend,
          })
        );
        sendTransaction(transaction, connection).then((signature) => {});
      });
    }
  };

  return (
    <AppLayout>
      <div className="mb-16">
        <h1 className="font-bold text-3xl">Rewards</h1>
        <p className="text-gray-600">
          Welcome to your dashboard! You can send rewards from here
        </p>
        <div></div>
      </div>
      <h2 className="font-bold text-xl mb-4">Reward with Solana</h2>
      <form onSubmit={sendSol}>
        <div className="flex flex-col mb-4">
          <label
            className="mb-2 font-bold text-lg text-gray-900"
            htmlFor="amount"
          >
            Amount per person
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type="number"
            placeholder="0.0"
            value={amountToSend}
            onChange={(e) => setAmountToSend(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label
            className="mb-2 font-bold text-lg text-gray-900"
            htmlFor="recipient"
          >
            Recipients
          </label>

          <Select onValueChange={(e) => setChoice(e)}>
            <SelectTrigger defaultValue="short-answer" className="w-[180px]">
              <SelectValue placeholder="Select recipients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                Both whitelisted and responses
              </SelectItem>
              <SelectItem value="whitelisted">Only whitelisted</SelectItem>
              <SelectItem value="responses">Only responses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          className="block bg-green-500 hover:bg-green-600 text-white uppercase text-lg p-4 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </AppLayout>
  );
};

export default Rewards;
