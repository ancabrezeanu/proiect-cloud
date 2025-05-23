import { useState, useEffect } from "react";
import ChatComponent from "@/components/ChatComponent";

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/records");
      const data = await res.json();
      setGoals(data.data || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date: new Date().toISOString().split("T")[0], completed: false }),
      });
      const data = await res.json();
      setGoals([...goals, data.data]);
      setTitle("");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-yellow-300 text-2xl font-bold animate-spin">
        ⏳ Se încarcă...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 relative overflow-hidden">
      <h1 className="text-yellow-200 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 px-12 py-5 rounded-2xl shadow-2xl tracking-wider animate-pulse z-10 border-4 border-yellow-300">
        🌌 Obiectivele Tale 🌌
      </h1>

      <div className="w-full max-w-4xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl shadow-2xl z-10 border-2 border-blue-300 mt-8">
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Adaugă un obiectiv nou..."
            className="flex-1 p-3 rounded-lg border border-purple-300 shadow-inner text-lg"
          />
          <button
            onClick={addGoal}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg shadow-md border border-green-300"
          >
            ➕ Adaugă
          </button>
        </div>

        {goals.length === 0 ? (
          <p className="text-center text-lg text-purple-700 font-semibold">
            Nu ai obiective încă. Adaugă unul mai sus! 🌟
          </p>
        ) : (
          <div className="overflow-x-auto mt-12">
            <table className="w-full table-auto border-collapse border-2 border-purple-300">
              <thead>
                <tr className="bg-gradient-to-r from-purple-700 to-blue-700 text-white text-xl">
                  <th className="p-3 text-left border-r border-purple-300">Obiectiv</th>
                  <th className="p-3 text-left border-r border-purple-300">Data</th>
                  <th className="p-3 text-center border-r border-purple-300">Stare</th>
                  <th className="p-3 text-center">Acțiuni</th>
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
                    <td className="p-3 text-xl text-blue-900 border-r border-purple-200">🎯 {goal.title}</td>
                    <td className="p-3 text-xl text-purple-800 border-r border-purple-200">{goal.date}</td>
                    <td className="p-3 text-center text-xl border-r border-purple-200">
                      <span
                        className={`inline-block px-3 py-1 rounded-full shadow-md ${
                          goal.completed ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                        }`}
                      >
                        {goal.completed ? "Finalizat" : "În Curs"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleComplete(goal._id, goal.completed)}
                        className="bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg hover:bg-yellow-500 transition duration-300 mr-2 text-lg shadow-md border border-yellow-300"
                      >
                        {goal.completed ? "🔄 Reset" : "✔️ Finalizează"}
                      </button>
                      <button
                        onClick={() => deleteGoal(goal._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300 text-lg shadow-md border border-red-300"
                      >
                        ❌ Șterge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🧠 Asistent AI Chat */}
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl border border-yellow-200 p-6 mt-16 rounded-2xl shadow-2xl z-10">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          🤖 Asistent Obiective (AI)
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Întreabă-l pe AI cum să-ți atingi obiectivele sau cere idei noi! 🌟
        </p>
        <ChatComponent />
      </div>
    </div>
  );
}
