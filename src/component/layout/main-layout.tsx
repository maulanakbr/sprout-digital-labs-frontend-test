'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import type { MouseEventHandler } from 'react';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
  headerClassName?: string;
  mainClassName?: string;
  buttonClassName?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function MainLayout({
  children,
  headerClassName,
  mainClassName,
  buttonClassName,
  handleClick,
}: MainLayoutProps) {
  const path = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={cn(
          'py-4 flex justify-between items-center px-4 max-w-screen-md mx-auto w-full',
          path === '/' && 'justify-end',
          headerClassName
        )}
      >
        <Button
          variant="ghost"
          rightIcon="arrow-left"
          rightIconSize={32}
          className={cn(
            'p-0 hover:bg-transparent cursor-pointer',
            path === '/' && 'hidden',
            buttonClassName
          )}
          onClick={typeof handleClick === 'function' ? handleClick : undefined}
        />
        <Button
          variant="ghost"
          rightIcon="menu"
          rightIconSize={32}
          className={cn('p-0 hover:bg-transparent cursor-pointer', buttonClassName)}
        />
      </header>
      <main className={cn('flex-1 max-w-screen-md mx-auto w-full', mainClassName)}>{children}</main>
      <footer className="bg-gray-100 p-4 text-center text-sm">
        <p className="text-neutral-400">Made by Maulana Akbar Yudistika</p>
        <p className="font-semibold">© {new Date().getFullYear()} Pokedex. All rights reserved.</p>
      </footer>
    </div>
  );
}
