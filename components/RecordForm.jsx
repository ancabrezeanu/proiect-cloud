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
    <div className="w-full px-4 mt-20 mb-10">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 space-y-8 border-4 border-purple-500">
        <h2 className="text-4xl font-bold text-center text-purple-700 tracking-wide">
          Adaugă un Obiectiv
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2 text-lg font-semibold text-purple-800">
              Titlu obiectiv
            </label>
            <input
              type="text"
              id="title"
              value={entry.title}
              onChange={(e) => updateEntry("title", e.target.value)}
              className="w-full p-5 text-lg border-2 border-purple-400 rounded-xl bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-300"
              placeholder="Ex: Bea 2 litri de apă"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block mb-2 text-lg font-semibold text-purple-800">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={entry.date}
              onChange={(e) => updateEntry("date", e.target.value)}
              className="w-full p-5 text-lg border-2 border-purple-400 rounded-xl bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-300"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="completed"
              type="checkbox"
              checked={entry.completed}
              onChange={(e) => updateEntry("completed", e.target.checked)}
              className="w-5 h-5 text-purple-600 border-2 border-purple-400 rounded focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="completed" className="text-lg font-semibold text-purple-800">
              Marcat ca finalizat
            </label>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-3 bg-red-500 text-white text-lg rounded-xl hover:bg-red-600 transition duration-300 font-bold shadow-lg"
          >
            Renunță
          </button>
          <button
            type="button"
            onClick={() => onSubmit(entry)}
            className="px-8 py-3 bg-green-500 text-white text-lg rounded-xl hover:bg-green-600 transition duration-300 font-bold shadow-lg"
          >
            {entry._id ? "Actualizează" : "Adaugă"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
