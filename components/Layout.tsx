import React from 'react';
import { User, LogOut, Disc, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-200 bg-obsidian-950 selection:bg-gold-500 selection:text-obsidian-900">
      <nav className="sticky top-0 z-50 border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
              <ShieldCheck className="h-8 w-8 text-gold-500" />
              <span className="text-xl font-serif font-bold tracking-wider text-white">
                PLEASURE<span className="text-gold-500">VAULT</span>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#/" className="hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">Discovery</a>
              <a href="#/events" className="hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">Events</a>
              <a href="#/vault" className="hover:text-gold-400 transition-colors text-sm uppercase tracking-widest">My Vault</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-obsidian-800 rounded-full transition-colors">
                <User className="h-5 w-5 text-gold-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-obsidian-800 bg-obsidian-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-neutral-500 text-sm">
          <p>© 2024 Pleasure Vault. Exclusively for members of taste.</p>
          <p className="mt-2 text-xs text-neutral-600">Drink responsibly. 18+</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;