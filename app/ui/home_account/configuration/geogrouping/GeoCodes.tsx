import React from 'react';

interface GeoCodesProps {
  selectedGroup: string | null;
  selectedSubGroup: string | null;
  geoCodes: { [key: string]: { [key: string]: string } };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleGeoCodeChange: (code: string, subGroup: string) => void;
}

const GeoCodes: React.FC<GeoCodesProps> = ({
  selectedGroup,
  selectedSubGroup,
  geoCodes,
  searchQuery,
  setSearchQuery,
  handleGeoCodeChange,
}) => {
  if (!selectedGroup || !selectedSubGroup) return null;

  const filteredGeoCodes = Object.keys(geoCodes[selectedGroup] || {}).filter((code) =>
    code.includes(searchQuery)
  );

  const getNotAllocatedCodes = () => {
    return Object.keys(geoCodes[selectedGroup] || {}).filter(
      (code) => geoCodes[selectedGroup][code] === 'Not Allocated'
    );
  };

  const uniqueNotAllocatedCodes = Array.from(new Set(getNotAllocatedCodes()));

  return (
    <div className="bg-white p-4 rounded-t-lg shadow-md flex-1">
      <h2 className="text-2xl font-semibold mb-4">Geo Codes</h2>
      <input
        type="text"
        placeholder="Search geo codes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-full w-full"
      />
      {selectedSubGroup === 'Not Allocated' ? (
        <ul className="space-y-2">
          {uniqueNotAllocatedCodes.map((code) => (
            <li key={code} className="p-2 rounded bg-gray-100">
              {code}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {filteredGeoCodes.map((code) => {
            const isAllocatedToOtherSubGroup =
              selectedGroup &&
              selectedSubGroup &&
              geoCodes[selectedGroup][code] !== 'Not Allocated' &&
              geoCodes[selectedGroup][code] !== selectedSubGroup;

            return (
              <li
                key={code}
                className={`p-2 rounded ${
                  isAllocatedToOtherSubGroup ? 'bg-gray-300' : 'bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={
                    selectedGroup !== null &&
                    geoCodes[selectedGroup][code] === selectedSubGroup
                  }
                  onChange={() =>
                    handleGeoCodeChange(
                      code,
                      selectedGroup &&
                        geoCodes[selectedGroup][code] === selectedSubGroup
                        ? 'Not Allocated'
                        : selectedSubGroup || 'Not Allocated'
                    )
                  }
                  disabled={selectedSubGroup === 'Not Allocated'}
                />
                {code}
                {isAllocatedToOtherSubGroup && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({geoCodes[selectedGroup][code]})
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GeoCodes;