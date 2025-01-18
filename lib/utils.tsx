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

export const get = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
  });
  return res.json();
};

export const post = async (url: string, body: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const put = async (url: string, body: any) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const deleteMethod = async (url: string) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
