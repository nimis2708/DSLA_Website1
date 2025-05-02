"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import fs from "fs";


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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Knowledge Objects</h1>

      {/* Grid of KO Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((tile) => (
          <div
            key={tile.id}
            onClick={() => setSelectedTile(tile)}
            className="cursor-pointer p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <h2 className="text-xl font-semibold">{tile.title}</h2>
            <p className="text-sm text-gray-600">{tile.overview}</p>
          </div>
        ))}
      </div>

      {/* Selected Tile Detail View */}
      {selectedTile && (
        <div className="mt-10 p-6 border rounded bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-2">{selectedTile.title}</h2>
          <p className="text-gray-700 mb-4">{selectedTile.overview}</p>

          {/* Rich HTML Content from CSV */}
          <div
            className="prose prose-sm sm:prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedTile.content }}
          />
        </div>
      )}
    </div>
  );
}
