import { model, Schema } from "mongoose";

const optionSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
});
const examSchema = Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  exam: [questionSchema],
  score: {
    type: Number,
    required: true,
  },
});

export const Question = model("Question", questionSchema);
export const Exam = model("Exam", examSchema);
