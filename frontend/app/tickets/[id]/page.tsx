'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { 
  ArrowLeftIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface TicketDetail {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  dueDate: string | null;
  createdBy: string;
  assignedTo: string;
  comments: any[];
}

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTicket();
  }, [router]);

  const fetchTicket = async () => {
    try {
      const response = await apiClient.get(`/tickets/${params.id}`);
      setTicket(response.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast.error('Failed to load ticket details');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-800',
      'Open': 'bg-blue-100 text-blue-800',
      'Assigned': 'bg-indigo-100 text-indigo-800',
      'InProgress': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'OnHold': 'bg-orange-100 text-orange-800',
      'Resolved': 'bg-green-100 text-green-800',
      'Closed': 'bg-gray-100 text-gray-800',
      'Escalated': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      'New': ClockIcon,
      'Open': ClockIcon,
      'Assigned': UserCircleIcon,
      'InProgress': ClockIcon,
      'In Progress': ClockIcon,
      'OnHold': ClockIcon,
      'Resolved': CheckCircleIcon,
      'Closed': CheckCircleIcon,
      'Escalated': ExclamationTriangleIcon,
    };
    return icons[status] || ClockIcon;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700">Ticket not found</h2>
            <p className="text-gray-500 mt-2">The ticket you're looking for doesn't exist.</p>
            <Link href="/tickets" className="mt-4 inline-block text-blue-600 hover:underline">
              Back to Tickets
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(ticket.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/tickets"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Tickets
          </Link>

          {/* Ticket Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <StatusIcon className="h-6 w-6 text-blue-600" />
                  <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={"text-xs font-medium " + getStatusColor(ticket.status) + " px-2 py-1 rounded-full"}>
                    {ticket.status}
                  </span>
                  <span className={"text-xs font-medium " + getPriorityBadge(ticket.priority) + " px-2 py-1 rounded-full"}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
              <Link
                href={`/tickets/${ticket.id}/edit`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Ticket
              </Link>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center text-gray-500 mb-2">
                <UserCircleIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Created By</span>
              </div>
              <p className="text-gray-900">{ticket.createdBy}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center text-gray-500 mb-2">
                <UserCircleIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Assigned To</span>
              </div>
              <p className="text-gray-900">{ticket.assignedTo || 'Unassigned'}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center text-gray-500 mb-2">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Created</span>
              </div>
              <p className="text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Comments</h3>
            {ticket.comments && ticket.comments.length > 0 ? (
              <div className="space-y-4">
                {ticket.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-gray-900">{comment.user}</span>
                      <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No comments yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}