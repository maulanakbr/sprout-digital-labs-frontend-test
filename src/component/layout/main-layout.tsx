import { Button } from '../ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 flex justify-between px-4 max-w-screen-md mx-auto w-full">
        <Button
          variant="ghost"
          rightIcon="arrow-left"
          rightIconSize={32}
          className="p-0 hover:p-4 cursor-pointer"
        />
        <Button
          variant="ghost"
          rightIcon="menu"
          rightIconSize={32}
          className="p-0 hover:p-4 cursor-pointer"
        />
      </header>
      <main className="flex-1 py-4 px-4 max-w-screen-md mx-auto w-full">{children}</main>
      <footer className="bg-gray-100 p-4 text-center text-sm">
        <p className="text-neutral-400">Made by Maulana Akbar Yudistika</p>
        <p className="font-semibold">© {new Date().getFullYear()} Pokedex. All rights reserved.</p>
      </footer>
    </div>
  );
}
