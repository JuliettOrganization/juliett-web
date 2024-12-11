import {  NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import path from 'path';
import fs from 'fs';

export default async function handler(res: NextApiResponse) {
  const session = await getSession();

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const filePath = path.resolve('./public/userguide.rtf');
  const fileBuffer = fs.readFileSync(filePath);

  res.setHeader('Content-Type', 'application/rtf');
  res.setHeader('Content-Disposition', 'attachment; filename=userguide.rtf');
  res.send(fileBuffer);
}