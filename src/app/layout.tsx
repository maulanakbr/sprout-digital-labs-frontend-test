import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/component/layout/providers';

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex by Maulana Akbar Yudistika',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
