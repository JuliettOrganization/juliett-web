
import { Metadata } from 'next';
import { AccountProvider } from '@/context/AccountContext';

 
export const metadata: Metadata = {
  title: 'JULIETT',
  description: 'The official JULIETT WEBSITE',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

import '@/ui_general/global.css';
import { inter } from '@/ui_general/fonts';
 
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