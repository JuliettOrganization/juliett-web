import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { reportData, reportId } = await request.json();

    // Trigger the long-running task in the background
    processReport(reportData, reportId);

    // Immediately respond to the client
    return NextResponse.json({ message: 'Report generation started' }, { status: 202 });
  } catch (error) {
    console.error('Error starting report generation:', error);
    return NextResponse.json({ error: 'Failed to start report generation' }, { status: 500 });
  }
}

async function processReport(reportData: any, reportId: string) {
  try {
    // Delay execution for 5 seconds
      await new Promise(resolve => setTimeout(resolve, 20000));

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Add header with product name
    worksheet.mergeCells('A1', 'B1');
    const headerRow = worksheet.getCell('A1');
    headerRow.value = 'JULIETT';
    headerRow.font = { size: 16, bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Function to parse and join values
    const parseAndJoin = (value: string | null) => {
      if (!value) return '';
      try {
        const parsed = typeof value === 'string' ? JSON.parse(value.replace(/""/g, '"')) : value;
        return Array.isArray(parsed) ? parsed.join(', ') : '';
      } catch (error) {
        console.error('Error parsing value:', error);
        return '';
      }
    };

    // Add report data with nice formatting
    worksheet.columns = [
      { header: 'Field', key: 'field', width: 30 },
      { header: 'Value', key: 'value', width: 30 },
    ];

    const reportRows = [
      { field: 'Report Name', value: reportData.reportName },
      { field: 'Description', value: reportData.description },
      { field: 'Tags', value: reportData.tags ? reportData.tags.map((tag: { text: string }) => tag.text).join('; ') : '' },
      { field: 'Date Concept', value: reportData.dateConcept },
      { field: 'Date From', value: reportData.dateFrom },
      { field: 'Date To', value: reportData.dateTo },
      { field: 'Benchmark Period', value: reportData.benchmarkPeriod },
      { field: 'Benchmark Date From', value: reportData.benchmarkDateFrom },
      { field: 'Benchmark Date To', value: reportData.benchmarkDateTo },
      { field: 'Currency', value: reportData.currency },
      { field: 'Fields', value: reportData.fields ? reportData.fields.join(', ') : '' },
      { field: 'Transaction Type', value: reportData.transactionType },
      { field: 'Amounts', value: reportData.amounts ? reportData.amounts.join(', ') : '' },
      { field: 'Selected Grouping Values Agency', value: parseAndJoin(reportData.selectedGroupingValuesAgency) },
      { field: 'Selected Grouping Agency', value: parseAndJoin(reportData.selectedGroupingAgency) },
      { field: 'Selected Grouping Values Issuing', value: parseAndJoin(reportData.selectedGroupingValuesIssuing) },
      { field: 'Selected Grouping Issuing', value: parseAndJoin(reportData.selectedGroupingIssuing) },
      { field: 'Selected Grouping Values Marketing', value: parseAndJoin(reportData.selectedGroupingValuesMarketing) },
      { field: 'Selected Grouping Marketing', value: parseAndJoin(reportData.selectedGroupingMarketing) },
      { field: 'Selected Grouping Values Operating', value: parseAndJoin(reportData.selectedGroupingValuesOperating) },
      { field: 'Selected Grouping Operating', value: parseAndJoin(reportData.selectedGroupingOperating) },
      { field: 'Selected Grouping Values Geo From', value: parseAndJoin(reportData.selectedGroupingValuesGeoFrom) },
      { field: 'Selected Grouping Geo From', value: parseAndJoin(reportData.selectedGroupingGeoFrom) },
      { field: 'Selected Grouping Values Geo To', value: parseAndJoin(reportData.selectedGroupingValuesGeoTo) },
      { field: 'Selected Grouping Geo To', value: parseAndJoin(reportData.selectedGroupingGeoTo) },
      { field: 'OD Concept', value: reportData.ODconcept },
      { field: 'OD Filtering', value: reportData.ODfiltering },
      { field: 'SQL Code', value: reportData.sqlCode },
      { field: 'Is SQL Active', value: reportData.isCustomSqlActive ? 'Yes' : 'No' }
      
    ];

    worksheet.addRows(reportRows);

    // Define the file path with naming convention
    const now = new Date();
    const formattedDate = now.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, '_').replace(/-/g, '_');
    const fileName = `${formattedDate} - ${reportData.reportName} - ${reportId} - JULIETT.xlsx`;
    const filePath = path.join(process.cwd(), 'public', 'reports', fileName);

    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write the workbook to the file
    await workbook.xlsx.writeFile(filePath);
    await sql`
           UPDATE reports
           SET status = 'result'
         WHERE reportid = ${reportId}
         `;
    console.log(`Report generated: ${filePath}`);
  } catch (error) {
    console.error('Error generating report:', error);
  }
}