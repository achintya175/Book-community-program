
import React, { useState, useEffect } from 'react';
import { Book } from '@/utils/types';
import BookCard from './BookCard';
import { cn } from '@/lib/utils';

interface BookListProps {
  books: Book[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
  featured?: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  title,
  subtitle,
  columns = 4,
  className,
  featured = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [staggeredBooks, setStaggeredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const container = document.getElementById(`book-list-${title?.replace(/\s+/g, '-').toLowerCase() || 'main'}`);
    if (container) {
      observer.observe(container);
    }

    return () => {
      observer.disconnect();
    };
  }, [title]);

  useEffect(() => {
    if (isVisible) {
      // Stagger the appearance of books
      const timer = setTimeout(() => {
        setStaggeredBooks(books);
      }, 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, books]);

  const getGridClass = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3';
      case 5: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
      case 4:
      default: return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <section 
      id={`book-list-${title?.replace(/\s+/g, '-').toLowerCase() || 'main'}`}
      className={cn('py-12', className)}
    >
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className={cn(
              'text-3xl font-serif font-semibold mb-2 transition-all duration-500',
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            )}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={cn(
              'text-muted-foreground max-w-2xl mx-auto transition-all duration-500 delay-100',
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            )}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={cn(
        'grid gap-6 md:gap-8', 
        getGridClass()
      )}>
        {staggeredBooks.map((book, index) => (
          <div 
            key={book.id}
            className={cn(
              'transition-all duration-500 transform',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <BookCard book={book} featured={featured && book.featured} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookList;
