import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reportId } = req.query;

  try {
    const result = await sql`
      SELECT status, file_path FROM reports WHERE reportid = ${String(reportId)}
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const { status, file_path } = result.rows[0];
    res.status(200).json({ status, filePath: file_path });
  } catch (error) {
    res.status(500).json({ error: 'Error checking report status' });
  }
}