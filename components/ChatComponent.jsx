import React, { useState } from 'react';
import MessageBox from "@/components/MessageBox";

export default function ChatComponent() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [...chatMessages, {
      role: "user",
      content: userInput,
    }];

    setChatMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          type: "simple_assistant",
        }),
      });

      const data = await res.json();
      console.log("Răspuns API complet:", data);

      let messageContent = null;
      if (data && data.message) {
        messageContent = data.message.content;
      } else if (data.data && data.data.message) {
        messageContent = data.data.message.content;
      }

      if (messageContent) {
        setChatMessages((prev) => {
          const updated = [...prev, { role: "assistant", content: messageContent }];
          console.log("Mesaje actualizate:", updated);
          return updated;
        });
      } else {
        console.log("Răspuns invalid sau lipsă mesaj:", data);
      }
    } catch (error) {
      console.error("Eroare la trimitere mesaj:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <MessageBox chatMessages={chatMessages} />

      <div className="mt-6 w-full max-w-md mx-auto flex flex-col gap-4">

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
          placeholder="Scrie o întrebare despre obiective..."
          rows="3"
          className="w-full h-24 text-xl font-bold px-5 py-4 rounded-xl shadow-md focus:outline-none bg-white tracking-wide leading-relaxed resize-none border-none"
          />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-40 sm:w-auto sm:min-w-[120px] mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 shadow-md"
        >
          {loading ? "..." : "Trimite"}
        </button>
      </div>
    </div>
  );
}
