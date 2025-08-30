import dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY?.trim() });

export const generateProjectIdeas = async (req, res) => {



  try {
    const { roadmapName, difficulty } = req.body;


    let difficultyText;
    if (difficulty && difficulty !== "Mixed") {
      difficultyText = `All ideas should be of ${difficulty} difficulty.`;
    } else {
      difficultyText = `Include 1 Beginner, 1 Intermediate, and 1 Advanced idea.`;
    }


    if (!roadmapName || typeof roadmapName !== "string") {
      return res.status(400).json({ error: "roadmapName is required" });
    }

    const prompt = `You are to return ONLY a JSON array — no explanations, no markdown formatting, no code fences.
Suggest exactly 3 unique project ideas for someone who completed the "${roadmapName}" roadmap.
${difficultyText}

Each object must have:
- title
- difficulty ("Beginner", "Intermediate", "Advanced")
- duration (e.g. "4-6 weeks")
- description
- requiredSkills (array of strings)
- keyFeatures (array of 3-5 strings)

Example:
[
  {
    "title": "Social Media Dashboard",
    "difficulty": "Advanced",
    "duration": "6-8 weeks",
    "description": "Build a social media management platform...",
    "requiredSkills": ["React", "Node.js", "Express", "MongoDB"],
    "keyFeatures": [
      "Multi-platform scheduling",
      "Real-time analytics",
      "User authentication"
    ]
  }
]`;


    console.log("AI request started...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let aiText = response.choices[0]?.message?.content?.trim();

    if (!aiText) {
      return res.status(500).json({ error: "Empty response from AI" });
    }

    // Remove ```json or ``` if present
    aiText = aiText.replace(/```json\s*|\s*```/g, "").trim();

    let projects;

    try {
      projects = JSON.parse(aiText);
    } catch (parseError) {
      console.error("Failed to parse AI JSON:", parseError);
      console.error("Raw AI output:", aiText);
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }


    res.json({ projects });
  } catch (error) {
    console.error("Error in generateProjectIdeas:", error);
    res.status(500).json({ error: "Failed to generate projects" });
  }
};




export const generateAIExplanation = async (req, res) => {
  try {
    const { question, correctAnswer, selectedAnswer } = req.body;

    if (!question || !correctAnswer) {
      return res.status(400).json({ error: "question and correctAnswer are required" });
    }

    const prompt = `
You are an AI tutor. Explain the following programming multiple-choice question in plain text only. 
Do not use Markdown, bold, italics, or special characters. 
Keep the explanation clear, concise, and beginner-friendly.

Rules:
- First explain why the correct answer is correct (step by step if needed).
- Then briefly explain why the other options are incorrect (only if provided).
- Keep explanations short: 2–5 sentences or simple bullet points.
- Focus only on programming concepts.

Question: ${question}
User's Answer: ${selectedAnswer ? selectedAnswer : "Not provided"}
Correct Answer: ${correctAnswer}

`;

    console.log("AI explanation request started...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const explanation = response.choices[0]?.message?.content?.trim();

    if (!explanation) {
      return res.status(500).json({ error: "Empty response from AI" });
    }

    res.json({ explanation });
  } catch (error) {
    console.error("Error in generateAIExplanation:", error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
};
