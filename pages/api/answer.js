import openai from "@/lib/openai";
import { sendBadRequest, sendMethodNotAllowed, sendOk } from "@/utils/apiMethods";
import { getCollection } from "@/utils/functions";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "records";

const SYSTEM_PROMPTS = {
  SIMPLE_ASSISTANT: {
    MESSAGE: {
      role: "system",
      content: `
Ești un asistent care oferă obiective zilnice. 
Răspunde mereu în limba română. 
Dacă utilizatorul cere un obiectiv nou, oferă un exemplu clar, realist și motivant, sub forma unei singure propoziții. 
Nu adăuga explicații. Exemplu: "Fă o plimbare de 20 de minute în aer liber azi."`,
    },
    TEMPERATURE: 0.8,
    MAX_TOKENS: 60,
    TYPE: "simple_assistant",
  },
  USER: {
    MESSAGE: {
      role: "system",
      content: "You are a user. You respond with normal sentences.",
    },
    TEMPERATURE: 1,
    MAX_TOKENS: 100,
    TYPE: "user",
  },
};

const ERRORS = {
  DATABASE_ERROR: {
    type: "database_error",
    message: "Error while processing the request.",
  },
  WRONG_CONVERSATION_TYPE: {
    type: "wrong_conversation_type",
    message: "The conversation type is not known.",
  },
  OPEN_AI_ERROR: {
    type: "open_ai_error",
    message: "Error while processing the request.",
  },
};

const chatCompletion = async (messagesArray, max_tokens, temperature) => {
  const rawResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messagesArray,
    max_tokens: max_tokens,
    temperature: temperature,
  });

  return rawResponse?.choices[0];
};

const converseChat = async (inputChat, useCase) => {
  const MAX_MEMORY = 3;
  const recentMessages = inputChat.length > MAX_MEMORY
    ? inputChat.slice(-MAX_MEMORY)
    : inputChat;

  const messagesArray = [
    useCase.MESSAGE,
    ...recentMessages
  ];

  const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
  return response;
};

const converse = async (messages, type) => {
  switch (type) {
    case SYSTEM_PROMPTS.SIMPLE_ASSISTANT.TYPE:
      return converseChat(messages, SYSTEM_PROMPTS.SIMPLE_ASSISTANT);
    case SYSTEM_PROMPTS.USER.TYPE:
      return converseChat(messages, SYSTEM_PROMPTS.USER);
    default:
      throw new Error(ERRORS.WRONG_CONVERSATION_TYPE.message);
  }
};

export default async function handler(req, res) {
  const isAllowedMethod = req.method === "POST";
  const { messages, type } = req.body;

  if (!isAllowedMethod) return sendMethodNotAllowed();
  if (!messages || !Array.isArray(messages)) return sendBadRequest(res, "Missing or invalid 'messages'");
  if (!type) return sendBadRequest(res, "Missing 'type'");

  try {
    const result = await converse(messages, type);

    const aiMessage = result?.message?.content;

    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase();
    if (lastUserMessage?.includes("obiectiv nou") && aiMessage) {
      const collection = await getCollection(COLLECTION_NAME);
      await collection.insertOne({
        title: aiMessage,
        date: new Date().toISOString().split("T")[0],
        completed: false,
      });
    }

    return sendOk(res, result);
  } catch (error) {
    console.error("Eroare în handler /api/answer:", error);
    return sendBadRequest(res, ERRORS.OPEN_AI_ERROR.type, ERRORS.OPEN_AI_ERROR.message);
  }
}
