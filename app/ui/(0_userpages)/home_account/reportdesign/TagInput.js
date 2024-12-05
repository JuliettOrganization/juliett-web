import { useState } from 'react';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag) => {
    setTags([...tags, { text: tag, color: getRandomColor() }]);
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.find(tag => tag.text === trimmedValue)) {
        addTag(trimmedValue);
        setInputValue('');
      }
    }
  };

  const getRandomColor = () => {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-row space-x-2">
      <input
        type="text"
        id="tag-input"
        className="rounded bg-gray-200 p-2 text-sm border-none"
        placeholder="Type and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap space-x-2 space-y-2 items-end">
        {tags.map((tag, index) => (
          <span key={index} className={`${tag.color} text-white rounded-full p-1 text-sm flex items-start`}>
            {tag.text}
            <button
              type="button"
              className="ml-2 text-white"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
