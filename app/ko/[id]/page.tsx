"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Link from "next/link";

type KnowledgeObject = {
  id: string;
  title: string;
  section: string;
  level: string;
  overview: string;
  tags: string;
  github_path: string;
  content: string;
};

export default function Page5() {
  const [data, setData] = useState<KnowledgeObject[]>([]);

  useEffect(() => {
    fetch("/knowledge_objects.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse<KnowledgeObject>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Knowledge Objects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((tile) => (
          <Link
            key={tile.id}
            href={`/page5/${tile.id}`}
            className="block bg-white p-4 border rounded-lg shadow hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{tile.title}</h2>
            <p className="text-sm text-gray-500">
              Section: {tile.section} | Level: {tile.level}
            </p>
            <p className="text-gray-700 mt-2">{tile.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
