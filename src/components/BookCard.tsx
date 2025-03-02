
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Book } from '@/utils/types';
import { cn } from '@/lib/utils';

interface BookCardProps {
  book: Book;
  featured?: boolean;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  featured = false,
  className 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className={cn(
        'group relative rounded-lg overflow-hidden h-full transition-all duration-300',
        featured ? 'hover-card' : 'hover:shadow-soft',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Cover */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <div 
          className={cn(
            'absolute inset-0 bg-gray-200 animate-pulse transition-opacity',
            imageLoaded ? 'opacity-0' : 'opacity-100'
          )}
        />
        <img
          src={book.coverImage}
          alt={book.title}
          className={cn(
            'lazy-image w-full h-full object-cover transition-all duration-500',
            imageLoaded ? 'loaded' : '',
            featured && isHovered ? 'scale-105' : 'scale-100'
          )}
          onLoad={handleImageLoad}
        />
        
        {/* Overlay actions */}
        <div className={cn(
          'absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="flex gap-2">
            <button 
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:bg-accent hover:text-white transform hover:scale-105"
              title="Add to wishlist"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 hover:bg-accent hover:text-white transform hover:scale-105"
              title="Add to cart"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-3">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-serif font-medium text-lg mb-1 line-clamp-1 group-hover:text-accent transition-colors duration-200">
            {book.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">
          {book.author}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
          </div>
          <span className="font-medium">${book.price.toFixed(2)}</span>
        </div>
      </div>

      {/* "Featured" badge if applicable */}
      {featured && (
        <div className="absolute top-2 left-2 py-1 px-2 text-xs font-medium bg-accent/90 text-white rounded-md">
          Featured
        </div>
      )}
    </div>
  );
};

export default BookCard;
