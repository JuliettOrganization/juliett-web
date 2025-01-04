interface CollectReportDataParams {
    currency: string;
    fields: string[];
    // Add other necessary parameters here
  }
  
  export const collectReportData = ({
    currency,
    fields,
    // Add other necessary parameters here
  }: CollectReportDataParams) => {
    const reportData = {
      currency,
      fields,
      // Add other necessary data here
    };
  
    return reportData;
  };