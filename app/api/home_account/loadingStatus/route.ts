import { NextRequest, NextResponse } from 'next/server';

const generateDays = (year: number, month: number, endDay: number) => {
    const days = [];
    for (let day = 1; day <= endDay; day++) {
        days.push(day);
    }
    return days;
};

// Generate months and days for a given year range
const generateYearData = (startYear: number, endYear: number, endMonth: number, endDay: number) => {
    const yearData: any = {};
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    for (let year = startYear; year <= endYear; year++) {
        yearData[year] = { months: {} };
        for (let month = 1; month <= 12; month++) {
            if (year === endYear && month > endMonth) break;
            const daysInMonth = new Date(year, month, 0).getDate();
            yearData[year].months[monthNames[month - 1]] = generateDays(year, month, (year === endYear && month === endMonth) ? endDay : daysInMonth);
        }
    }
    return yearData;
};

// Mock data for demonstration purposes
const countriesData = [
    {
        country: 'USA',
        years: generateYearData(2023, 2025, 3, 10),
    },
    {
        country: 'Canada',
        years: generateYearData(2023, 2025, 3, 10),
    },
    {
        country: 'Mexico',
        years: generateYearData(2023, 2025, 3, 10),
    },
    {
        country: 'France',
        years: generateYearData(2023, 2025, 3, 18),
    },
    {
        country: 'Germany',
        years: generateYearData(2023, 2025, 3, 18),
    },
];

const handler = (req: NextRequest) => {
    return NextResponse.json(countriesData);
};

export default handler;
export async function GET(req: NextRequest) {
    return NextResponse.json(countriesData);
}
