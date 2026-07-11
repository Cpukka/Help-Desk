'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  MagnifyingGlassIcon,
  BookOpenIcon,
  AcademicCapIcon,
  LightBulbIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  views: number;
  helpful: number;
}

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpenIcon, count: 12 },
    { id: 'getting-started', name: 'Getting Started', icon: AcademicCapIcon, count: 3 },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: LightBulbIcon, count: 4 },
    { id: 'how-to', name: 'How-To Guides', icon: DocumentTextIcon, count: 3 },
    { id: 'best-practices', name: 'Best Practices', icon: UserGroupIcon, count: 2 },
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'How to Create and Manage Tickets',
      category: 'getting-started',
      excerpt: 'Learn the basics of creating, assigning, and tracking tickets in the Help Desk system.',
      author: 'Admin',
      date: '2026-07-10',
      views: 156,
      helpful: 92
    },
    {
      id: '2',
      title: 'Troubleshooting Common Email Issues',
      category: 'troubleshooting',
      excerpt: 'A comprehensive guide to resolving common email connectivity and authentication problems.',
      author: 'Support Team',
      date: '2026-07-09',
      views: 89,
      helpful: 78
    },
    {
      id: '3',
      title: 'Setting Up VPN for Remote Work',
      category: 'how-to',
      excerpt: 'Step-by-step instructions for configuring VPN access for remote employees.',
      author: 'IT Team',
      date: '2026-07-08',
      views: 234,
      helpful: 95
    },
    {
      id: '4',
      title: 'Password Reset Best Practices',
      category: 'best-practices',
      excerpt: 'Learn the recommended procedures for handling password reset requests securely.',
      author: 'Security Team',
      date: '2026-07-07',
      views: 67,
      helpful: 88
    },
    {
      id: '5',
      title: 'Understanding Ticket Priority Levels',
      category: 'getting-started',
      excerpt: 'Learn how to properly classify tickets by priority for efficient resolution.',
      author: 'Admin',
      date: '2026-07-06',
      views: 145,
      helpful: 90
    },
    {
      id: '6',
      title: 'Resolving Network Connectivity Issues',
      category: 'troubleshooting',
      excerpt: 'A guide to diagnosing and fixing common network connectivity problems.',
      author: 'Network Team',
      date: '2026-07-05',
      views: 178,
      helpful: 85
    },
  ];

  const filteredArticles = articles
    .filter(article => 
      (selectedCategory === 'all' || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, any> = {
      'getting-started': AcademicCapIcon,
      'troubleshooting': LightBulbIcon,
      'how-to': DocumentTextIcon,
      'best-practices': UserGroupIcon,
    };
    return icons[categoryId] || BookOpenIcon;
  };

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      'getting-started': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      'troubleshooting': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      'how-to': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      'best-practices': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Knowledge Base
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers, guides, and solutions to common questions
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={"flex flex-col items-center p-4 rounded-xl transition " + (
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className={"h-8 w-8 mb-2 " + (isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400')} />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className={"text-xs " + (isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400')}>
                    {category.count} articles
                  </span>
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => {
                const CategoryIcon = getCategoryIcon(article.category);
                const categoryColor = getCategoryColor(article.category);
                return (
                  <Link
                    key={article.id}
                    href={`/knowledge-base/${article.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className={"p-2 rounded-lg " + categoryColor}>
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>👁️ {article.views}</span>
                          <span>👍 {article.helpful}%</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>By {article.author}</span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{article.category.replace('-', ' ')}</span>
                      <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium flex items-center">
                        Read More
                        <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition" />
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No articles found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Articles</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">45</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">92%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Helpfulness Rate</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1.2K</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}