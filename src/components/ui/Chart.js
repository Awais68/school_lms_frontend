import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ type = 'bar', data, options = {}, className = '' }) => {
  // Default data for demo purposes
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance Rate',
        data: [85, 92, 88, 95, 90, 93],
        backgroundColor: type === 'bar' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 1)',
        borderColor: type === 'line' ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 1)',
        borderWidth: type === 'line' ? 2 : 1,
        tension: type === 'line' ? 0.4 : undefined,
      },
    ],
  };

  // Default options
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart Title',
      },
    },
    scales: type === 'bar' ? {
      y: {
        beginAtZero: true,
        max: 100,
      },
    } : {},
  };

  const chartData = data || defaultData;
  const chartOptions = { ...defaultOptions, ...options };

  if (type === 'line') {
    return <Line data={chartData} options={chartOptions} className={className} />;
  }

  return <Bar data={chartData} options={chartOptions} className={className} />;
};

export default Chart;