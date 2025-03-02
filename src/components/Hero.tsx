
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const heroBooks = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: 'Elizabeth Blackwood',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Kingdoms of Sand and Stone',
    author: 'Marcus Reid',
    image: 'https://images.unsplash.com/photo-1531541518660-325ca576ead6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    title: 'Beyond the Horizon',
    author: 'Amara Washington',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  }
];

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Set component as loaded after a slight delay for smoother animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Automatically cycle through featured books
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroBooks.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const activeBook = heroBooks[activeIndex];

  return (
    <section 
      className={cn(
        'relative h-screen max-h-[900px] min-h-[600px] w-full overflow-hidden',
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <img
          src={activeBook.image}
          alt={activeBook.title}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center pt-16">
        <div 
          className={cn(
            'max-w-xl transition-all duration-700 transform',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="mb-4">
            <span 
              className="inline-block py-1 px-3 text-xs font-medium bg-accent/90 text-white rounded-full mb-4 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Featured Book
            </span>
          </div>

          <h1 
            className="text-4xl md:text-5xl lg:text-6xl text-white font-serif font-bold mb-4 tracking-tight leading-tight animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            {activeBook.title}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-white/80 mb-6 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            By {activeBook.author}
          </p>
          
          <div 
            className="flex space-x-4 animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Button asChild className="bg-white text-black hover:bg-white/90 border-0">
              <Link to={`/books/${activeBook.id}`}>
                View Book
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/books">
                <span>Browse All</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Book Selection Indicators */}
        <div 
          className="absolute bottom-12 left-4 md:left-12 flex space-x-3 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          {heroBooks.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'w-12 h-1 rounded-full transition-all duration-300',
                index === activeIndex ? 'bg-white' : 'bg-white/30'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
