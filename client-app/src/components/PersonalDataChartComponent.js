import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; // Import axios for making HTTP requests
import "../styles/PersonalDataChartComponent.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const PersonalDataChart = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [monthlyData, setMonthlyData] = useState({});

    useEffect(() => {
        fetchPersonalData(selectedMonth);
    }, [selectedMonth]);

    const fetchPersonalData = async (month) => {
        try {
            const response = await axios.get(`http://localhost:5000/personal_data/${month}`);
            setMonthlyData(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching personal data:', error);
        }
    };

    const getPastThreeMonths = (currentDate) => {
        const months = [];
        for (let i = 1; i <= 3; i++) {
            const pastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push(pastMonth.toLocaleString('default', { month: 'long' }));
        }
        return months;
    };

    const pastThreeMonths = getPastThreeMonths(currentDate);
    const months = [currentMonth, ...pastThreeMonths];

    const { totalBudget, totalSpent, expenseData } = monthlyData;

    const pieChartData = {
        labels: expenseData ? expenseData.map((expense) => expense.category) : [],
        datasets: [
            {
                data: expenseData ? expenseData.map((expense) => expense.amount) : [],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8E44AD',
                    '#2ECC71',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8E44AD',
                    '#2ECC71',
                ],
            },
        ],
    };

    const pieChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    };

    return (
        <div className="personal-data-container">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3 ">
                        <select
                            className="form-select"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <br/>
                        <h4 className="amount-h4"> Spent Amount: {totalSpent}</h4>
                        <br/>
                        <h4 className="amount-h4">Total Budget: {totalBudget}</h4>
                    </div>
                </div>
                <div className="col-md-6 chart-data-col">
                    <div className="chart-container">
                        <Pie data={pieChartData} options={pieChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDataChart;
