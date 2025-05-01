"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Papa from "papaparse";

interface KnowledgeObject {
  id: string;
  title: string;
  section: string;
  level: string;
  overview: string;
  tags: string[];
  github_path: string;
}

export default function KnowledgeObjectDetail() {
  const { id } = useParams();
  const [ko, setKo] = useState<KnowledgeObject | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKO() {
      try {
        const response = await fetch("/knowledge_objects.csv");
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result?.value);
        const parsed = Papa.parse(csv, { header: true });
        const data = parsed.data as any[];

        const matched = data.find((item) => item.id === id);

        if (matched) {
          const processed: KnowledgeObject = {
            id: matched.id,
            title: matched.title,
            section: matched.section,
            level: matched.level,
            overview: matched.overview,
            tags: typeof matched.tags === "string"
              ? matched.tags.split(",").map((tag: string) => tag.trim())
              : [],
            github_path: matched.github_path,
          };
          setKo(processed);

          if (processed.github_path) {
            const githubRawUrl = `https://raw.githubusercontent.com/nimis2708/Data-Science-Learning-Accelerator/main/${processed.github_path}`;
            const fileRes = await fetch(githubRawUrl);
            const fileText = await fileRes.text();
            setContent(fileText);
          }
        }
      } catch (err) {
        console.error("Error loading KO detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchKO();
  }, [id]);

  if (loading) return <div className="container py-10">Loading...</div>;
  if (!ko) return <div className="container py-10">Knowledge Object not found.</div>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">{ko.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Section: {ko.section} · Level: {ko.level}
      </p>
      <p className="mb-4">{ko.overview}</p>
      {ko.tags?.length > 0 && (
        <div className="flex gap-2 mb-4">
          {ko.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      {content ? (
        content.trim().startsWith("<") ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <pre className="whitespace-pre-wrap">{content}</pre>
        )
      ) : (
        <p>No content available from GitHub.</p>
      )}
    </div>
  );
}
