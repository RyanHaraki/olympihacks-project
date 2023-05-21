import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteQuestionById } from "@/utils/db";

type Props = {
  data: any;
  questions: any;
  setForm: any;
  form: any;
};

const Question = ({ data, questions, setForm, form }: Props) => {
  const [question, setQuestion] = useState(data);

  useEffect(() => {
    const newQuestions = questions.map((q: any) => {
      if (q.id === question.id) {
        return question;
      }
      return q;
    });
    setForm({ ...form, questions: newQuestions });
  }, [question]);

  return (
    <div
      key={question.id}
      className="border border-gray-200 border-solid rounded-md p-4"
    >
      <div className="flex justify-between items-start">
        <div className="mb-4 w-full pr-4">
          <div className="flex items-center w-full">
            <h2 className="mr-2 font-bold">Question</h2>
            <input
              type="text"
              placeholder="What is your name?"
              value={question.question}
              onChange={(e) =>
                setQuestion({ ...question, question: e.target.value })
              }
              className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
            />
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              const newQuestions = questions.filter(
                (q: any) => q.id !== question.id
              );
              setForm({ ...form, questions: newQuestions });
              deleteQuestionById(question.id);
            }}
            className="bg-red-500 text-white rounded-md font-medium p-2"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <h2 className="mr-2 font-bold">Type</h2>

        <Select
          onValueChange={(e) => {
            setQuestion({
              ...question,
              type: e,
            });
          }}
        >
          <SelectTrigger defaultValue="short-answer" className="w-[180px]">
            <SelectValue
              placeholder={question.type
                .split("-")
                .map((word: string) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short-answer">Short Answer</SelectItem>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center mb-4">
        <h2 className="mr-2 font-bold">Required</h2>
        <input
          type="checkbox"
          checked={question.required}
          onChange={(e) =>
            setQuestion({
              ...question,
              required: e.target.checked,
            })
          }
        />
      </div>

      {question.type === "multiple-choice" && (
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600">
            Choices{" "}
            <span className="text-sm text-gray-400">(comma separated)</span>
          </label>
          <input
            placeholder="Option 1, option 2, option 3"
            type="text"
            className="border border-gray-200 border-solid rounded-md p-2"
            value={question.choices.join(", ")}
            onChange={(e) =>
              setQuestion({
                ...question,
                choices: e.target.value.split(", "),
              })
            }
          />

          <div className="flex items-center">
            <h2 className="mr-2 font-bold">Allow Multiple Selections</h2>
            <input
              type="checkbox"
              checked={question.allowMultipleSelections}
              onChange={(e) =>
                setQuestion({
                  ...question,
                  allowMultipleSelections: e.target.checked,
                })
              }
            />
          </div>
        </div>
      )}

      {question.type == "short-answer" && (
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Short Answer"
            className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
            disabled
          />
        </div>
      )}

      {question.type == "paragraph" && (
        <div className="flex items-center">
          <textarea
            placeholder="Paragraph"
            className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
            disabled
          />
        </div>
      )}
    </div>
  );
};

export default Question;
