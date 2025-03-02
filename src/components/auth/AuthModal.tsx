
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { AuthView } from '@/utils/types';

interface AuthModalProps {
  defaultView?: AuthView;
  trigger?: React.ReactNode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  defaultView = AuthView.SIGN_IN,
  trigger 
}) => {
  const [view, setView] = useState<AuthView>(defaultView);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate authentication process
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      console.log('User signed in');
    }, 1500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      setView(AuthView.SIGN_IN);
      console.log('User signed up');
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate password reset process
    setTimeout(() => {
      setLoading(false);
      setView(AuthView.SIGN_IN);
      console.log('Password reset email sent');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="relative">
          <button 
            onClick={() => setOpen(false)}
            className="absolute right-0 top-0 p-1 rounded-full hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-center font-serif text-2xl">
            {view === AuthView.SIGN_IN && 'Welcome Back'}
            {view === AuthView.SIGN_UP && 'Create an Account'}
            {view === AuthView.FORGOT_PASSWORD && 'Reset Your Password'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {view === AuthView.SIGN_IN && 'Sign in to your account to continue'}
            {view === AuthView.SIGN_UP && 'Fill in your details to create an account'}
            {view === AuthView.FORGOT_PASSWORD && "Enter your email and we'll send you a reset link"}
          </DialogDescription>
        </DialogHeader>

        {(view === AuthView.SIGN_IN || view === AuthView.SIGN_UP) && (
          <Tabs defaultValue={view} className="w-full" onValueChange={(value) => setView(value as AuthView)}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value={AuthView.SIGN_IN}>Sign In</TabsTrigger>
              <TabsTrigger value={AuthView.SIGN_UP}>Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value={AuthView.SIGN_IN} className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button 
                      type="button"
                      onClick={() => setView(AuthView.FORGOT_PASSWORD)}
                      className="text-xs text-accent hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value={AuthView.SIGN_UP} className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}

        {view === AuthView.FORGOT_PASSWORD && (
          <div className="space-y-4 animate-fade-in">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input id="reset-email" type="email" placeholder="your@email.com" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Reset Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setView(AuthView.SIGN_IN)}
                  className="text-sm text-accent hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
