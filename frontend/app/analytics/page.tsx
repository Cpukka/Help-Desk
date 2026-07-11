'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/lib/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  TicketIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    closedTickets: 0,
    resolvedToday: 0,
  });

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    tickets: [12, 19, 15, 22, 18, 9, 7],
    resolved: [8, 14, 12, 18, 15, 7, 5],
  };

  const priorityData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [5, 18, 40, 37],
        backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
        borderWidth: 2,
        borderColor: ['#dc2626', '#ea580c', '#ca8a04', '#16a34a'],
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    tickets: [65, 72, 88, 95, 82, 110, 105, 98, 115, 120, 108, 130],
    resolved: [55, 60, 75, 82, 70, 95, 90, 85, 100, 105, 92, 115],
  };

  const statusData = {
    labels: ['Open', 'In Progress', 'Resolved', 'Closed'],
    datasets: [
      {
        data: [18, 35, 97, 97],
        backgroundColor: ['#3b82f6', '#eab308', '#22c55e', '#6b7280'],
        borderWidth: 2,
        borderColor: ['#2563eb', '#ca8a04', '#16a34a', '#4b5563'],
      },
    ],
  };

  const statsCards = [
    { 
      id: 1, 
      label: 'Total Tickets', 
      value: stats.totalTickets, 
      change: '+12%', 
      changeType: 'increase',
      icon: TicketIcon, 
      color: 'bg-blue-500' 
    },
    { 
      id: 2, 
      label: 'Open Tickets', 
      value: stats.openTickets, 
      change: '-3%', 
      changeType: 'decrease',
      icon: ClockIcon, 
      color: 'bg-yellow-500' 
    },
    { 
      id: 3, 
      label: 'Resolved Today', 
      value: stats.resolvedToday, 
      change: '+8%', 
      changeType: 'increase',
      icon: CheckCircleIcon, 
      color: 'bg-green-500' 
    },
    { 
      id: 4, 
      label: 'Critical Issues', 
      value: 5, 
      change: '+2%', 
      changeType: 'increase',
      icon: ExclamationTriangleIcon, 
      color: 'bg-red-500' 
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [router, timeRange]);

  const fetchData = async () => {
    try {
      const response = await apiClient.get('/tickets/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed Chart.js options - using proper types
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle' as const,
        },
      },
      title: {
        display: true,
        text: 'Ticket Trends',
        color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle' as const,
        },
      },
      title: {
        display: true,
        text: 'Monthly Overview',
        color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle' as const,
          padding: 20,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard 📊
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time insights and performance metrics
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat) => (
              <div key={stat.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className={"p-2 rounded-lg " + stat.color}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className={"flex items-center text-xs font-medium " + (
                    stat.changeType === 'increase' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  )}>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart - Weekly Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Weekly Ticket Trends
              </h3>
              <div className="h-72">
                <Line
                  data={{
                    labels: weeklyData.labels,
                    datasets: [
                      {
                        label: 'New Tickets',
                        data: weeklyData.tickets,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#2563eb',
                      },
                      {
                        label: 'Resolved',
                        data: weeklyData.resolved,
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#22c55e',
                        pointBorderColor: '#16a34a',
                      },
                    ],
                  }}
                  options={lineChartOptions}
                />
              </div>
            </div>

            {/* Doughnut Chart - Priority Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Priority Distribution
              </h3>
              <div className="h-72 flex items-center justify-center">
                <Doughnut data={priorityData} options={doughnutOptions} />
              </div>
            </div>

            {/* Bar Chart - Monthly Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Overview
              </h3>
              <div className="h-72">
                <Bar
                  data={{
                    labels: monthlyData.labels,
                    datasets: [
                      {
                        label: 'Created',
                        data: monthlyData.tickets,
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        borderRadius: 4,
                      },
                      {
                        label: 'Resolved',
                        data: monthlyData.resolved,
                        backgroundColor: 'rgba(34, 197, 94, 0.7)',
                        borderColor: '#22c55e',
                        borderWidth: 1,
                        borderRadius: 4,
                      },
                    ],
                  }}
                  options={barChartOptions}
                />
              </div>
            </div>

            {/* Doughnut Chart - Status Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ticket Status
              </h3>
              <div className="h-72 flex items-center justify-center">
                <Doughnut data={statusData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">24</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Avg Response Time</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">94%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Resolution Rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <UserGroupIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Active Agents</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <ClockIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">2.4h</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Avg Resolution Time</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
