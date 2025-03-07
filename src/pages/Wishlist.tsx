
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { getBookById } from '@/utils/bookData';
import { cn } from '@/lib/utils';

// Sample wishlist items for demonstration
const initialWishlistItems = [
  getBookById('2'),
  getBookById('5'),
  getBookById('8'),
];

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems.filter(Boolean));

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Your Wishlist
          </h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite books for later
          </p>

          {wishlistItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow-soft border border-border overflow-hidden">
              {wishlistItems.map((book, index) => (
                <div key={book.id}>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/6">
                        <Link to={`/books/${book.id}`}>
                          <div className="aspect-[2/3] rounded-md overflow-hidden">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </Link>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <div>
                            <Link to={`/books/${book.id}`}>
                              <h3 className="font-serif font-medium text-lg hover:text-accent transition-colors">
                                {book.title}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground">
                              by {book.author}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => removeFromWishlist(book.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={`Remove ${book.title} from wishlist`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between mt-4">
                          <div className="space-x-1 text-sm mb-2 sm:mb-0">
                            {book.genre.map((g, i) => (
                              <span key={i} className="inline-block bg-secondary px-2 py-1 rounded text-xs">
                                {g}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="font-medium">${book.price.toFixed(2)}</span>
                            <Button size="sm" className="bg-accent text-white hover:bg-accent/90">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < wishlistItems.length - 1 && (
                    <Separator />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-soft border border-border">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Save items you're interested in by clicking the heart icon on any book
              </p>
              <Button asChild>
                <Link to="/books">Browse Books</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - We'll use the same footer structure as in Index.tsx */}
      <footer className="bg-primary text-white py-12 mt-auto">
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

export default Wishlist;
