import { NextResponse } from 'next/server';

export async function GET() {
   
   
  // Hardcoded chart data for demonstration purposes
const chartData = {

    kpiDataGrossAmount: {value: '1,000,000', yoy: '+10%' },
    kpiDataCouponCount: { value: '600', yoy: '+5%' },
    kpiDataTicketCount: { value: '450', yoy: '+7%' },
    kpiDataAverageFare: { value: '2,222', yoy: '-3%' },
 
    dailyGrossAmount: {
        labels: Array.from({ length: 365 }, (_, i) => new Date(2023, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
            {
                label: 'Gross Amount',
                data: Array.from({ length: 365 }, () => Math.floor(Math.random() * 1000)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    },
    weeklyGrossAmount: {
        labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
        datasets: [
            {
                label: 'Gross Amount',
                data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 1000)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    },
    monthlyGrossAmount: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Gross Amount',
                data: [120, 190, 300, 500, 200, 300, 400, 500, 600, 700, 800, 900],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    },

    dailyCouponCount: {
        labels: Array.from({ length: 365 }, (_, i) => new Date(2023, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
            {
                label: 'Coupon Count',
                data: Array.from({ length: 365 }, () => Math.floor(Math.random() * 100)),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    },
    weeklyCouponCount: {
        labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
        datasets: [
            {
                label: 'Coupon Count',
                data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 100)),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    },
    monthlyCouponCount: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Coupon Count',
                data: [12, 19, 30, 50, 20, 30, 40, 50, 60, 70, 80, 90],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    },

    dailyTicketCount: {
        labels: Array.from({ length: 365 }, (_, i) => new Date(2023, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
            {
                label: 'Ticket Count',
                data: Array.from({ length: 365 }, () => Math.floor(Math.random() * 100)),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    },
    weeklyTicketCount: {
        labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
        datasets: [
            {
                label: 'Ticket Count',
                data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 100)),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    },
    monthlyTicketCount: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Ticket Count',
                data: [12, 19, 30, 50, 20, 30, 40, 50, 60, 70, 80, 90],
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    },

    dailyAverageFare: {
        labels: Array.from({ length: 365 }, (_, i) => new Date(2023, 0, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [
            {
                label: 'Average Fare',
                data: Array.from({ length: 365 }, () => Math.floor(Math.random() * 1000)),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    },
    weeklyAverageFare: {
        labels: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
        datasets: [
            {
                label: 'Average Fare',
                data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 1000)),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    },
    monthlyAverageFare: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Average Fare',
                data: [120, 190, 300, 500, 200, 300, 400, 500, 600, 700, 800, 900],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    },

    AirlineDataGrossAmount: {
        labels: ['Air France', 'Lufthansa', 'Emirates', 'British Airways', 'American Airlines', 'Iberia', 'Qatar Airways', 'Turkish Airlines', 'Delta Airlines', 'United Airlines'],
        datasets: [
            {
                label: 'Gross Amount',
                data: [300, 500, 200, 80, 55, 30, 22, 15, 5, 1],
    backgroundColor: [
        'rgba(23, 87, 235, 0.2)', 
        'rgba(85, 192, 192, 0.2)', 
        'rgba(34, 200, 78, 0.2)', 
        'rgba(56, 159, 64, 0.4)', 
        'rgba(75, 192, 80, 0.2)', 
        'rgba(50, 206, 86, 0.4)',
        'rgba(50, 100, 44, 0.2)',
        'rgba(89, 20, 86, 0.2)',
        'rgba(250, 240, 30, 0.4)',
        'rgba(10, 22, 86, 0.2)',
    ],
            },
        ],
    },
    ClassDataGrossAmount: {
        labels: ['Business', 'Premium', 'Economy', 'Others'],
        datasets: [
            {
                label: 'Gross Amount',
                data: [300, 500, 200, 20],
                backgroundColor: ['rgba(54, 162, 235, 0.4)', 
                    'rgba(85, 192, 192, 0.2)', 
                    'rgba(34, 120, 255, 0.2)', 
                    'rgba(100, 159, 64, 0.4)', 
                    'rgba(75, 192, 75, 0.2)', 
                    'rgba(50, 206, 86, 0.2)'],
            },
        ],
    },
    AgencyDataGrossAmount: {
        labels: ['Agency A', 'Agency B', 'Agency C'],
        datasets: [
            {
                label: 'Gross Amount',
                data: [400, 300, 500],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
        ],
    },

    AirlineDataCouponCount: {
        labels: ['Airline A', 'Airline B', 'Airline C'],
        datasets: [
            {
                label: 'Coupon Count',
                data: [300, 500, 200],
                backgroundColor: ['#36A2EB', '#36A2EB', '#36A2EB'],
            },
        ],
    },
    ClassDataCouponCount: {
        labels: ['Business', 'Premium', 'Economy', 'Others'],
        datasets: [
            {
                label: 'Coupon Count',
                data: [300, 500, 200, 20],
                backgroundColor: ['rgba(54, 162, 235, 0.4)', 
                    'rgba(85, 192, 192, 0.2)', 
                    'rgba(34, 120, 255, 0.2)', 
                    'rgba(100, 159, 64, 0.4)', 
                    'rgba(75, 192, 75, 0.2)', 
                    'rgba(50, 206, 86, 0.2)'],
            },
        ],
    },
    AgencyDataCouponCount: {
        labels: ['Agency A', 'Agency B', 'Agency C'],
        datasets: [
            {
                label: 'Coupon Count',
                data: [400, 300, 500],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 1,
            },
        ],
    },
   
    AirlineDataTicketCount: {
        labels: ['Airline A', 'Airline B', 'Airline C'],
        datasets: [
            {
                label: 'Ticket Count',
                data: [300, 500, 200],
                backgroundColor: ['#FFCE56', '#FFCE56', '#FFCE56'],
            },
        ],
    },
    ClassDataTicketCount: {
        labels: ['Business', 'Premium', 'Economy', 'Others'],
        datasets: [
            {
                label: 'Ticket Count',
                data: [300, 500, 200, 20],
                backgroundColor: ['rgba(54, 162, 235, 0.4)', 
                    'rgba(85, 192, 192, 0.2)', 
                    'rgba(34, 120, 255, 0.2)', 
                    'rgba(100, 159, 64, 0.4)', 
                    'rgba(75, 192, 75, 0.2)', 
                    'rgba(50, 206, 86, 0.2)'],
            },
        ],
    },
    AgencyDataTicketCount: {
        labels: ['Agency A', 'Agency B', 'Agency C'],
        datasets: [
            {
                label: 'Ticket Count',
                data: [400, 300, 500],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 0.2)',
                borderWidth: 1,
            },
        ],
    },
  
    AirlineDataAverageFare: {
        labels: ['Airline A', 'Airline B', 'Airline C'],
        datasets: [
            {
                label: 'Average Fare',
                data: [300, 500, 200],
                backgroundColor: ['#4BC0C0', '#4BC0C0', '#4BC0C0'],
            },
        ],
    },
    ClassDataAverageFare: {
        labels: ['Business', 'Premium', 'Economy', 'Others'],
        datasets: [
            {
                label: 'Average Fare',
                data: [300, 500, 200, 20],
                backgroundColor: ['rgba(54, 162, 235, 0.4)', 
                'rgba(85, 192, 192, 0.2)', 
                'rgba(34, 120, 255, 0.2)', 
                'rgba(100, 159, 64, 0.4)', 
                'rgba(75, 192, 75, 0.2)', 
                'rgba(50, 206, 86, 0.2)']
            },
        ],
    },
    AgencyDataAverageFare: {
        labels: ['Agency A', 'Agency B', 'Agency C'],
        datasets: [
            {
                label: 'Average Fare',
                data: [400, 300, 500],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1,
            },
        ],
    },
};

  return NextResponse.json(chartData);
}