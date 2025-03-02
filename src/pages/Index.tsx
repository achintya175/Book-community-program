
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BookList from '@/components/BookList';
import AuthModal from '@/components/auth/AuthModal';
import { books, getFeaturedBooks } from '@/utils/bookData';
import { AuthView } from '@/utils/types';
import { cn } from '@/lib/utils';

const Index = () => {
  const featuredBooks = getFeaturedBooks();
  
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Featured Section */}
        <BookList
          books={featuredBooks}
          title="Featured Books"
          subtitle="Curated selections to inspire your next read"
          featured={true}
          columns={3}
        />
        
        {/* Categories Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-3">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover books across a wide range of genres and subjects
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Fiction', 'Mystery', 'Science', 'Self-Help'].map((category) => (
              <Link 
                key={category}
                to={`/categories/${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg aspect-square shadow-soft hover:shadow-soft-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif font-medium z-10 group-hover:scale-110 transition-transform duration-300">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/categories" className="inline-flex items-center">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Latest Arrivals */}
        <BookList
          books={books.slice(0, 8)}
          title="Latest Arrivals"
          subtitle="The newest additions to our collection"
          columns={4}
        />
        
        {/* Newsletter Section */}
        <section className="bg-secondary/50 rounded-xl px-6 py-12 my-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-semibold mb-3">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Sign up for our newsletter to receive book recommendations, exclusive offers, and updates on new releases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md border border-input"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
        
        {/* Account CTA Section */}
        <section className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-8 my-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-2">Create an Account</h2>
              <p className="text-muted-foreground">
                Sign up to track your orders, create wishlists, and get personalized recommendations.
              </p>
            </div>
            <AuthModal 
              defaultView={AuthView.SIGN_UP}
              trigger={
                <Button size="lg" className="min-w-[150px]">
                  Sign Up
                </Button>
              }
            />
          </div>
        </section>
      </div>
      
      {/* Footer */}
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

export default Index;
