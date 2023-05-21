import React, { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import { getFormsForUserId } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { DocumentData } from "firebase/firestore";
import FormCard from "@/components/FormCard";

const Dashboard = () => {
  const [forms, setForms] = useState<DocumentData[]>([]);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    fetchForms();
  }, [user]);

  const fetchForms = async () => {
    const f = await getFormsForUserId(user!.id).then((res) => setForms(res));
  };

  return (
    <AppLayout>
      <div className="mb-16">
        <h1 className="font-bold text-3xl">Forms</h1>
        <p className="text-gray-600">
          Welcome to your dashboard! You can manage all of your forms from here.
        </p>
        <div></div>
      </div>

      <h2 className="font-bold text-xl mb-4">Browse Projects </h2>
      <button
        onClick={() => router.push("/dashboard/forms/create")}
        className="bg-black text-white rounded-md font-medium p-2"
      >
        Create New Form <span className="ml-1">&#43;</span>
      </button>

      <div className="flex flex-col lg:w-3/4 mt-4 space-y-4">
        {forms?.map((form) => (
          <FormCard setForms={setForms} form={form} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
