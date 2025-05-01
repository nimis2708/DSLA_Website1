import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { notFound } from "next/navigation";
import mammoth from "mammoth";

// Structure of each tile
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

// Helper to load CSV and parse
async function getData(): Promise<KnowledgeObject[]> {
  const filePath = path.join(process.cwd(), "public", "knowledge_objects.csv");
  const file = fs.readFileSync(filePath, "utf8");
  const result = Papa.parse<KnowledgeObject>(file, {
    header: true,
    skipEmptyLines: true,
  });
  return result.data;
}

// Helper to load and convert .docx to HTML
async function convertDocxToHtml(filePath: string): Promise<string> {
  const arrayBuffer = fs.readFileSync(filePath);
  const { value } = await mammoth.convertToHtml({ arrayBuffer });
  return value;
}

// This is your page for individual tile view
export default async function KnowledgeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData();
  const item = data.find((d) => d.id === params.id);

  if (!item) return notFound();

  // Load .docx if specified in the content
  let contentHtml = item.content;
  if (item.github_path.endsWith(".docx")) {
    const docxPath = path.join(process.cwd(), "public", item.github_path);
    contentHtml = await convertDocxToHtml(docxPath);
  }

  const tags = item.tags.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
        <p className="text-gray-600 italic mb-4">
          Section: {item.section} • Level: {item.level}
        </p>

        <p className="text-gray-800 mb-4">{item.overview}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="prose prose-sm sm:prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
