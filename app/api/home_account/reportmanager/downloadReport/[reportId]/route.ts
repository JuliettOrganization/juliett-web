
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(req: NextRequest) {
    const urlParts = req.nextUrl.pathname.split('/');
    const reportId = urlParts[urlParts.length - 1];

    const reportsDir = path.join(process.cwd(), 'public', 'reports');
    try {
        const files = await fs.readdir(reportsDir);
        const fileName = reportId ? files.find(file => file.includes(reportId)) : null;

        if (!fileName) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        const filePath = path.join(reportsDir, fileName);
        const file = await fs.readFile(filePath);
        const response = new NextResponse(file, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename=${fileName}`
            }
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
