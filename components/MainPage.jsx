import { useState, useEffect } from "react";
import ChatComponent from "@/components/ChatComponent";
import { deleteRecord, getRecords } from "@/utils/recordsFunctions";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

const MainPage = () => {
  const router = useRouter();
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await getRecords();
      setGoals(res || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    const goalToSend = title === "custom" ? customTitle : title;
    if (!goalToSend.trim()) return;
    try {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: goalToSend,
          date: new Date().toISOString().split("T")[0],
          completed: false,
        }),
      });
      const data = await res.json();
      setGoals([...goals, data.data]);
      setTitle("");
      setCustomTitle("");
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch("/api/records", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, completed: !completed }),
      });
      const data = await res.json();
      setGoals(goals.map((goal) => (goal._id === id ? data.data : goal)));
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await fetch(`/api/records?id=${id}`, { method: "DELETE" });
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleUpdateRecord = (id) => {
    router.push(`/records/edit?id=${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 relative overflow-hidden">
      <h1 className="text-yellow-200 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 px-16 py-6 rounded-2xl shadow-2xl tracking-wider animate-pulse z-10 border-4 border-yellow-300 text-4xl font-bold mb-12 leading-relaxed">
         Obiectivele Tale 
      </h1>

      <div className="w-full max-w-5xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl shadow-2xl z-10 border-2 border-blue-300 mt-8">
        <div className="mb-12 flex flex-col sm:flex-row gap-8 w-full items-center justify-center px-6">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full sm:w-[50%] h-14 text-lg px-5 py-3 rounded-xl border-2 border-purple-500 shadow-lg bg-white focus:outline-purple-600 tracking-wide leading-relaxed"
          >
            <option value="">— Alege un obiectiv —</option>
            <option value="Bea 2 litri de apă">Bea 2 litri de apă</option>
            <option value="Fă 10.000 pași">Fă 10.000 pași</option>
            <option value="Învață pentru facultate">Învață pentru facultate</option>
            <option value="Citește 10 pagini">Citește 10 pagini</option>
            <option value="Fă sport">Fă sport</option>
            <option value="Scrie în jurnal">Scrie în jurnal</option>
            <option value="custom">Altul...</option>
          </select>

          {title === "custom" && (
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Scrie obiectivul tău"
              className="w-full sm:w-[50%] h-14 text-lg px-5 py-3 rounded-xl border-2 border-pink-400 shadow-inner bg-white tracking-wide leading-relaxed"
            />
          )}

          <button
            onClick={addGoal}
            className="w-full sm:w-auto h-14 px-10 py-4 bg-green-500 text-white text-lg font-semibold rounded-xl hover:bg-green-600 transition duration-300 shadow-xl border-2 border-green-700"
          >
            Adaugă
          </button>
        </div>

        {goals.length === 0 ? (
          <p className="text-center text-xl text-purple-700 font-semibold leading-relaxed">
            Nu ai obiective încă. Adaugă unul mai sus! 
          </p>
        ) : (
          <div className="overflow-x-auto mt-16">
            <table className="w-full table-auto border-collapse border-2 border-purple-300">
              <thead>
                <tr className="bg-gradient-to-r from-purple-700 to-blue-700 text-white text-lg">
                  <th className="p-4 text-left border-r border-purple-300">Obiectiv</th>
                  <th className="p-4 text-left border-r border-purple-300">Data</th>
                  <th className="p-4 text-center border-r border-purple-300">Stare</th>
                  <th className="p-4 text-center">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal, index) => (
                  <tr
                    key={goal._id}
                    className={`border-b border-purple-200 hover:bg-blue-50 transition duration-200 ${
                      index % 2 === 0
                        ? goal.completed
                          ? "bg-green-200"
                          : "bg-pink-200"
                        : goal.completed
                        ? "bg-green-300"
                        : "bg-purple-200"
                    }`}
                  >
                    <td className="p-4 text-lg text-blue-900 border-r border-purple-200 tracking-wide leading-relaxed">
                      {goal.title}
                    </td>
                    <td className="p-4 text-lg text-purple-800 border-r border-purple-200 tracking-wide leading-relaxed">
                      {goal.date}
                    </td>
                    <td className="p-4 text-center border-r border-purple-200">
                      <span
                        className={`inline-block px-4 py-2 rounded-full shadow-md text-lg tracking-wide leading-relaxed ${
                          goal.completed ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                        }`}
                      >
                        {goal.completed ? "Finalizat" : "În Curs"}
                      </span>
                    </td>
                    <td className="p-4 text-center flex justify-center gap-4">
                      <button
                        onClick={() => toggleComplete(goal._id, goal.completed)}
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300 text-lg shadow-md border border-yellow-300"
                      >
                        {goal.completed ? "Reset" : "Finalizează"}
                      </button>
                      <button
                        onClick={() => deleteGoal(goal._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 text-lg shadow-md border border-red-300"
                      >
                        Șterge
                      </button>
                      <button
                        onClick={() => handleUpdateRecord(goal._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-lg shadow-md border border-blue-300"
                      >
                        Editează
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl bg-white/30 backdrop-blur-xl border border-yellow-200 p-8 mt-20 rounded-2xl shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center leading-relaxed tracking-wide">
          🤖 Asistent Obiective (AI)
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed tracking-wide">
          Întreabă-l pe AI cum să-ți atingi obiectivele sau cere idei noi! 🌟
        </p>
        <ChatComponent />
      </div>
    </div>
  );
};

export default MainPage;