"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuizSetup } from "@/components/quiz-setup";
import { QuizSession } from "@/components/quiz-session";
import { getTopicIcon, post } from "@/lib/utils";
import { QuizConfig, QuizQuestionsData } from "@/lib/types";

export function QuizPageClient({ topic }: { topic: string }) {
  const [showSetup, setShowSetup] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizData, setQuizData] = useState<QuizQuestionsData[] | null>(null);

  const TopicIcon = getTopicIcon(topic);

  const handleStartQuiz = async (config: any) => {
    try {
      const response = await post("/api/quiz/start", {
        topic,
        config,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const { data } = response;
      setQuizData(data);
      setQuizConfig(config);
      setShowSetup(false);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Handle error appropriately
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Dialog open={showSetup} onOpenChange={setShowSetup}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <TopicIcon className="w-8 h-8" />
              <DialogTitle className="text-2xl capitalize">
                {topic.replace("-", " ")} Quiz
              </DialogTitle>
            </div>
            <DialogDescription>
              Customize your quiz settings below
            </DialogDescription>
          </DialogHeader>
          <QuizSetup onStart={handleStartQuiz} topic={topic} />
        </DialogContent>
      </Dialog>

      {quizStarted && quizConfig && (
        <QuizSession config={quizConfig} topic={topic} quizData={quizData} />
      )}
    </main>
  );
}
