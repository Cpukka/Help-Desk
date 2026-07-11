'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/lib/api';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  assignedTo?: string;
  createdBy?: string;
}

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTickets();
  }, [router]);

  const fetchTickets = async () => {
    try {
      const response = await apiClient.get('/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets(mockTickets);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Open': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Assigned': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'InProgress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'OnHold': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'On Hold': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Resolved': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Closed': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'Escalated': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredTickets = tickets
    .filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let aVal = a[sortField as keyof Ticket] || '';
      let bVal = b[sortField as keyof Ticket] || '';
      if (sortField === 'createdAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }
      return sortDirection === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

  const statusOptions = ['all', 'New', 'Open', 'Assigned', 'In Progress', 'On Hold', 'Resolved', 'Closed', 'Escalated'];
  const priorityOptions = ['all', 'Critical', 'High', 'Medium', 'Low'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tickets...</p>
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Tickets</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all support tickets</p>
            </div>
            <Link
              href="/tickets/create"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Ticket
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status}
                    </option>
                  ))}
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'all' ? 'All Priority' : priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <button onClick={() => handleSort('title')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                        Ticket
                        {sortField === 'title' && (
                          sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                        Status
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                      <button onClick={() => handleSort('priority')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                        Priority
                        {sortField === 'priority' && (
                          sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                      <button onClick={() => handleSort('createdAt')} className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                        Created
                        {sortField === 'createdAt' && (
                          sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{ticket.title}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px] sm:max-w-none">
                              {ticket.description}
                            </span>
                            <span className="sm:hidden text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 w-fit bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
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
                          <span className={"text-xs font-medium " + getPriorityBadge(ticket.priority) + " px-2 py-1 rounded-full"}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/tickets/${ticket.id}`}
                              className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </Link>
                            <Link
                              href={`/tickets/${ticket.id}/edit`}
                              className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        <div className="text-6xl mb-4">🎫</div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">No tickets found</p>
                        <p className="text-sm">Try adjusting your filters or create a new ticket.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Summary */}
          {filteredTickets.length > 0 && (
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <span>Showing {filteredTickets.length} of {tickets.length} tickets</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Open: {tickets.filter(t => t.status === 'Open' || t.status === 'New' || t.status === 'Assigned').length}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Resolved: {tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Mock data for when API is not available
const mockTickets: Ticket[] = [
  { 
    id: '1', 
    title: 'Cannot access email', 
    description: 'Unable to login to email since this morning. Getting authentication error.',
    status: 'Open', 
    priority: 'High', 
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    assignedTo: 'Support Agent'
  },
  { 
    id: '2', 
    title: 'VPN connection issues', 
    description: 'VPN keeps disconnecting every 10 minutes. Need this fixed urgently.',
    status: 'In Progress', 
    priority: 'Critical', 
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    assignedTo: 'Support Agent'
  },
  { 
    id: '3', 
    title: 'Printer not working', 
    description: 'Network printer in conference room is showing offline status.',
    status: 'Resolved', 
    priority: 'Medium', 
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    assignedTo: 'Support Agent'
  },
  { 
    id: '4', 
    title: 'Software installation request', 
    description: 'Need to install Adobe Creative Cloud on design team computers.',
    status: 'New', 
    priority: 'Low', 
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    assignedTo: 'Support Agent'
  },
  { 
    id: '5', 
    title: 'Password reset request', 
    description: 'User forgot password and cannot access system.',
    status: 'Assigned', 
    priority: 'Medium', 
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    assignedTo: 'Support Agent'
  },
];