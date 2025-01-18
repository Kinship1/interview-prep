"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getTopicIcon } from "@/lib/utils";
import { QuizQuestionsData } from "@/lib/types";

export function QuizSession({
  config,
  topic,
  quizData,
}: {
  config: any;
  topic: string;
  quizData: QuizQuestionsData[] | null;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>(
    Array(parseInt(config.questionCount)).fill("")
  );
  const [showResults, setShowResults] = useState(false);

  const TopicIcon = getTopicIcon(topic);
  const questions = quizData || [];
  const question = questions[currentQuestion];
  const progress =
    ((currentQuestion + 1) / parseInt(config.questionCount)) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < parseInt(config.questionCount) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quiz Results</h2>
          <TopicIcon className="w-8 h-8" />
        </div>
        <div className="space-y-4">
          {questions
            .slice(0, parseInt(config.questionCount))
            .map((q, index) => (
              <Card key={q.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="font-semibold">Question {index + 1}</h3>
                  {answers[index] === q.correctAnswer[0] ? (
                    <span className="text-green-500">Correct</span>
                  ) : (
                    <span className="text-red-500">Incorrect</span>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{q.question}</p>
                  {config.showAnswers && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="font-semibold">Explanation:</p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
        <Button onClick={() => window.location.reload()}>Start New Quiz</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">
            Question {currentQuestion + 1} of {config.questionCount}
          </h2>
          <Progress value={progress} className="w-[60vw]" />
        </div>
        <TopicIcon className="w-8 h-8" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">{question.question}</h3>
            <RadioGroup
              value={
                answers[currentQuestion]
                  ? answers[currentQuestion].toString()
                  : ""
              }
              onValueChange={handleAnswer}
            >
              {Object.entries(question.options).map(([key, option]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={`option-${key}`} />
                  <Label htmlFor={`option-${key}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            {config.showAnswers && answers[currentQuestion] !== null && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">
                  {answers[currentQuestion] === question.correctAnswer[0] ? (
                    <span className="text-green-500">Correct</span>
                  ) : (
                    <span className="text-red-500">Incorrect</span>
                  )}
                </p>
                <p>{question.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={answers[currentQuestion] === null}
        >
          {currentQuestion < parseInt(config.questionCount) - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </div>
    </div>
  );
}
