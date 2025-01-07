import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
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
    <div className="grid grid-cols-5 gap-0 bg-transparent focus:outline-none">
      <input
        type="text"
        id="tag-input"
        className="col-span-4 md:col-span-1 rounded bg-transparent h-9 pl-1 mr-0 pr-0 text-sm border-none focus:outline-none"
        placeholder="Type and Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="col-span-4 md:col-span-4 flex flex-wrap space-x-2 bg-white p-1 items-center">
        {tags.map((tag, index) => (
          <span key={index} className={`${tag.color} text-white rounded-full border border-white px-2 py-1 text-sm flex items-center`}>
            {tag.text}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-white hover:text-gray-300 focus:outline-none"
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
