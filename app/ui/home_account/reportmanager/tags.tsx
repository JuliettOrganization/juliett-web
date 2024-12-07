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
  return (
    <div className="inline-flex space-x-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
            getRandomColor()
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
