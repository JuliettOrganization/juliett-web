import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const { reportData } = await request.json();
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const useremail = session.user.email;
    if (reportData.reportid) {
      // Check the status of the report in the database
      const result = await sql`
        SELECT status FROM reports WHERE reportid = ${reportData.reportid}
      `;

      const reportStatus = result.rows[0]?.status;

      if (reportStatus === "draft") {
        // Update existing report
        const updateQuery = `
          UPDATE reports
          SET
          status='draft',
          reportname = $1,
          description = $2,
          tags = $3,
          updated = NOW(),
          od_concept = $4,
          od_filtering = $5,
          amounts = $6,
          benchmark_date_from = $7,
          benchmark_date_to = $8,
          benchmark_period = $9,
          currency = $10,
          date_concept = $11,
          date_from = $12,
          date_to = $13,
          fields = $14,
          is_custom_sql_active = $15,
          selected_grouping_agency = $16,
          selected_grouping_geo_from = $17,
          selected_grouping_geo_to = $18,
          selected_grouping_issuing = $19,
          selected_grouping_marketing = $20,
          selected_grouping_operating = $21,
          selected_grouping_values_agency = $22,
          selected_grouping_values_geo_from = $23,
          selected_grouping_values_geo_to = $24,
          selected_grouping_values_issuing = $25,
          selected_grouping_values_marketing = $26,
          selected_grouping_values_operating = $27,
          sql_code = $28
        WHERE reportid = $29
      `;
        const updateValues = [
          reportData.reportName,
          reportData.description,
          reportData.tags.map((tag: { text: string }) => tag.text).join(";"),
          reportData.ODconcept,
          reportData.ODfiltering,
          reportData.amounts,
          reportData.benchmarkDateFrom,
          reportData.benchmarkDateTo,
          reportData.benchmarkPeriod,
          reportData.currency,
          reportData.dateConcept,
          reportData.dateFrom,
          reportData.dateTo,
          reportData.fields,
          reportData.isCustomSqlActive,
          reportData.selectedGroupingAgency,
          reportData.selectedGroupingGeoFrom,
          reportData.selectedGroupingGeoTo,
          reportData.selectedGroupingIssuing,
          reportData.selectedGroupingMarketing,
          reportData.selectedGroupingOperating,
          reportData.selectedGroupingValuesAgency,
          reportData.selectedGroupingValuesGeoFrom,
          reportData.selectedGroupingValuesGeoTo,
          reportData.selectedGroupingValuesIssuing,
          reportData.selectedGroupingValuesMarketing,
          reportData.selectedGroupingValuesOperating,
          reportData.sqlCode,
          reportData.reportid,
        ];
        await sql.query(updateQuery, updateValues);
      } else {
        const newReportId = uuidv4();

        // Ensure the reportid does not already exist
        const checkReportIdQuery = "SELECT 1 FROM reports WHERE reportid = $1";
        const checkReportIdResult = await sql.query(checkReportIdQuery, [
          newReportId,
        ]);
        if (checkReportIdResult.rows.length > 0) {
          throw new Error("Report ID already exists");
        }

        const insertQuery = `
      INSERT INTO reports (
       reportid,useremail,reportname,status, tags, updated, description,od_concept, 
        od_filtering, amounts, benchmark_date_from, benchmark_date_to, 
        benchmark_period, currency, date_concept, date_from, date_to, 
        fields, is_custom_sql_active, selected_grouping_agency, 
        selected_grouping_geo_from, selected_grouping_geo_to, 
        selected_grouping_issuing, selected_grouping_marketing, 
        selected_grouping_operating, selected_grouping_values_agency, 
        selected_grouping_values_geo_from, selected_grouping_values_geo_to, 
        selected_grouping_values_issuing, selected_grouping_values_marketing, 
        selected_grouping_values_operating, sql_code, transaction_type, accountid
      ) VALUES (
       $1,$2,$3,$4,$5,NOW(),$6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
        $16, $17, $18, $19, $20,$21, $22, $23, $24, $25, $26, $27, $28, $29, $30,$31,$32,$33
      )
   
    `;

        const insertValues = [
          newReportId,
          useremail,
          reportData.reportName,
          "draft",
          reportData.tags.map((tag: { text: string }) => tag.text).join(";"),
          reportData.description,
          reportData.ODconcept,
          reportData.ODfiltering,
          reportData.amounts,
          reportData.benchmarkDateFrom,
          reportData.benchmarkDateTo,
          reportData.benchmarkPeriod,
          reportData.currency,
          reportData.dateConcept,
          reportData.dateFrom,
          reportData.dateTo,
          reportData.fields,
          reportData.isCustomSqlActive,
          reportData.selectedGroupingAgency,
          reportData.selectedGroupingGeoFrom,
          reportData.selectedGroupingGeoTo,
          reportData.selectedGroupingIssuing,
          reportData.selectedGroupingMarketing,
          reportData.selectedGroupingOperating,
          reportData.selectedGroupingValuesAgency,
          reportData.selectedGroupingValuesGeoFrom,
          reportData.selectedGroupingValuesGeoTo,
          reportData.selectedGroupingValuesIssuing,
          reportData.selectedGroupingValuesMarketing,
          reportData.selectedGroupingValuesOperating,
          reportData.sqlCode,
          reportData.transactionType,
          reportData.accountid,
        ];

        await sql.query(insertQuery, insertValues);
      }
    } else {
      // Insert new report
      const newReportId = uuidv4();

      // Ensure the reportid does not already exist
      const checkReportIdQuery = "SELECT 1 FROM reports WHERE reportid = $1";
      const checkReportIdResult = await sql.query(checkReportIdQuery, [
        newReportId,
      ]);
      if (checkReportIdResult.rows.length > 0) {
        throw new Error("Report ID already exists");
      }

      const insertQuery = `
      INSERT INTO reports (
       reportid,useremail,reportname,status, tags, updated, description,od_concept, 
        od_filtering, amounts, benchmark_date_from, benchmark_date_to, 
        benchmark_period, currency, date_concept, date_from, date_to, 
        fields, is_custom_sql_active, selected_grouping_agency, 
        selected_grouping_geo_from, selected_grouping_geo_to, 
        selected_grouping_issuing, selected_grouping_marketing, 
        selected_grouping_operating, selected_grouping_values_agency, 
        selected_grouping_values_geo_from, selected_grouping_values_geo_to, 
        selected_grouping_values_issuing, selected_grouping_values_marketing, 
        selected_grouping_values_operating, sql_code, transaction_type, accountid
      ) VALUES (
       $1,$2,$3,$4,$5,NOW(),$6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
        $16, $17, $18, $19, $20,$21, $22, $23, $24, $25, $26, $27, $28, $29, $30,$31,$32,$33
      )
   
    `;

      const insertValues = [
        newReportId,
        useremail,
        reportData.reportName,
        "draft",
        reportData.tags.map((tag: { text: string }) => tag.text).join(";"),
        reportData.description,
        reportData.ODconcept,
        reportData.ODfiltering,
        reportData.amounts,
        reportData.benchmarkDateFrom,
        reportData.benchmarkDateTo,
        reportData.benchmarkPeriod,
        reportData.currency,
        reportData.dateConcept,
        reportData.dateFrom,
        reportData.dateTo,
        reportData.fields,
        reportData.isCustomSqlActive,
        reportData.selectedGroupingAgency,
        reportData.selectedGroupingGeoFrom,
        reportData.selectedGroupingGeoTo,
        reportData.selectedGroupingIssuing,
        reportData.selectedGroupingMarketing,
        reportData.selectedGroupingOperating,
        reportData.selectedGroupingValuesAgency,
        reportData.selectedGroupingValuesGeoFrom,
        reportData.selectedGroupingValuesGeoTo,
        reportData.selectedGroupingValuesIssuing,
        reportData.selectedGroupingValuesMarketing,
        reportData.selectedGroupingValuesOperating,
        reportData.sqlCode,
        reportData.transactionType,
        reportData.accountid,
      ];

      await sql.query(insertQuery, insertValues);
    }
    return NextResponse.json(
      { message: "Report saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 },
    );
  }
}
