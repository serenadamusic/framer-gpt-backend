import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { userMessage } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "asst_WQiIiK3jIukwi1CViLvvWAST", // 👈 Use your custom model/assistant ID here
      messages: [{ role: "user", content: userMessage }],
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
