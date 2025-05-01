import fs from "fs";
import path from "path";
import Papa from "papaparse";
import mammoth from "mammoth";
import { notFound } from "next/navigation";

// Structure of each tile
type KnowledgeObject = {
  id: string;
  title: string;
  section: string;
  level: string;
  overview: string;
  tags: string;
  github_path: string;  // path to .docx or other
  content: string;      // fallback HTML
};

// Load and parse CSV
async function getData(): Promise<KnowledgeObject[]> {
  const csvPath = path.join(process.cwd(), "public", "knowledge_objects.csv");
  const raw = fs.readFileSync(csvPath, "utf8");
  return Papa.parse<KnowledgeObject>(raw, { header: true, skipEmptyLines: true }).data;
}

// Convert a .docx on disk to HTML, with headings & bold preserved
async function convertDocxToHtml(filePath: string): Promise<string> {
  // read as Buffer
  const fileBuffer = fs.readFileSync(filePath);
  // turn into ArrayBuffer view mammoth expects
  const arr = new Uint8Array(fileBuffer);
  // map built‐in Heading styles to real <h1>, <h2>,…
  const styleMap = [
    "p[style-name='Heading 1'] => h1:fresh",
    "p[style-name='Heading 2'] => h2:fresh",
    "p[style-name='Heading 3'] => h3:fresh",
  ];
  const { value: html } = await mammoth.convertToHtml({
    arrayBuffer: arr.buffer,
    styleMap,
  });
  return html;
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData();
  const item = data.find((d) => d.id === params.id);
  if (!item) return notFound();

  // Decide which HTML to render
  let htmlContent = item.content;
  if (item.github_path.toLowerCase().endsWith(".docx")) {
    const docxFullPath = path.join(process.cwd(), "public", item.github_path);
    htmlContent = await convertDocxToHtml(docxFullPath);
  }

  const tags = item.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <a href="/explore" className="underline text-blue-600 mb-4 block">
        ← Back to all Knowledge Objects
      </a>
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
        <p className="italic text-gray-600 mb-4">
          Section: {item.section} • Level: {item.level}
        </p>
        <p className="mb-4 text-gray-800">{item.overview}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
