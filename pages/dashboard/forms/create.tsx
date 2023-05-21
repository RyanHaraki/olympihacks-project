import AppLayout from "@/layouts/AppLayout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { createNewForm } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const router = useRouter();
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const { user } = useUser();

  const handleCreateNewForm = async () => {
    const formId = uuidv4();

    await createNewForm({
      name: formName,
      description: formDescription,
      owner_id: user!.id,
      form_id: formId,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    router.push(`/dashboard/forms/${formId}`);
  };

  return (
    <AppLayout>
      <div className="mb-16">
        <a
          href="/dashboard"
          className="text-sm text-blue-500 hover:underline cursor-pointer w-fit"
        >
          &larr; Back to Dashboard
        </a>
        <h1 className="font-bold text-3xl">Create New Workflow</h1>
        <p className="mt-2 text-gray-600">
          Create a new form to start gathering feedback
        </p>
      </div>

      <div className="w-full flex flex-col items-center mb-24">
        <div className="border-2 border-gray-300 rounded-lg p-4 max-w-[600px] w-full">
          <div className="mb-4 border-b border-gray-200 border-solid">
            <h2 className="font-medium text-2xl">Setup</h2>
            <p className="text-gray-500 mb-2 text-sm">Configure your form</p>
          </div>
          <div>
            <p>Form Name</p>
            <input
              onChange={(e) => setFormName(e.target.value)}
              type="text"
              className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
            />
          </div>
          <div className="mt-4">
            <p className="mb-2">Form Description</p>
            <textarea
              onChange={(e) => setFormDescription(e.target.value)}
              className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
              rows={5}
            ></textarea>
          </div>
          <button
            onClick={handleCreateNewForm}
            className="mt-4 bg-black text-white rounded-md px-4 py-2"
          >
            Create Form
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
