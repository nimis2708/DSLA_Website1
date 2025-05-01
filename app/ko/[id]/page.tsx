import React, { useState, useEffect } from 'react';

const KnowledgeObjects = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  // Mock fetch call (you can replace this with a real API)
  useEffect(() => {
    const fetchTiles = async () => {
      // Simulate async fetch
      const mockData = [
        {
          id: 1,
          title: 'Knowledge Object A',
          description: 'This is a short description for Object A.',
          tags: ['AI', 'ML'],
        },
        {
          id: 2,
          title: 'Knowledge Object B',
          description: 'This is a short description for Object B.',
          tags: ['Data', 'Analytics'],
        },
        {
          id: 3,
          title: 'Knowledge Object C',
          description: 'This is a short description for Object C.',
          tags: ['Cloud', 'Security'],
        },
      ];
      setTiles(mockData);
    };

    fetchTiles();
  }, []);

  // Detail view
  if (selectedTile) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedTile(null)}
          className="text-blue-600 underline mb-4 inline-block"
        >
          ← Back to all objects
        </button>

        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-2">{selectedTile.title}</h2>
          <p className="text-gray-700 mb-4">{selectedTile.description}</p>
          <div className="flex flex-wrap gap-2">
            {selectedTile.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          onClick={() => setSelectedTile(tile)}
          className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{tile.title}</h3>
          <p className="text-gray-600">{tile.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KnowledgeObjects;
