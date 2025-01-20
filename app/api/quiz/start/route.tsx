import { QuizQuestionsData, QuizConfig } from "@/lib/types";
import { post } from "@/lib/utils";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "";

export async function POST(request: Request) {
  const body: QuizConfig = await request.json();
  console.log(API_BASE_URL);
  try {
    const response = await fetch(API_BASE_URL + "/quiz/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numQuestions: body.config.questionCount,
        subTopicIds: body.config.subtopics,
        questionTypeIds: body.config.types,
        topic: body.topic,
      }),
    });
    const quizData: QuizQuestionsData = await response.json();

    return NextResponse.json({ ok: true, data: quizData });
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.json(
      { ok: false, error: "Failed to start quiz" },
      { status: 500 }
    );
  }
}
