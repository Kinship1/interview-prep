import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Database, Code2, Terminal, Globe, Server } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTopicIcon(topic: string): React.ComponentType<any> {
  const icons: Record<string, React.ComponentType<any>> = {
    javascript: (props) => (
      <img src="/images/javascript.png" alt="JavaScript" {...props} />
    ),
    react: (props) => <img src="/images/reactjs.png" alt="React" {...props} />,
    sql: Database,
    dsa: Code2,
    git: (props) => <img src="/images/git.png" alt="Git" {...props} />,
    nodejs: Terminal,
    "web-apis": Globe,
    "system-design": Server,
  };

  return icons[topic] || Code2;
}
