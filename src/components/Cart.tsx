
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/utils/types';
import { getBookById } from '@/utils/bookData';
import { cn } from '@/lib/utils';

// Sample cart items for demonstration
const initialCartItems: CartItem[] = [
  { book: getBookById('1')!, quantity: 1 },
  { book: getBookById('4')!, quantity: 2 },
];

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [loading, setLoading] = useState(false);

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.book.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.book.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity, 
    0
  );
  
  const tax = subtotal * 0.08; // 8% tax rate
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      alert('Checkout functionality would go here!');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Your Cart</h1>
          
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Your Cart</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-soft border border-border overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Cart Items ({cartItems.length})</h2>
                
                {cartItems.map((item) => (
                  <div key={item.book.id} className="mb-6 last:mb-0">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/4">
                        <div className="aspect-[2/3] rounded-md overflow-hidden">
                          <img 
                            src={item.book.coverImage} 
                            alt={item.book.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <Link to={`/books/${item.book.id}`}>
                              <h3 className="font-serif font-medium text-lg mb-1 hover:text-accent transition-colors">
                                {item.book.title}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground text-sm mb-2">
                              by {item.book.author}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.book.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={`Remove ${item.book.title} from cart`}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap items-end justify-between mt-4">
                          <div className="flex items-center border border-input rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                              className="px-3 py-1 text-lg border-r border-input hover:bg-secondary transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.book.id, parseInt(e.target.value) || 1)}
                              className="w-12 py-1 text-center bg-transparent border-0 focus:outline-none focus:ring-0"
                            />
                            <button 
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                              className="px-3 py-1 text-lg border-l border-input hover:bg-secondary transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="font-medium">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="mt-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-soft border border-border overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-white mb-4"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
