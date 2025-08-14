// models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // Roadmap reference (MVP)
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },

    // Optional Milestone reference (for future use)
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },

    // Embedded questions
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
        explanation: {
          correct: { type: String },
          wrong: { type: String }
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);

// EXAMPLE DOCUMENT BELOW
/* {
  "_id": "66bfa234...",
  "title": "Frontend Development Quiz",
  "roadmap": "66bcf4a2...",
  "questions": [                     -----> An array of question <------
    {
      "question": "Which HTML tag is used to create a hyperlink?",
      "options": ["<a>", "<link>", "<href>", "<url>"],
      "correctIndex": 0,
      "explanation": {
        "correct": "The <a> tag defines hyperlinks.",
        "wrong": "Other tags like <link> are used for stylesheets."
      }
    }
  ],
  "createdAt": "2025-08-14T16:42:31.620Z"
}
 */