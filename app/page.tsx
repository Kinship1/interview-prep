import { CarouselTopics } from "@/components/carousel-topics";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Interview Prep
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master your technical interviews with our comprehensive quiz
            platform. Choose from various topics and customize your learning
            experience.
          </p>
        </div>
        <CarouselTopics />
      </div>
    </main>
  );
}
