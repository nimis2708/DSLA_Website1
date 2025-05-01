"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface KO {
  id: string;
  title: string;
  section: string;
  level: string;
  overview: string;
  tags: string[];
  github_path: string;
  content: string;
}

export default function Page() {
  const [data, setData] = useState<KO[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedKO, setSelectedKO] = useState<KO | null>(null);

  useEffect(() => {
    fetch("/kofiles/combined_data.json")
      .then((response) => response.json())
      .then((jsonData: KO[]) => setData(jsonData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const sections = Array.from(new Set(data.map((item) => item.section)));

  const filteredData = selectedSection
    ? data.filter((item) => item.section === selectedSection)
    : data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Knowledge Objects</h1>

      <div className="mb-4">
        <span className="mr-2 font-semibold">Filter by Section:</span>
        {sections.map((section) => (
          <Button
            key={section}
            variant={selectedSection === section ? "default" : "outline"}
            className="mr-2 mb-2"
            onClick={() =>
              setSelectedSection(selectedSection === section ? null : section)
            }
          >
            {section}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedKO(item)}
          >
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.level}</p>
              <p className="mt-2 text-sm">{item.overview}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedKO && (
        <div className="mt-8 border rounded p-6 bg-white max-h-[600px] overflow-auto">
          <h2 className="text-xl font-semibold mb-4">{selectedKO.title}</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: selectedKO.content }}
          />
        </div>
      )}
    </div>
  );
}
