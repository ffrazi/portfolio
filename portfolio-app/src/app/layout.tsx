import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import StarField from '@/components/StarField';

export const metadata: Metadata = {
  title: 'Aneesa Zainab | Portfolio',
  description: 'Portfolio of Aneesa Zainab Fazulullah - CS Undergrad, Competitive Programmer & Full Stack Builder.',
  keywords: ['Aneesa Zainab', 'Portfolio', 'Computer Science', 'Developer', 'Competitive Programming', 'RAG', 'Blockchain'],
  authors: [{ name: 'Aneesa Zainab Fazulullah' }],
  metadataBase: new URL('https://portfolio.aneesazainab.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <StarField />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
