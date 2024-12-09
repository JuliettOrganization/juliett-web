import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const TextBoxSQL = () => {
  const [sqlCode, setSqlCode] = useState('');

  const handleChange = (event) => {
    setSqlCode(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <textarea
        className="w-full h-40 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your SQL code here..."
        value={sqlCode}
        onChange={handleChange}
      ></textarea>
      <div className="w-full max-w-2xl p-2 bg-white border border-gray-300 rounded-md">
        <SyntaxHighlighter language="sql" style={docco}>
          {sqlCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default TextBoxSQL;
