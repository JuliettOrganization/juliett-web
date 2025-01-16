// import { useRouter } from 'next/navigation';

// export const useReportActions = () => {
//   const router = useRouter();

//   const handleSave = async (reportDataSave: any, setPopupMessage: (message: string | null) => void, setErrors: (errors: any) => void) => {
//     try {
//       const response = await fetch('/api/home_account/reportmanager/saveReport', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({reportDataSave}),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Report saved successfully:', result);
//         setPopupMessage('Report saved successfully');
//         setTimeout(() => {
//           setPopupMessage(null);
//         }, 2000); // Hide the popup after 2 seconds
//       } else {
//         const result = await response.json();
//         setErrors(result.errors);
//       }
//     } catch (error) {
//       console.error('Error saving report:', error);
//       setErrors({ general: ['An unexpected error occurred.'] });
//     }
//   };

//   const handleRun = async (reportDataRun: any, setPopupMessage: (message: string | null) => void, setErrors: (errors: any) => void) => {
//     setTimeout(() => {
//       setPopupMessage('Report Running');
//       setTimeout(() => {
//         setPopupMessage(null);
//         window.location.href = '/home_account/reportmanager';
//       }, 3000);
//     }, 2000); // Add a delay of 1 second before showing the popup

//     try {
//       const response = await fetch('/api/home_account/reportdesign/runReport', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ reportDataRun }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to run report');
//       }

//       const result = await response.json();
//       const { reportId } = result;

//       // Trigger the generateExcel API
//       const excelResponse = await fetch('/api/home_account/reportdesign/generateExcel', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ reportDataRun, reportId }),
//       });

//       if (!excelResponse.ok) {
//         throw new Error('Failed to generate Excel file');
//       }

//       const excelResult = await excelResponse.json();
//       console.log(excelResult.message);
//     } catch (error) {
//       console.error('Error running report:', error);
//       setErrors({ general: ['An unexpected error occurred.'] });
//     }
//   };

//   return {
//     handleSave,
//     handleRun,
//   };
// };