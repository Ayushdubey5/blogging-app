"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar({ onSearch }) {
  const { theme, setTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">BlogSphere</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-[200px] md:w-[300px] pl-9 pr-4 py-2 rounded-md bg-muted/50 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-muted/50"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/add"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity hidden md:block"
            >
              Write Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}