'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

// Function to generate a random color
const getRandomColor = () => {
  const colors = [
    'bg-red-500 text-white',
    'bg-blue-500 text-white',
    'bg-green-500 text-white',
    'bg-yellow-500 text-black',
    'bg-purple-500 text-white',
    'bg-pink-500 text-white',
    'bg-indigo-500 text-white',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function ReportTags({ tags }: { tags: string[] }) {
  const [tagColors, setTagColors] = useState<string[]>([]);

  useEffect(() => {
    // Generate colors for each tag only once
    const colors = tags.map(() => getRandomColor());
    setTagColors(colors);
  }, [tags]);

  return (
    <div className="inline-flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
            tagColors[index]
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
