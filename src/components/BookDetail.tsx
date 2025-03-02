
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingCart, Heart, Share2, 
  Star, Calendar, Book as BookIcon, Hash, BadgeCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBookById, sampleReviews } from '@/utils/bookData';
import { Book } from '@/utils/types';
import { cn } from '@/lib/utils';

interface BookDetailParams {
  id: string;
}

export const BookDetail: React.FC = () => {
  const { id } = useParams<keyof BookDetailParams>() as BookDetailParams;
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching book data
    setLoading(true);
    const timer = setTimeout(() => {
      const foundBook = getBookById(id);
      if (foundBook) {
        setBook(foundBook);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    console.log(`Added ${quantity} copies of "${book?.title}" to cart`);
    // Implement cart functionality
  };

  const addToWishlist = () => {
    console.log(`Added "${book?.title}" to wishlist`);
    // Implement wishlist functionality
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-[2/3] bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-2/3">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the book you're looking for.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 animate-fade-in">
          {/* Book Cover */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-soft-xl">
              <div 
                className={cn(
                  "absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300",
                  imageLoaded ? "opacity-0" : "opacity-100"
                )}
              />
              <img
                src={book.coverImage}
                alt={book.title}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="mb-6">
              {book.genre.map((genre, index) => (
                <span 
                  key={index} 
                  className="inline-block text-xs font-medium bg-secondary py-1 px-2 rounded mr-2 mb-2"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={cn(
                      "w-5 h-5", 
                      i < Math.floor(book.rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 font-medium">{book.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">({sampleReviews.length} reviews)</span>
            </div>

            <div className="mb-6">
              <p className="text-2xl font-medium mb-2">${book.price.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center">
                <BadgeCheck className="w-4 h-4 mr-1" />
                In Stock
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border border-input rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-lg border-r border-input hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 py-2 text-center bg-transparent border-0 focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-lg border-l border-input hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>

              <Button 
                onClick={addToCart}
                className="flex-1 md:flex-none bg-accent hover:bg-accent/90 text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>

              <Button 
                variant="outline" 
                onClick={addToWishlist}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>

              <Button variant="ghost">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-xs">Published</span>
                </div>
                <p className="font-medium">{book.publishDate}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center text-muted-foreground mb-1">
                  <BookIcon className="w-4 h-4 mr-2" />
                  <span className="text-xs">Pages</span>
                </div>
                <p className="font-medium">{book.pages}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex items-center text-muted-foreground mb-1">
                  <Hash className="w-4 h-4 mr-2" />
                  <span className="text-xs">ISBN</span>
                </div>
                <p className="font-medium">{book.isbn}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('description')}
                  className={cn(
                    "py-2 px-4 font-medium text-sm border-b-2 mr-4",
                    activeTab === 'description' 
                      ? "border-accent text-accent" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={cn(
                    "py-2 px-4 font-medium text-sm border-b-2",
                    activeTab === 'reviews' 
                      ? "border-accent text-accent" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  Reviews ({sampleReviews.length})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="mb-6 pb-6 border-b border-border last:border-0">
                      <div className="flex items-start">
                        <div className="mr-4">
                          {review.userAvatar ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img 
                                src={review.userAvatar} 
                                alt={review.userName}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                              <span className="font-medium text-muted-foreground">
                                {review.userName.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{review.userName}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={cn(
                                  "w-4 h-4", 
                                  i < review.rating 
                                    ? "text-yellow-400 fill-yellow-400" 
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <p>{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
