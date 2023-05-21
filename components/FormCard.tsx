import React from "react";
import { useRouter } from "next/router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { deleteFormById } from "@/utils/db";
import { useToast } from "./ui/use-toast";

type Props = {
  form: any;
  setForms: any;
};

const FormCard = ({ form, setForms }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteForm = async () => {
    await deleteFormById(form.form_id);
    setForms((prev: any) =>
      prev.filter((f: any) => f.form_id !== form.form_id)
    );
  };

  return (
    <div className="border border-gray-200 border-solid shadow-sm p-6 rounded-md w-full hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{form.name}</h3>
          <div className="flex space-x-2">
            <p className="text-gray-600">{form.responses} responses</p>
            <p className="text-gray-600">|</p>
            <p className="text-gray-600">
              {form?.whiteList?.length} whitelisted users
            </p>
            <p className="text-gray-600">|</p>
            <p className="text-gray-600">{form.questions.length} questions</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              router.push(`/dashboard/forms/${form.form_id}`);
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md font-medium p-2 cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `http:/localhost:3000/forms/${form.form_id}`
              );

              toast({
                description: "Copied to clipboard!",
              });
            }}
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-md font-medium p-2 cursor-pointer"
          >
            Share
          </button>

          <button
            onClick={() => {
              toast({
                description: "Form Deleted.",
              });

              handleDeleteForm();
            }}
            className="bg-red-400 hover:bg-red-500 text-white rounded-md font-medium p-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
