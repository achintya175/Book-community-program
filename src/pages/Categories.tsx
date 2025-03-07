
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { books } from '@/utils/bookData';
import { cn } from '@/lib/utils';

const Categories: React.FC = () => {
  // Extract all unique genres from books
  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genre))
  ).sort();

  // Create category cards with book counts
  const categoryCards = allGenres.map(genre => ({
    name: genre,
    count: books.filter(book => book.genre.includes(genre)).length,
    image: books.find(book => book.genre.includes(genre))?.coverImage || ''
  }));

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Book Categories
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Browse our extensive collection by genre to find your next great read
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryCards.map((category, index) => (
            <Link
              key={category.name}
              to={`/categories/${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg aspect-square shadow-soft hover:shadow-soft-xl transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-black">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white text-2xl font-serif font-medium mb-2 z-10 group-hover:scale-110 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4 z-10">
                  {category.count} {category.count === 1 ? 'book' : 'books'}
                </p>
                <span className="inline-flex items-center text-sm text-white bg-white/20 px-3 py-1 rounded-full z-10 group-hover:bg-accent transition-colors duration-300">
                  Browse
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Category Selections */}
      <div className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">
            Popular Category Selections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Fiction', 'Mystery', 'Science Fiction'].map(category => (
              <div key={category} className="bg-white rounded-lg shadow-soft overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium mb-4">{category} Favorites</h3>
                  <ul className="space-y-3">
                    {books
                      .filter(book => book.genre.includes(category))
                      .slice(0, 3)
                      .map(book => (
                        <li key={book.id} className="flex items-center gap-3">
                          <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={book.coverImage} 
                              alt={book.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Link 
                              to={`/books/${book.id}`}
                              className="font-medium hover:text-accent transition-colors line-clamp-1"
                            >
                              {book.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button asChild variant="link" className="p-0">
                      <Link to={`/categories/${category.toLowerCase()}`} className="flex items-center text-accent">
                        View all {category} books
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default Categories;
