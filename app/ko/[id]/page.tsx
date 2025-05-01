"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

// Define the structure of each Knowledge Object
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
  const [selectedTile, setSelectedTile] = useState<KnowledgeObject | null>(null);

  // Load and parse CSV on component mount
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

  // Helper to parse tags (if comma-separated)
  const parseTags = (tagString: string): string[] =>
    tagString.split(",").map((tag) => tag.trim()).filter(Boolean);

  // === Detail View ===
  if (selectedTile) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <button
          onClick={() => setSelectedTile(null)}
          className="mb-4 text-blue-600 underline"
        >
          ← Back to all Knowledge Objects
        </button>

        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-3xl font-bold mb-2">{selectedTile.title}</h2>
          <p className="text-gray-600 italic mb-4">
            Section: {selectedTile.section} • Level: {selectedTile.level}
          </p>

          <p className="text-gray-800 mb-4">{selectedTile.overview}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {parseTags(selectedTile.tags).map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Render HTML from content */}
          <div
            className="prose prose-sm sm:prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedTile.content }}
          />
        </div>
      </div>
    );
  }

  // === Grid View ===
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Knowledge Objects</h1>

      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((tile) => (
            <div
              key={tile.id}
              onClick={() => setSelectedTile(tile)}
              className="cursor-pointer bg-white p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-1">{tile.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Section: {tile.section} | Level: {tile.level}
              </p>
              <p className="text-gray-700 line-clamp-3">{tile.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
