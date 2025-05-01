"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

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
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/knowledge_objects.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<KnowledgeObject>(csvText, {
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
        {data.map((tile) => {
          const isSelected = tile.id === selectedTileId;

          return (
            <div
              key={tile.id}
              className="p-4 border rounded shadow hover:bg-gray-100 transition cursor-pointer"
              onClick={() =>
                setSelectedTileId(isSelected ? null : tile.id)
              }
            >
              <h2 className="text-xl font-semibold">{tile.title}</h2>
              <p className="text-sm text-gray-600">{tile.overview}</p>

              {isSelected && (
                <div className="mt-4 bg-white rounded border-t pt-4">
                  <div
                    className="prose prose-sm sm:prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: tile.content }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
