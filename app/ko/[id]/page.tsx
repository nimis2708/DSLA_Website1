"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type KO = {
  id: string;
  title: string;
  section: string;
  level: string;
  overview: string;
  tags: string[];
  github_path: string;
};

export default function KnowledgeObjectPage() {
  const { id } = useParams();
  const [data, setData] = useState<KO[] | null>(null);
  const [ko, setKo] = useState<KO | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/knowledge_objects.json");
        const json = await res.json();
        setData(json);

        const matched = json.find((item: KO) => item.id.trim() === String(id).trim());
        if (!matched) {
          console.error("KO not found for id:", id);
          return;
        }

        const processed = {
          ...matched,
          github_path: matched.github_path.trim()
        };

        setKo(processed);

        const githubRawUrl = `https://raw.githubusercontent.com/nimis2708/Data-Science-Learning-Accelerator/main/${encodeURI(
          processed.github_path
        )}`;

        console.log("Fetching GitHub content from:", githubRawUrl);
        const fileRes = await fetch(githubRawUrl);

        if (!fileRes.ok) {
          console.error("Failed to fetch file:", fileRes.statusText);
          setContent(null);
          return;
        }

        const text = await fileRes.text();
        setContent(text);
      } catch (err) {
        console.error("Error fetching KO data:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!ko) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{ko.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Section:</strong> {ko.section} | <strong>Level:</strong> {ko.level}
      </p>
      <p className="mb-4">{ko.overview}</p>
      <div className="mb-6">
        {ko.tags.map((tag) => (
          <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-4">
        <strong>Resolved GitHub URL:</strong>{" "}
        <a
          href={`https://github.com/nimis2708/Data-Science-Learning-Accelerator/blob/main/${encodeURI(
            ko.github_path
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500"
        >
          View on GitHub
        </a>
      </p>

      {content ? (
        <ReactMarkdown
          className="prose prose-slate max-w-none"
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <p className="text-red-500">No content available from GitHub.</p>
      )}
    </div>
  );
}
