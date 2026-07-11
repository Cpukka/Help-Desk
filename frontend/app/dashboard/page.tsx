'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { 
  TicketIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BookOpenIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    closedTickets: 0,
    responseTime: '0h',
  });

  const recentTickets = [
    { id: 1, title: 'Cannot access email', status: 'Open', priority: 'High', date: '2026-07-10', assignee: 'Support Agent' },
    { id: 2, title: 'VPN connection issues', status: 'In Progress', priority: 'Critical', date: '2026-07-09', assignee: 'Support Agent' },
    { id: 3, title: 'Printer not working', status: 'Resolved', priority: 'Medium', date: '2026-07-08', assignee: 'Support Agent' },
  ];

  const statsData = [
    { id: 1, label: 'Total Tickets', value: stats.totalTickets, icon: TicketIcon, color: 'bg-blue-500', change: '+12%', changeType: 'increase' },
    { id: 2, label: 'Open Tickets', value: stats.openTickets, icon: ClockIcon, color: 'bg-yellow-500', change: '-3%', changeType: 'decrease' },
    { id: 3, label: 'Closed Tickets', value: stats.closedTickets, icon: CheckCircleIcon, color: 'bg-green-500', change: '+8%', changeType: 'increase' },
    { id: 4, label: 'Avg Response Time', value: stats.responseTime, icon: ExclamationTriangleIcon, color: 'bg-blue-500', change: '+2%', changeType: 'increase' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    setIsLoading(false);
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const response = await apiClient.get('/tickets/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'Open': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Resolved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Closed': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'Critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.firstName || 'User'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Here&apos;s what&apos;s happening with your tickets today.</p>
            </div>
            <Link
              href="/tickets/create"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Ticket
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {statsData.map((stat) => (
              <div key={stat.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={"p-2 rounded-lg " + stat.color}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={"flex items-center text-sm " + (
                    stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  )}>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Link
              href="/tickets/create"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-md transition"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2">
                <PlusIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Ticket</span>
            </Link>
            <Link
              href="/tickets"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-md transition"
            >
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mb-2">
                <TicketIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All Tickets</span>
            </Link>
            <Link
              href="/knowledge-base"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-md transition"
            >
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-2">
                <BookOpenIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Knowledge Base</span>
            </Link>
            <Link
              href="/reports"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-md transition"
            >
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-2">
                <ChartBarIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reports</span>
            </Link>
            <Link
  href="/analytics"
  className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
>
  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-2">
    <ChartBarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
  </div>
  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</span>
</Link>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tickets</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Latest support requests</p>
              </div>
              <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-full sm:w-48 pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <Link
                  href="/tickets"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                >
                  View all →
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticket</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Priority</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Assignee</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTickets.length > 0 ? (
                    recentTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{ticket.title}</span>
                            <span className={"sm:hidden text-xs font-medium " + getStatusColor(ticket.status) + " px-2 py-1 rounded-full inline-block mt-1 w-fit"}>
                              {ticket.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                          <span className={"text-xs font-medium " + getStatusColor(ticket.status) + " px-2 py-1 rounded-full"}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{ticket.priority}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{ticket.assignee}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{ticket.date}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No tickets yet. Create your first ticket!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
