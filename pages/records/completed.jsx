// pages/records/completed.js
import { useState, useEffect } from "react";

export default function CompletedGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/records");
      const data = await res.json();
      setGoals(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching goals:", error);
      setLoading(false);
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
      // Actualizează starea locală pentru a elimina obiectivul din listă
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const completedGoals = goals.filter((goal) => goal.completed);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-yellow-300 text-4xl font-bold animate-spin">
        ⏳ Se încarcă...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 flex flex-col items-center py-12 relative overflow-hidden">
      {/* Elemente de fundal pentru cer */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-20"></div>
      <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white rounded-full opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 left-40 w-16 h-16 bg-white rounded-full opacity-25 animate-float"></div>

      <h1 className="text-6xl font-extrabold text-yellow-300 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-10 py-4 rounded-xl shadow-2xl tracking-wider mb-10 animate-pulse z-10">
        ✅ Obiective Finalizate ✅
      </h1>
      <div className="w-full max-w-4xl bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl z-10">
        {completedGoals.length === 0 ? (
          <p className="text-center text-xl text-blue-600">Nu ai obiective finalizate încă! 🌟</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl">
                  <th className="p-4 text-left">Obiectiv</th>
                  <th className="p-4 text-left">Data</th>
                  <th className="p-4 text-center">Stare</th>
                  <th className="p-4 text-center">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {completedGoals.map((goal, index) => (
                  <tr
                    key={goal._id}
                    className={`border-b border-gray-200 hover:bg-blue-50 transition duration-200 ${
                      index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                    }`}
                  >
                    <td className="p-4 text-xl text-blue-900">🎯 {goal.title}</td>
                    <td className="p-4 text-xl text-purple-700">{goal.date}</td>
                    <td className="p-4 text-center text-xl">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-white">
                        Finalizat
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleComplete(goal._id, goal.completed)}
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300 mr-2 text-lg shadow-md"
                      >
                        🔄 Reset
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}