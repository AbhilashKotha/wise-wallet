import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "../styles/PersonalDataChartComponent.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const monthlyData = {
    'April': {
      totalBudget: 5000,
      totalSpent: 2500,
      expenseData: [
        { category: 'Lifestyle', amount: 800 },
        { category: 'Food', amount: 600 },
        { category: 'Health', amount: 400 },
        { category: 'Groceries', amount: 500 },
        { category: 'Others', amount: 200 },
      ],
    },
    'March': {
      totalBudget: 4500,
      totalSpent: 2000,
      expenseData: [
        { category: 'Lifestyle', amount: 400 },
        { category: 'Food', amount: 300 },
        { category: 'Health', amount: 500 },
        { category: 'Groceries', amount: 700 },
        { category: 'Others', amount: 100 },
      ],
    },
    // Add data for other months as needed
  };

  const getPastThreeMonths = (currentDate) => {
    const months = [];
    for (let i = 1; i <= 3; i++) {
      const pastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(pastMonth.toLocaleString('default', { month: 'long' }));
    }
    return months;
  };

const PersonalDataChart = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const pastThreeMonths = getPastThreeMonths(currentDate);
    const pastQuarter = 'Sept-Dec';
  
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
    const months = [currentMonth, ...pastThreeMonths, pastQuarter];
  
    const { totalBudget, totalSpent, expenseData } = monthlyData[selectedMonth] || {};

  const pieChartData = {
    labels: expenseData.map((expense) => expense.category),
    datasets: [
      {
        data: expenseData.map((expense) => expense.amount),
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
            <h5>Total Budget: {totalBudget}</h5>
            <h5>Spent Amount: {totalSpent}</h5>
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