import clsx from 'clsx';

// Function to generate a color based on the tag
const getTagColor = (tag: string) => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-teal-100 text-teal-800',
    'bg-orange-100 text-orange-800',
    // Add more colors as needed
  ];

  // Simple hash function to ensure consistent color assignment
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
};

export default function AccountNames({ accountnames }: { accountnames: string | null }) {
  const tags = accountnames ? accountnames.split(';').map(tag => tag.trim()).filter(tag => tag !== '') : [];

  return (
    <div className="inline-flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
            getTagColor(tag)
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}