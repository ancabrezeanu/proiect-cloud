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
			console.log("Răspuns invalid sau lipsă message:", data);
		  }
		} catch (error) {
		  console.error("Eroare la trimitere mesaj:", error);
		} finally {
		  setLoading(false);
		}
	  };

	return (
		<div className="w-full">
			<MessageBox chatMessages={chatMessages} />

			<div className="mt-4 flex gap-2">
				<input
					type="text"
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && sendMessage()}
					placeholder="Scrie o întrebare despre obiective..."
					className="flex-1 p-3 border border-purple-300 rounded shadow"
				/>
				<button
					onClick={sendMessage}
					disabled={loading}
					className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 transition"
				>
					{loading ? "..." : "Trimite"}
				</button>
			</div>
		</div>
	);
}
