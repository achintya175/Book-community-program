
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BookList from '@/components/BookList';
import { books } from '@/utils/bookData';

const CategoryDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  const categoryName = category ? 
    category.charAt(0).toUpperCase() + category.slice(1) : 
    '';
  
  const categoryBooks = books.filter(book => 
    book.genre.some(g => g.toLowerCase() === category?.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              to="/categories" 
              className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {categoryName} Books
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our collection of {categoryName.toLowerCase()} books
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {categoryBooks.length > 0 ? (
          <BookList 
            books={categoryBooks} 
            columns={4}
          />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-serif mb-2">No books found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any books in this category.
            </p>
            <Button asChild>
              <Link to="/categories">
                Browse Other Categories
              </Link>
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

export default CategoryDetail;
