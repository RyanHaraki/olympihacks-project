import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DocumentData } from "firebase/firestore";
import { getFormById } from "@/utils/db";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@solana/wallet-adapter-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createNewResponse, getResponseFromPublicKey } from "@/utils/db";
import WalletButton from "@/components/WalletButton";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
const Form = () => {
  const router = useRouter();
  const [form, setForm] = useState<DocumentData | null>({});
  const { wallet, publicKey } = useWallet();
  const [answers, setAnswers] = useState<any>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const { user, isLoaded } = useUser();

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prevAnswers: any) => {
      const updatedAnswers = [...prevAnswers];
      const answerIndex = updatedAnswers.findIndex(
        (item: any) => item.questionId === questionId
      );
      if (answerIndex !== -1) {
        updatedAnswers[answerIndex].answer = answer;
      } else {
        updatedAnswers.push({ questionId, answer });
      }
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    const payload = {
      answers: answers,
      ownerId: user?.id,
      formId: form?.form_id,
      publicKey: publicKey?.toBase58(),
    };

    getResponseFromPublicKey(publicKey?.toBase58() as string).then((res) => {
      if (res) {
        toast({
          title: "You've already submitted a response!",
          description: "You can only submit one response per form.",
        });
        return;
      } else {
        createNewResponse(payload);
        setSubmitted(true);
      }
    });
  };

  const { fid } = router.query;

  useEffect(() => {
    getFormById(fid as string)
      .then((res) => {
        setForm(res);
      })
      .catch((err) => console.error(err));
  }, [fid]);

  return (
    <div className="bg-gray-100 w-full flex justify-center">
      {!submitted ? (
        <div className="bg-white flex flex-col items-start p-8 lg:p-16 pt-12 rounded-lg w-full lg:w-[520px] min-h-screen">
          <div className="">
            <h1 className="font-bold text-3xl mb-8">{form?.name}</h1>
            <p className="text-gray-600 mb-6">{form?.description}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">
              Connect your wallet to qualify for rewards
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              This can be in the form of airdrops, NFTs, or tokens
            </p>
            <WalletButton />
          </div>
          <Separator className="mt-4" />
          <div className="">
            {form?.questions?.map((question: any) => (
              <div className="flex flex-col mt-4 space-y-4">
                {question.type == "short-answer" && (
                  <div className="flex flex-col">
                    <label className="font-medium text-sm mb-1">
                      {question.question}
                    </label>
                    <input
                      onChange={(e) => {
                        handleAnswerChange(question.id, e.target.value);
                      }}
                      type="text"
                      className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
                    />
                  </div>
                )}
                {question.type == "long-answer" && (
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-600">
                      {question.question}
                    </label>
                    <textarea
                      onChange={(e) => {
                        handleAnswerChange(question.id, e.target.value);
                      }}
                      className="border border-gray-300 rounded-md p-2"
                      rows={4}
                    />
                  </div>
                )}
                {question.type == "multiple-choice" && (
                  <div className="flex flex-col">
                    <label
                      className={`font-medium text-sm ${
                        !question.allowMultipleSelections && "mb-2"
                      }`}
                    >
                      {question.question}
                    </label>
                    {question.allowMultipleSelections && (
                      <span className="text-sm text-gray-500 mb-2">
                        Select multiple
                      </span>
                    )}
                    <div className="flex flex-col space-y-2">
                      <RadioGroup>
                        {question.choices.map((option: any) => (
                          <div
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            {question.allowMultipleSelections ? (
                              <>
                                <input
                                  onChange={(e) => {
                                    handleAnswerChange(
                                      question.id,
                                      e.target.value
                                    );
                                  }}
                                  type="checkbox"
                                  className="border border-gray-300 rounded-md p-2"
                                />
                                <label className="text-sm text-gray-600">
                                  {option}
                                </label>
                              </>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={option.id} />
                                <Label htmlFor={option.id}>{option}</Label>
                              </div>
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-black text-white rounded-md px-4 py-2"
          >
            Submit Response
          </button>
        </div>
      ) : (
        <div className="bg-white flex flex-col items-start p-16 pt-12 rounded-lg lg:w-[520px] min-h-screen">
          <div className="">
            <h1 className="font-bold text-3xl mb-8">{form?.name}</h1>
            <p className="text-gray-600 mb-6">{form?.description}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">
              Thank you for submitting your response!
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              You will be notified if you qualify for rewards
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
