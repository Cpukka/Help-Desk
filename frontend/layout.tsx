import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/lib/query-provider';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from '@/contexts/NotificationContext';

export const metadata: Metadata = {
  title: 'Help Desk System',
  description: 'Enterprise Help Desk & IT Service Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <NotificationProvider>
            {children}
            <Toaster position="top-right" />
          </NotificationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
