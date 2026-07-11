'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  ChartBarIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  CalendarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('week');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const stats = [
    { id: 1, label: 'Total Tickets', value: '247', change: '+12.5%', changeType: 'increase', icon: ChartBarIcon, color: 'bg-blue-500' },
    { id: 2, label: 'Resolution Rate', value: '94%', change: '+3.2%', changeType: 'increase', icon: CheckCircleIcon, color: 'bg-green-500' },
    { id: 3, label: 'Avg Response Time', value: '2.4h', change: '-0.8h', changeType: 'decrease', icon: ClockIcon, color: 'bg-yellow-500' },
    { id: 4, label: 'Open Tickets', value: '18', change: '-5%', changeType: 'decrease', icon: ExclamationTriangleIcon, color: 'bg-red-500' },
  ];

  const reports = [
    { id: 1, name: 'Ticket Resolution Time Report', description: 'Average time to resolve tickets by priority and category', icon: ClockIcon, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 2, name: 'SLA Compliance Report', description: 'Service Level Agreement compliance and breach analysis', icon: CheckCircleIcon, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { id: 3, name: 'Team Productivity Report', description: 'Individual and team performance metrics and trends', icon: UserGroupIcon, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { id: 4, name: 'Customer Satisfaction Report', description: 'Customer feedback and satisfaction scores analysis', icon: ChartBarIcon, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Performance Summary', date: '2026-07-10', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'Q2 Ticket Analysis', date: '2026-07-08', size: '4.1 MB', type: 'Excel' },
    { id: 3, name: 'SLA Compliance Report', date: '2026-07-05', size: '1.8 MB', type: 'PDF' },
    { id: 4, name: 'Team Performance Review', date: '2026-07-01', size: '3.2 MB', type: 'PDF' },
  ];

  const priorityDistribution = [
    { priority: 'Critical', count: 12, percentage: 5 },
    { priority: 'High', count: 45, percentage: 18 },
    { priority: 'Medium', count: 98, percentage: 40 },
    { priority: 'Low', count: 92, percentage: 37 },
  ];

  const statusDistribution = [
    { status: 'Open', count: 18, percentage: 7 },
    { status: 'In Progress', count: 35, percentage: 14 },
    { status: 'Resolved', count: 97, percentage: 39 },
    { status: 'Closed', count: 97, percentage: 39 },
  ];

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let content = '';
      let filename = '';
      let type = '';
      
      if (exportFormat === 'pdf') {
        content = 'Help Desk Report\n';
        content += '================\n\n';
        content += 'Report generated on: ' + new Date().toLocaleString() + '\n';
        content += 'Date Range: ' + dateRange + '\n\n';
        content += 'STATISTICS:\n';
        content += '-----------\n';
        stats.forEach(stat => {
          content += stat.label + ': ' + stat.value + ' (' + stat.change + ')\n';
        });
        content += '\nPRIORITY DISTRIBUTION:\n';
        content += '----------------------\n';
        priorityDistribution.forEach(item => {
          content += item.priority + ': ' + item.count + ' tickets (' + item.percentage + '%)\n';
        });
        content += '\nSTATUS DISTRIBUTION:\n';
        content += '--------------------\n';
        statusDistribution.forEach(item => {
          content += item.status + ': ' + item.count + ' tickets (' + item.percentage + '%)\n';
        });
        filename = 'report-' + new Date().toISOString().slice(0,10) + '.txt';
        type = 'text/plain';
      } else if (exportFormat === 'excel') {
        content = 'Ticket Report\n';
        content += 'Date,Title,Status,Priority,Assignee\n';
        content += '2026-07-10,Cannot access email,Open,High,Support Agent\n';
        content += '2026-07-09,VPN connection issues,In Progress,Critical,Support Agent\n';
        content += '2026-07-08,Printer not working,Resolved,Medium,Support Agent\n';
        content += '2026-07-07,Software installation request,New,Low,Support Agent\n';
        content += '2026-07-06,Password reset request,Assigned,Medium,Support Agent\n';
        filename = 'ticket-report-' + new Date().toISOString().slice(0,10) + '.csv';
        type = 'text/csv';
      } else {
        content = 'Report generated on: ' + new Date().toLocaleString() + '\n';
        content += 'Date Range: ' + dateRange + '\n\n';
        content += 'Stats:\n';
        stats.forEach(stat => {
          content += '- ' + stat.label + ': ' + stat.value + ' (' + stat.change + ')\n';
        });
        content += '\nPriority Distribution:\n';
        priorityDistribution.forEach(item => {
          content += '- ' + item.priority + ': ' + item.count + ' tickets (' + item.percentage + '%)\n';
        });
        content += '\nStatus Distribution:\n';
        statusDistribution.forEach(item => {
          content += '- ' + item.status + ': ' + item.count + ' tickets (' + item.percentage + '%)\n';
        });
        filename = 'report-' + new Date().toISOString().slice(0,10) + '.csv';
        type = 'text/csv';
      }

      const blob = new Blob([content], { type: type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Report exported successfully!');
      setShowExportModal(false);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">View performance metrics and generate detailed reports</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last Year</option>
              </select>
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Export
              </button>
            </div>
          </div>

          {/* Export Modal */}
          {showExportModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Export Report</h3>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">Choose the format for your report export.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setExportFormat('pdf')}
                      className={'p-4 border-2 rounded-xl text-center transition ' + (
                        exportFormat === 'pdf' 
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                      )}
                    >
                      <div className="text-2xl mb-1">📄</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">PDF</span>
                    </button>
                    <button
                      onClick={() => setExportFormat('excel')}
                      className={'p-4 border-2 rounded-xl text-center transition ' + (
                        exportFormat === 'excel' 
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/30 dark:border-green-400' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                      )}
                    >
                      <div className="text-2xl mb-1">📊</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Excel</span>
                    </button>
                    <button
                      onClick={() => setExportFormat('csv')}
                      className={'p-4 border-2 rounded-xl text-center transition ' + (
                        exportFormat === 'csv' 
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-400' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                      )}
                    >
                      <div className="text-2xl mb-1">📋</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CSV</span>
                    </button>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={isExporting}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isExporting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Exporting...
                        </>
                      ) : (
                        <>
                          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={'p-2 rounded-lg ' + stat.color}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={'flex items-center text-sm ' + (
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

          {/* Distribution Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
              <div className="space-y-3">
                {priorityDistribution.map((item) => (
                  <div key={item.priority}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.priority}</span>
                      <span className="text-gray-600 dark:text-gray-400">{item.count} tickets ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={'h-2 rounded-full ' + (
                          item.priority === 'Critical' ? 'bg-red-500' :
                          item.priority === 'High' ? 'bg-orange-500' :
                          item.priority === 'Medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        )}
                        style={{ width: item.percentage + '%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Distribution</h3>
              <div className="space-y-3">
                {statusDistribution.map((item) => (
                  <div key={item.status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.status}</span>
                      <span className="text-gray-600 dark:text-gray-400">{item.count} tickets ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={'h-2 rounded-full ' + (
                          item.status === 'Open' ? 'bg-blue-500' :
                          item.status === 'In Progress' ? 'bg-yellow-500' :
                          item.status === 'Resolved' ? 'bg-green-500' :
                          'bg-gray-500'
                        )}
                        style={{ width: item.percentage + '%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Templates */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Report Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reports.map((report) => {
                const Icon = report.icon;
                return (
                  <Link
                    key={report.id}
                    href={`/reports/${report.id}`}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 hover:shadow-lg transition group"
                  >
                    <div className={'p-3 rounded-lg ' + report.color + ' w-fit mb-3'}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {report.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{report.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Previously generated reports</p>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Report Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{report.name}</span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{report.date}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{report.size}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition">
                            <DocumentArrowDownIcon className="h-5 w-5" />
                          </button>
                          <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition">
                            <PrinterIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}