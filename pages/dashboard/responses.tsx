import { getResponsesFromUserId } from "@/utils/db";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DocumentData } from "firebase/firestore";
import AppLayout from "@/layouts/AppLayout";

const Responses = () => {
  const { user, isLoaded } = useUser();

  const [responses, setResponses] = useState<DocumentData[] | null>([]);

  useEffect(() => {
    if (!user || !isLoaded) return;

    const responses = getResponsesFromUserId(user?.id).then((res) => {
      setResponses(res);
    });
  }, [isLoaded]);

  return (
    <AppLayout>
      <div className="mb-16">
        <h1 className="font-bold text-3xl">Responses</h1>
        <p className="text-gray-600">
          Welcome to your dashboard! You can view your responses from here
        </p>
        <div>
          {responses?.map((response) => (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
              {response.answers.map((answer: any) => (
                <div className="px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {answer.question}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {answer.answer}
                  </dd>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Responses;
