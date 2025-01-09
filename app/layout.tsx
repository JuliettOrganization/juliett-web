
import { Metadata } from 'next';
import { AccountProvider } from '@/app/context/AccountContext';

 
export const metadata: Metadata = {
  title: 'JULIETT',
  description: 'The official JULIETT WEBSITE',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={`${inter.className} antialiased`}> <AccountProvider>
          {children}
        </AccountProvider></body>
        
    </html>
  );
}