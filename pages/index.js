// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/records');
      const data = await res.json();
      setGoals(data.data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    if (!title) return;
    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date: new Date().toISOString().split('T')[0] }),
      });
      const data = await res.json();
      setGoals([...goals, data.data.ops[0]]);
      setTitle('');
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Daily Goals</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new goal..."
          />
          <button
            onClick={addGoal}
            className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Goal
          </button>
        </div>
        <ul className="space-y-4">
          {goals.length === 0 ? (
            <p className="text-gray-500">No goals yet. Add one above!</p>
          ) : (
            goals.map((goal) => (
              <li key={goal._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-800">
                  {goal.date}: {goal.title} - {goal.completed ? 'Completed' : 'In Progress'}
                </span>
                <div>
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}