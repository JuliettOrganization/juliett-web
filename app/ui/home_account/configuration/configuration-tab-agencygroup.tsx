// import React, { useState, useEffect } from 'react';
// import Select, { SingleValue } from 'react-select';
// import Modal from 'react-modal';

// // Set app element for accessibility
// Modal.setAppElement('#__next'); // Adjust to your root element ID

// const predefinedAgencies = [
//   'Agency 1', 'Agency 2', 'Agency 3', 'Agency 4', 'Agency 5'
// ];

// interface GroupingOption {
//   value: string;
//   label: string;
//   values: string[];
// }

// const initialGroupings: GroupingOption[] = [
//   { value: 'group-1', label: 'Group 1', values: ['Value 1', 'Value 2'] },
//   { value: 'group-2', label: 'Group 2', values: ['Value 3', 'Value 4'] },
// ];

// const AgencyGroup: React.FC = () => {
//   const [groupings, setGroupings] = useState<GroupingOption[]>(initialGroupings);
//   const [selectedGrouping, setSelectedGrouping] = useState<SingleValue<GroupingOption>>(null);
//   const [selectedValue, setSelectedValue] = useState<string | null>(null);
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [newGroupName, setNewGroupName] = useState('');
//   const [newGroupingValue, setNewGroupingValue] = useState('');
//   const [valueModalIsOpen, setValueModalIsOpen] = useState(false);
//   const [agencyModalIsOpen, setAgencyModalIsOpen] = useState(false);
//   const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);

//   useEffect(() => {
//     setGroupings(initialGroupings); // Ensure state is set client-side
//   }, []);

//   const handleGroupingChange = (selectedOption: SingleValue<GroupingOption>) => {
//     setSelectedGrouping(selectedOption);
//     setSelectedValue(null); // Reset the selected value when grouping changes
//   };

//   const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedValue(event.target.value);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const addNewGrouping = () => {
//     const newGrouping: GroupingOption = { value: newGroupName.toLowerCase().replace(/\s+/g, '-'), label: newGroupName, values: [] };
//     setGroupings([...groupings, newGrouping]);
//     setNewGroupName('');
//     closeModal();
//   };

//   const openValueModal = () => {
//     setValueModalIsOpen(true);
//   };

//   const closeValueModal = () => {
//     setValueModalIsOpen(false);
//   };

//   const addNewGroupingValue = () => {
//     if (selectedGrouping) {
//       const updatedGroupings = groupings.map((grouping) =>
//         grouping.value === selectedGrouping.value
//           ? { ...grouping, values: [...grouping.values, newGroupingValue] }
//           : grouping
//       );
//       setGroupings(updatedGroupings);
//       setNewGroupingValue('');
//       closeValueModal();
//     }
//   };

//   const openAgencyModal = () => {
//     setAgencyModalIsOpen(true);
//   };

//   const closeAgencyModal = () => {
//     setAgencyModalIsOpen(false);
//   };

//   const handleAgencyCheckboxChange = (agency: string) => {
//     setSelectedAgencies((prevSelectedAgencies) =>
//       prevSelectedAgencies.includes(agency)
//         ? prevSelectedAgencies.filter((a) => a !== agency)
//         : [...prevSelectedAgencies, agency]
//     );
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <label className="block mb-2 text-sm font-medium">Select Grouping Name</label>
//         <div className="flex items-center space-x-2">
//           <Select
//             options={groupings}
//             value={selectedGrouping}
//             onChange={handleGroupingChange}
//             className="w-1/2"
//             placeholder="Select Grouping Name"
//           />
//           <button onClick={openModal} className="px-4 py-2 bg-purple-500 text-white rounded-md">New Grouping</button>
//         </div>
//       </div>

//       {selectedGrouping && (
//         <div className="mb-4">
//           <label className="block mb-2 text-sm font-medium">Select Grouping Value</label>
//           <div className="flex items-center space-x-2">
//             <select value={selectedValue || ''} onChange={handleValueChange} className="w-1/2 p-2 border rounded-md">
//               <option value="" disabled>Select a value</option>
//               {selectedGrouping.values.map((value) => (
//                 <option key={value} value={value}>{value}</option>
//               ))}
//             </select>
//             <button onClick={openValueModal} className="px-4 py-2 bg-purple-500 text-white rounded-md">New Value</button>
//           </div>
//         </div>
//       )}

//       {selectedValue && (
//         <div className="mb-4">
//           <label className="block mb-2 text-sm font-medium">Sub-values (Agencies)</label>
//           <ul className="mb-4">
//             {selectedAgencies.map((agency) => (
//               <li key={agency} className="p-2 border-b">{agency}</li>
//             ))}
//           </ul>
//           <button onClick={openAgencyModal} className="px-4 py-2 bg-purple-500 text-white rounded-md">Add New Agency</button>
//         </div>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Add New Grouping"
//         className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto mt-20"
//       >
//         <h2 className="text-xl font-bold mb-4">Add New Grouping</h2>
//         <input
//           type="text"
//           value={newGroupName}
//           onChange={(e) => setNewGroupName(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-md"
//           placeholder="Enter grouping name"
//         />
//         <button onClick={addNewGrouping} className="px-4 py-2 bg-purple-500 text-white rounded-md">Save</button>
//       </Modal>

//       <Modal
//         isOpen={valueModalIsOpen}
//         onRequestClose={closeValueModal}
//         contentLabel="Add New Grouping Value"
//         className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto mt-20"
//       >
//         <h2 className="text-xl font-bold mb-4">Add New Grouping Value</h2>
//         <input
//           type="text"
//           value={newGroupingValue}
//           onChange={(e) => setNewGroupingValue(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-md"
//           placeholder="Enter grouping value"
//         />
//         <button onClick={addNewGroupingValue} className="px-4 py-2 bg-purple-500 text-white rounded-md">Save</button>
//       </Modal>

//       <Modal
//         isOpen={agencyModalIsOpen}
//         onRequestClose={closeAgencyModal}
//         contentLabel="Add New Agency"
//         className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto mt-20"
//         appElement={document.getElementById('__next') || undefined}
//       >
//         <h2 className="text-xl font-bold mb-4">Add New Agency</h2>
//         <ul className="mb-4">
//           {predefinedAgencies.map((agency) => (
//             <li key={agency} className="p-2 border-b">
//               <input
//                 type="checkbox"
//                 checked={selectedAgencies.includes(agency)}
//                 onChange={() => handleAgencyCheckboxChange(agency)}
//                 className="mr-2"
//               />
//               {agency}
//             </li>
//           ))}
//         </ul>
//         <button onClick={closeAgencyModal} className="px-4 py-2 bg-purple-500 text-white rounded-md">Done</button>
//       </Modal>
//     </div>
//   );
// };

// export default AgencyGroup;
