"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import MultiSelectDropdown from "./ui/multi-select-dropdown";

const questionCounts = ["5", "10", "15", "20"];

const subtopics: Record<string, string[]> = {
  javascript: [
    "Closures",
    "Promises",
    "ES6 Features",
    "Event Loop",
    "Prototypes",
    "Async/Await",
  ],
  react: [
    "Hooks",
    "Components",
    "State Management",
    "Virtual DOM",
    "Performance",
    "Context API",
  ],
  // Add more topics as needed
};

const questionTypes = [
  "Multiple Choice",
  "True/False",
  "Coding Challenge",
  "Short Answer",
];

export function QuizSetup({
  onStart,
  topic,
}: {
  onStart: (config: any) => void;
  topic: string;
}) {
  const [open, setOpen] = useState(false);
  const [openTypes, setOpenTypes] = useState(false);
  const [questionCount, setQuestionCount] = useState("10");
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const availableSubtopics = subtopics[topic] || [];
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Number of Questions</label>
        <Select value={questionCount} onValueChange={setQuestionCount}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {questionCounts.map((count) => (
              <SelectItem key={count} value={count}>
                {count} Questions
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <MultiSelectDropdown
          options={availableSubtopics}
          onChange={setSelectedSubtopics}
          isOpen={open}
          setIsOpen={setOpen}
          label="Select Subtopics"
        />
      </div>

      <div className="space-y-2">
        <MultiSelectDropdown
          options={questionTypes}
          onChange={setSelectedTypes}
          isOpen={openTypes}
          setIsOpen={setOpenTypes}
          label="Select Question Types"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Show Answers</label>
        <Switch checked={showAnswers} onCheckedChange={setShowAnswers} />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Change Topic
        </Button>
        <Button
          onClick={() => {
            console.log({
              questionCount: parseInt(questionCount),
              subtopics: selectedSubtopics,
              types: selectedTypes,
              showAnswers,
            });
            onStart({
              questionCount: parseInt(questionCount),
              subtopics: selectedSubtopics,
              types: selectedTypes,
              showAnswers,
            });
          }}
          disabled={!selectedSubtopics.length || !selectedTypes.length}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
