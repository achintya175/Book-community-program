
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  genre: string[];
  rating: number;
  publishDate: string;
  pages: number;
  isbn: string;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
}

export enum AuthView {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  FORGOT_PASSWORD = 'forgot_password'
}
