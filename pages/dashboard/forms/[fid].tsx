import Question from "@/components/Question";
import AppLayout from "@/layouts/AppLayout";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { getFormById, updateForm } from "@/utils/db";
import { useRouter } from "next/router";
import { DocumentData } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

const FormCreator = () => {
  const [form, setForm] = useState<DocumentData | null>({});
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded } = useUser();

  useEffect(() => {
    const { fid } = router.query;
    if (fid) {
      getFormById(fid as string)
        .then((res) => {
          setForm(res);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoaded]);

  const saveForm = async () => {
    console.log(form);
    if (form === null || form === undefined) {
      toast({
        title: "Error",
        description: "There was an error saving your form.",
        duration: 3000,
      });
      return;
    }

    await updateForm(form!.form_id, form!);
    toast({
      title: "Form saved!",
      description: "Your form has been saved.",
      duration: 3000,
    });
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
        <h1 className="font-bold text-3xl">Form Creator</h1>
        <p className="mt-2 text-gray-600">
          Create a new form by adding questions and customizing the form
          settings.
        </p>
      </div>
      <div className="flex flex-col mt-4 space-y-4">
        <div className="border border-gray-200 border-solid shadow-sm p-6 rounded-md">
          <h3 className="font-bold text-lg">Form Settings</h3>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Form Name</label>
              <input
                placeholder="My form"
                type="text"
                className="border border-gray-200 border-solid rounded-md p-2"
                value={form?.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Form Description</label>
              <textarea
                placeholder="This form is about..."
                className="border border-gray-200 border-solid rounded-md p-2"
                value={form?.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">
                Whitelist Users{" "}
                <span className="text-sm text-gray-400">
                  (comma separated addresses)
                </span>
              </label>
              <input
                placeholder="74TGnt5ZQvwNdxMbmGRBJUuxtncFzNBbYyXRRpn3VDxA, 74TGnt5ZQvwNdxMbmGRBJUuxtncFzNBbYyXRRpn3VDxA"
                type="text"
                className="border border-gray-200 border-solid rounded-md p-2"
                value={form?.whiteList && form?.whiteList.join(", ")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    whiteList: e.target.value.split(", "),
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="border border-gray-200 border-solid shadow-sm p-6 rounded-md">
          <h3 className="font-bold text-lg">Form Questions</h3>
          <div className="flex flex-col space-y-4 mt-4">
            {form?.questions?.map((question: any) => (
              <Question
                key={question.id}
                data={question}
                questions={form.questions}
                setForm={setForm}
                form={form}
              />
            ))}
            <button
              onClick={() => {
                form!.questions.push({
                  id: uuidv4(),
                  type: "Short Answer",
                  question: "",
                  required: true,
                  allowMultipleSelections: false,
                  choices: [],
                });

                setForm({ ...form });
              }}
              className="bg-blue-600 text-white rounded-md font-medium p-2"
            >
              Add Question
            </button>
            <button
              onClick={() => {
                saveForm();
              }}
              className="bg-black text-white rounded-md font-medium p-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FormCreator;
