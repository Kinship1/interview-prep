import { QuizQuestionsData, QuizConfig } from "@/lib/types";
import { post } from "@/lib/utils";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "";

export async function POST(request: Request) {
  const body: QuizConfig = await request.json();
  try {
    const quizData: QuizQuestionsData = await post(
      API_BASE_URL + "/quiz/start",
      {
        numQuestions: body.config.questionCount,
        subTopicIds: body.config.subtopics,
        questionTypeIds: body.config.types,
        topic: body.topic,
      }
    );
    return NextResponse.json({ ok: true, data: quizData });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json(
      { ok: false, error: "Failed to start quiz" },
      { status: 500 }
    );
  }
}
