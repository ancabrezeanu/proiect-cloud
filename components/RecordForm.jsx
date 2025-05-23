// /components/RecordForm.jsx

import React, { useState } from "react";
import { useRouter } from "next/router";

const RecordForm = ({ data, onSubmit }) => {
  const router = useRouter();
  const [entry, setEntry] = useState(data);

  const updateEntry = (field, value) => {
    setEntry({ ...entry, [field]: value });
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center p-4">
      <div className="border p-4 rounded-md shadow-sm flex flex-col gap-4 w-full max-w-96 bg-white dark:bg-gray-800">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Titlu obiectiv
          </label>
          <input
            type="text"
            id="title"
            value={entry.title}
            onChange={(e) => updateEntry("title", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Ex: Bea 2 litri de apă"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Data
          </label>
          <input
            type="date"
            id="date"
            value={entry.date}
            onChange={(e) => updateEntry("date", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="completed"
            type="checkbox"
            checked={entry.completed}
            onChange={(e) => updateEntry("completed", e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="completed" className="text-sm font-medium text-gray-900 dark:text-white">
            Marcat ca finalizat
          </label>
        </div>

        <div className="w-full flex justify-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Renunță
          </button>
          <button
            type="button"
            onClick={() => onSubmit(entry)}
            className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {entry._id ? "Actualizează" : "Adaugă"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
