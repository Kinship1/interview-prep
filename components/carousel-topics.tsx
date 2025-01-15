"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Code2, Terminal, Globe, Server } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";

const topics = [
  { name: "JavaScript", icon: "/images/javascript.png", slug: "javascript" },
  { name: "React", icon: "/images/reactjs.png", slug: "react" },
  { name: "SQL", icon: Database, slug: "sql" },
  { name: "Data Structures", icon: Code2, slug: "dsa" },
  { name: "Git", icon: "/images/git.png", slug: "git" },
  { name: "Node.js", icon: Terminal, slug: "nodejs" },
  { name: "Web APIs", icon: Globe, slug: "web-apis" },
  { name: "System Design", icon: Server, slug: "system-design" },
];

export function CarouselTopics() {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
        watchDrag: true,
      }}
      plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {topics.map((topic) => (
          <CarouselItem key={topic.slug} className="md:basis-1/3 lg:basis-1/4">
            <Link href={`/quiz/${topic.slug}`}>
              <Card className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {typeof topic.icon === "string" ? (
                    <Image
                      src={topic.icon}
                      alt={topic.name}
                      width={48}
                      height={48}
                      className="mb-4"
                    />
                  ) : (
                    <topic.icon className="w-12 h-12 mb-4" />
                  )}
                  <h3 className="font-semibold text-lg">{topic.name}</h3>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
