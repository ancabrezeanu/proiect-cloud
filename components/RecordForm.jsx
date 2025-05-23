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
    <div className="w-full flex justify-center px-4 mt-20 mb-10">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          Adaugă un Obiectiv
        </h2>

        <div className="space-y-6 flex flex-col items-center">
          <div className="w-3/5">
            <label htmlFor="title" className="block mb-2 text-lg font-bold text-purple-800">
              Titlu obiectiv
            </label>
            <input
              type="text"
              id="title"
              value={entry.title}
              onChange={(e) => updateEntry("title", e.target.value)}
              className="w-full py-4 px-4 text-lg font-bold border-2 border-purple-500 rounded-md bg-white focus:outline-none focus:ring-4 focus:ring-purple-400"
              placeholder="Ex: Bea 2 litri de apă"
              required
            />
          </div>

          <div className="w-3/5">
            <label htmlFor="date" className="block mb-2 text-lg font-bold text-purple-800">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={entry.date}
              onChange={(e) => updateEntry("date", e.target.value)}
              className="w-full py-4 px-4 text-lg font-bold border-2 border-purple-500 rounded-md bg-white focus:outline-none focus:ring-4 focus:ring-purple-400"
              required
            />
          </div>

          <div className="flex items-center gap-3 w-3/5">
            <input
              id="completed"
              type="checkbox"
              checked={entry.completed}
              onChange={(e) => updateEntry("completed", e.target.checked)}
              className="w-6 h-6 text-purple-600 border-2 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="text-lg font-bold text-purple-800">
              Marcat ca finalizat
            </label>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-red-500 text-white text-lg font-bold rounded-md hover:bg-red-600 transition"
          >
            Renunță
          </button>
          <button
            type="button"
            onClick={() => onSubmit(entry)}
            className="px-6 py-3 bg-green-500 text-white text-lg font-bold rounded-md hover:bg-green-600 transition"
          >
            {entry._id ? "Actualizează" : "Adaugă"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
