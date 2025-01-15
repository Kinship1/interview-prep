"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getTopicIcon } from "@/lib/utils";

// Mock questions - In a real app, these would come from an API
const mockQuestions = {
  javascript: [
    {
      id: 1,
      type: "Multiple Choice",
      question: "What is a closure in JavaScript?",
      options: [
        "A function with access to variables in its outer scope",
        "A way to close browser windows",
        "A method to end loops",
        "A type of array method",
      ],
      correctAnswer: 0,
      explanation:
        "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.",
    },
    {
      id: 2,
      type: "Multiple Choice",
      question:
        "What is the difference between `var`, `let`, and `const` in JavaScript?",
      options: [
        "A) `var` has block scope, `let` and `const` have function scope.",
        "B) `var` has function scope, `let` and `const` have block scope.",
        "C) `var` and `let` are mutable, `const` is immutable.",
        "D) `var` and `const` are mutable, `let` is immutable.",
      ],
      correctAnswer: 1,
      explanation:
        "`var` has function scope, while `let` and `const` have block scope. `const` variables cannot be reassigned after they are declared.",
    },
    {
      id: 3,
      type: "Multiple Choice",
      question: "How do you create an object in JavaScript?",
      options: [
        "A) Using the `new Object()` constructor.",
        "B) Using object literal notation (e.g., `let obj = { name: 'John', age: 30 };`).",
        "C) Using the `Object.create()` method.",
        "D) All of the above.",
      ],
      correctAnswer: 3,
      explanation:
        "All of the given methods can be used to create objects in JavaScript.",
    },
    {
      id: 4,
      type: "Multiple Choice",
      question: "What is the purpose of the `this` keyword in JavaScript?",
      options: [
        "A) To refer to the current function.",
        "B) To refer to the current object.",
        "C) To refer to the global object.",
        "D) To refer to the window object.",
      ],
      correctAnswer: 1,
      explanation:
        "The `this` keyword refers to the object that the function is a property of.",
    },
    {
      id: 5,
      type: "Multiple Choice",
      question: "What is the difference between `==` and `===` in JavaScript?",
      options: [
        "A) `==` performs strict equality comparison, `===` performs loose equality comparison.",
        "B) `===` performs strict equality comparison, `==` performs loose equality comparison.",
        "C) `==` only compares values, `===` compares both value and type.",
        "D) `===` only compares values, `==` compares both value and type.",
      ],
      correctAnswer: 2,
      explanation:
        "`==` performs type coercion before comparison, while `===` does not.",
    },
    {
      id: 6,
      type: "Multiple Choice",
      question: "What is the purpose of the `typeof` operator in JavaScript?",
      options: [
        "A) To determine the data type of a variable.",
        "B) To convert a variable to a specific data type.",
        "C) To check if a variable is defined.",
        "D) To check if a variable is null.",
      ],
      correctAnswer: 0,
      explanation:
        "The `typeof` operator returns a string indicating the data type of a variable.",
    },
    {
      id: 7,
      type: "Multiple Choice",
      question:
        "How do you add an element to the end of an array in JavaScript?",
      options: [
        "A) Using the `push()` method.",
        "B) Using the `pop()` method.",
        "C) Using the `shift()` method.",
        "D) Using the `unshift()` method.",
      ],
      correctAnswer: 0,
      explanation:
        "The `push()` method adds one or more elements to the end of an array.",
    },
    {
      id: 8,
      type: "Multiple Choice",
      question:
        "How do you remove the last element from an array in JavaScript?",
      options: [
        "A) Using the `push()` method.",
        "B) Using the `pop()` method.",
        "C) Using the `shift()` method.",
        "D) Using the `unshift()` method.",
      ],
      correctAnswer: 1,
      explanation:
        "The `pop()` method removes the last element from an array and returns that element.",
    },
    {
      id: 9,
      type: "Multiple Choice",
      question: "How do you iterate over an array in JavaScript?",
      options: [
        "A) Using a `for` loop.",
        "B) Using a `for...of` loop.",
        "C) Using the `forEach()` method.",
        "D) All of the above.",
      ],
      correctAnswer: 3,
      explanation:
        "All of the given methods can be used to iterate over an array in JavaScript.",
    },
    {
      id: 10,
      type: "Multiple Choice",
      question: "What is the purpose of the `map()` method in JavaScript?",
      options: [
        "A) To create a new array by performing an operation on each element of the original array.",
        "B) To filter elements from an array based on a condition.",
        "C) To reduce an array to a single value.",
        "D) To find the index of an element in an array.",
      ],
      correctAnswer: 0,
      explanation:
        "The `map()` method creates a new array by applying a provided function to each element of the original array.",
    },
    {
      id: 11,
      type: "Multiple Choice",
      question: "What is the purpose of the `filter()` method in JavaScript?",
      options: [
        "A) To create a new array by performing an operation on each element of the original array.",
        "B) To filter elements from an array based on a condition.",
        "C) To reduce an array to a single value.",
        "D) To find the index of an element in an array.",
      ],
      correctAnswer: 1,
      explanation:
        "The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.",
    },
    {
      id: 12,
      type: "Multiple Choice",
      question: "What is a callback function in JavaScript?",
      options: [
        "A) A function that is passed as an argument to another function.",
        "B) A function that is called automatically after a certain period of time.",
        "C) A function that returns another function.",
        "D) A function that is defined within another function.",
      ],
      correctAnswer: 0,
      explanation:
        "A callback function is a function that is passed as an argument to another function and is executed later, when the outer function finishes its task.",
    },
    {
      id: 13,
      type: "Multiple Choice",
      question:
        "What is the difference between a function declaration and a function expression in JavaScript?",
      options: [
        "A) Function declarations are hoisted, function expressions are not.",
        "B) Function expressions are hoisted, function declarations are not.",
        "C) Function declarations can be named, function expressions cannot.",
        "D) Function expressions can be named, function declarations cannot.",
      ],
      correctAnswer: 0,
      explanation:
        "Function declarations are hoisted, meaning they can be called before they are declared. Function expressions are not hoisted.",
    },
    {
      id: 14,
      type: "Multiple Choice",
      question: "What is an arrow function in JavaScript?",
      options: [
        "A) A shorter syntax for writing anonymous functions.",
        "B) A function that always returns an object.",
        "C) A function that cannot be used with the `this` keyword.",
        "D) A function that is automatically called after a certain period of time.",
      ],
      correctAnswer: 0,
      explanation:
        "Arrow functions provide a concise syntax for writing functions.",
    },
    {
      id: 15,
      type: "Multiple Choice",
      question:
        "What is the purpose of the `async/await` keywords in JavaScript?",
      options: [
        "A) To handle asynchronous operations in a more synchronous-like manner.",
        "B) To create asynchronous functions that always return a promise.",
        "C) To make functions run faster.",
        "D) To prevent errors in asynchronous code.",
      ],
      correctAnswer: 0,
      explanation:
        "`async/await` makes asynchronous code easier to read and write by making it look and behave more like synchronous code.",
    },
    {
      id: 16,
      type: "Multiple Choice",
      question: "What is a Promise in JavaScript?",
      options: [
        "A) An object that represents the eventual completion (or failure) of an asynchronous operation.",
        "B) A way to store data in a temporary location.",
        "C) A function that is executed immediately.",
        "D) A type of loop for iterating over arrays.",
      ],
      correctAnswer: 0,
      explanation:
        "A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.",
    },
    {
      id: 17,
      type: "Multiple Choice",
      question: "What is the purpose of the `try...catch` block in JavaScript?",
      options: [
        "A) To handle errors that occur during the execution of code.",
        "B) To prevent errors from occurring in the first place.",
        "C) To improve the performance of code.",
        "D) To create custom error messages.",
      ],
      correctAnswer: 0,
      explanation:
        "`try...catch` blocks are used to handle exceptions (errors) that occur during the execution of code.",
    },
    {
      id: 18,
      type: "Multiple Choice",
      question: "What is the DOM (Document Object Model)?",
      options: [
        "A) An API for interacting with and manipulating the structure, style, and content of HTML, XHTML, and XML documents.",
        "B) A programming language used for web development.",
        "C) A type of database used to store web page data.",
        "D) A network protocol for transferring data on the internet.",
      ],
      correctAnswer: 0,
      explanation:
        "The DOM represents the HTML, XHTML, or XML document as a tree structure.",
    },
    {
      id: 19,
      type: "Multiple Choice",
      question: "How do you select an element by its ID in JavaScript?",
      options: [
        "A) Using the `getElementById()` method.",
        "B) Using the `querySelector()` method.",
        "C) Using the `getElementsByClassName()` method.",
        "D) Using the `getElementsByTagName()` method.",
      ],
      correctAnswer: 0,
      explanation:
        "The `getElementById()` method is used to select a single element by its ID.",
    },
    {
      id: 20,
      type: "Multiple Choice",
      question: "How do you add an event listener to an element in JavaScript?",
      options: [
        "A) Using the `addEventListener()` method.",
        "B) Using the `attachEvent()` method.",
        "C) Using the `on<event>` attribute (e.g., `onclick`).",
        "D) All of the above.",
      ],
      correctAnswer: 3,
      explanation:
        "All of the given methods can be used to add event listeners to elements.",
    },
    {
      id: 21,
      type: "Multiple Choice",
      question: "What is the purpose of the `window` object in JavaScript?",
      options: [
        "A) To represent the browser window.",
        "B) To store global variables.",
        "C) To access browser-specific features (e.g., location, history).",
        "D) All of the above.",
      ],
      correctAnswer: 3,
      explanation:
        "The `window` object represents the browser window and provides access to many browser-specific features.",
    },
    {
      id: 22,
      type: "Multiple Choice",
      question:
        "What is the purpose of the `localStorage` and `sessionStorage` objects in JavaScript?",
      options: [
        "A) To store data locally in the user's browser.",
        "B) To communicate with a server.",
        "C) To create cookies.",
        "D) To access the user's file system.",
      ],
      correctAnswer: 0,
      explanation:
        "`localStorage` stores data with no expiration time, while `sessionStorage` stores data that is cleared when the browser tab or window is closed.",
    },
    {
      id: 23,
      type: "Multiple Choice",
      question:
        "What is the purpose of the `JSON.stringify()` and `JSON.parse()` methods in JavaScript?",
      options: [
        "A) To convert JavaScript objects to JSON strings and vice versa.",
        "B) To create arrays from strings.",
        "C) To format strings.",
        "D) To validate user input.",
      ],
      correctAnswer: 0,
      explanation:
        "`JSON.stringify()` converts a JavaScript object or value to a JSON string, and `JSON.parse()` parses a JSON string and converts it into a JavaScript object or value.",
    },
    {
      id: 24,
      type: "Multiple Choice",
      question: "What is a JavaScript framework?",
      options: [
        "A) A library of pre-written JavaScript code that simplifies common web development tasks.",
        "B) A tool for debugging JavaScript code.",
        "C) A type of database for storing JavaScript applications.",
        "D) A programming language that compiles to JavaScript.",
      ],
      correctAnswer: 0,
      explanation:
        "JavaScript frameworks provide a structure and set of tools for building complex web applications.",
    },
    {
      id: 25,
      type: "Multiple Choice",
      question: "What is a common use case for AJAX in JavaScript?",
      options: [
        "A) To send and receive data from a server without reloading the entire page.",
        "B) To create interactive animations.",
        "C) To store data locally in the user's browser.",
        "D) To debug JavaScript code.",
      ],
      correctAnswer: 0,
      explanation:
        "AJAX (Asynchronous JavaScript and XML) allows web pages to be updated asynchronously by exchanging data with the server, meaning that the page doesn't have to be completely reloaded.",
    },
  ],
};

export function QuizSession({ config, topic }: { config: any; topic: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(parseInt(config.questionCount)).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const TopicIcon = getTopicIcon(topic);
  const questions = mockQuestions[topic as keyof typeof mockQuestions] || [];
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
                  {answers[index] === q.correctAnswer ? (
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
                answers[currentQuestion] !== null
                  ? answers[currentQuestion].toString()
                  : ""
              }
              onValueChange={handleAnswer}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            {config.showAnswers && answers[currentQuestion] !== null && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold">
                  {answers[currentQuestion] === question.correctAnswer ? (
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
