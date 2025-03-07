
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BookList from '@/components/BookList';
import { books } from '@/utils/bookData';
import { cn } from '@/lib/utils';

const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genre))
  ).sort();

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  const filteredBooks = books.filter(book => {
    // Search filter
    const matchesSearch = 
      searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Genre filter
    const matchesGenre = 
      selectedGenres.length === 0 || 
      book.genre.some(g => selectedGenres.includes(g));
    
    // Price filter
    const matchesPrice = 
      book.price >= priceRange[0] && 
      book.price <= priceRange[1];
    
    return matchesSearch && matchesGenre && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Explore Our Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Discover books across all genres, from bestselling fiction to thought-provoking non-fiction
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline" 
              className="md:w-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Genre</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {allGenres.map(genre => (
                      <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(genre)}
                          onChange={() => toggleGenre(genre)}
                          className="rounded border-input text-accent focus:ring-accent"
                        />
                        <span className="text-sm">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={() => {
                      setSelectedGenres([]);
                      setPriceRange([0, 100]);
                      setSearchQuery('');
                    }}
                    variant="outline" 
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {filteredBooks.length} of {books.length} books
          </p>
          <div className="flex gap-2">
            <select 
              className="px-3 py-1 rounded border border-input bg-background text-sm"
              defaultValue="relevance"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="bestselling">Bestselling</option>
            </select>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <BookList 
            books={filteredBooks} 
            columns={4}
          />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-serif mb-2">No books found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                setSelectedGenres([]);
                setPriceRange([0, 100]);
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer - We'll use the same footer structure as in Index.tsx */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-medium mb-4">Swing Page</h3>
              <p className="text-white/80 text-sm">
                Your trusted source for books across all genres, formats, and interests.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/books" className="text-white/80 hover:text-white transition-colors">All Books</Link></li>
                <li><Link to="/categories" className="text-white/80 hover:text-white transition-colors">Categories</Link></li>
                <li><Link to="/bestsellers" className="text-white/80 hover:text-white transition-colors">Bestsellers</Link></li>
                <li><Link to="/new-releases" className="text-white/80 hover:text-white transition-colors">New Releases</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/account" className="text-white/80 hover:text-white transition-colors">My Account</Link></li>
                <li><Link to="/orders" className="text-white/80 hover:text-white transition-colors">Orders</Link></li>
                <li><Link to="/wishlist" className="text-white/80 hover:text-white transition-colors">Wishlist</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>© 2023 Swing Page. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Books;
