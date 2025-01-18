import { QuizPageClient } from "./quiz-page-client";

export async function generateStaticParams() {
  const topics = [
    "javascript",
    "react",
    "sql",
    "dsa",
    "git",
    "nodejs",
    "web-apis",
    "system-design",
  ];

  return topics.map((topic) => ({ topic }));
}

export default async function QuizPage(props: {
  params: Promise<{ topic: string }>;
}) {
  const params = await props.params;
  return <QuizPageClient topic={params.topic} />;
}
