
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavLink {
  text: string;
  path: string;
}

const navLinks: NavLink[] = [
  { text: 'Home', path: '/' },
  { text: 'Books', path: '/books' },
  { text: 'Categories', path: '/categories' },
  { text: 'About', path: '/about' },
];

export const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log(`Searching for: ${searchInput}`);
    setSearchInput('');
    setSearchVisible(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // When opening mobile menu, ensure search is closed
    if (!mobileMenuOpen) {
      setSearchVisible(false);
    }
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    // When opening search, ensure mobile menu is closed
    if (!searchVisible) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold transition-opacity hover:opacity-80"
          >
            Bookish
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent relative',
                  location.pathname === link.path 
                    ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-accent after:rounded-full' 
                    : ''
                )}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full transition-colors hover:bg-secondary"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link 
              to="/wishlist"
              className="p-2 rounded-full transition-colors hover:bg-secondary"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/cart"
              className="p-2 rounded-full transition-colors hover:bg-secondary"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
            
            <Link to="/account">
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Account</span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-secondary"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div 
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            searchVisible ? 'max-h-20 mt-4 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Search for books, authors, genres..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-2 px-4 rounded-l-md border border-r-0 border-input bg-transparent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button 
              type="submit"
              className="bg-accent text-white py-2 px-4 rounded-r-md hover:bg-accent/90 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            'md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 transition-all duration-300 ease-in-out',
            mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          )}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'font-medium transition-colors hover:text-accent',
                  location.pathname === link.path ? 'text-accent' : ''
                )}
              >
                {link.text}
              </Link>
            ))}
            <Link 
              to="/account"
              className="font-medium transition-colors hover:text-accent"
            >
              Account
            </Link>
            <div className="pt-6 flex space-x-4">
              <Link 
                to="/wishlist"
                className="p-2 rounded-full bg-secondary flex items-center justify-center"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link 
                to="/cart"
                className="p-2 rounded-full bg-secondary flex items-center justify-center"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
