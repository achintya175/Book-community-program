
import { Book, Review } from './types';

// Sample reviews
export const sampleReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 5,
    text: 'This book completely changed my perspective on life. The characters are so well developed and the story is captivating from start to finish.',
    date: '2023-11-15'
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    rating: 4,
    text: 'Beautifully written with an engaging plot. I couldn\'t put it down and finished it in one sitting.',
    date: '2023-10-28'
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'Sarah Johnson',
    rating: 5,
    text: 'The author has a unique writing style that pulls you in from the first page. Highly recommend!',
    date: '2023-09-17'
  },
];

// Sample books data
export const books: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: 'Elizabeth Blackwood',
    description: 'In the quiet town of Millfield, strange echoes begin to haunt the residents, bringing back forgotten memories and unveiling dark secrets. When local librarian Maya discovers an ancient book that seems connected to the phenomenon, she embarks on a journey to uncover the truth before the echoes consume everyone she loves.\n\nBlackwood\'s masterful storytelling weaves together elements of mystery, supernatural suspense, and human connection in this unforgettable tale about the power of memory and the weight of unspoken words.',
    price: 18.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Mystery', 'Supernatural', 'Fiction'],
    rating: 4.7,
    publishDate: '2023-04-15',
    pages: 348,
    isbn: '978-1234567890',
    featured: true
  },
  {
    id: '2',
    title: 'Whispers of the Cosmos',
    author: 'Dr. Adrian Nash',
    description: 'An exploration of humanity\'s place in the universe, examining cutting-edge astronomical discoveries and their philosophical implications. Dr. Nash combines scientific rigor with accessible prose to guide readers through complex cosmic concepts and their meaning for our existence.',
    price: 24.99,
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Science', 'Philosophy', 'Non-fiction'],
    rating: 4.5,
    publishDate: '2022-11-08',
    pages: 412,
    isbn: '978-0987654321'
  },
  {
    id: '3',
    title: 'The Art of Simplicity',
    author: 'Marie Chen',
    description: 'A guide to minimalist living in a complex world. Chen shares practical wisdom for decluttering not just your space, but your mind and schedule, creating room for what truly matters.',
    price: 16.95,
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Self-Help', 'Lifestyle', 'Non-fiction'],
    rating: 4.2,
    publishDate: '2023-01-22',
    pages: 256,
    isbn: '978-5678901234'
  },
  {
    id: '4',
    title: 'Kingdoms of Sand and Stone',
    author: 'Marcus Reid',
    description: 'In a desert empire where water is more precious than gold, a young ruler must navigate political intrigue, ancient magic, and her own heart to save her people from drought and destruction.',
    price: 22.99,
    coverImage: 'https://images.unsplash.com/photo-1531541518660-325ca576ead6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Fantasy', 'Adventure', 'Young Adult'],
    rating: 4.8,
    publishDate: '2022-06-30',
    pages: 480,
    isbn: '978-2468013579',
    featured: true
  },
  {
    id: '5',
    title: 'Code & Culture',
    author: 'Sophia Patel',
    description: 'An examination of how programming languages shape thought patterns and cultural development in the digital age. Patel combines technical knowledge with cultural analysis in this groundbreaking study.',
    price: 29.99,
    coverImage: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Technology', 'Cultural Studies', 'Non-fiction'],
    rating: 4.6,
    publishDate: '2023-03-14',
    pages: 375,
    isbn: '978-1357924680'
  },
  {
    id: '6',
    title: 'Midnight in the Garden District',
    author: 'James Holden',
    description: 'A noir detective story set in New Orleans. When a prominent family\'s heirloom goes missing, private investigator Lila Monroe is drawn into a web of old vendettas and buried secrets.',
    price: 19.95,
    coverImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Mystery', 'Thriller', 'Fiction'],
    rating: 4.3,
    publishDate: '2022-09-20',
    pages: 320,
    isbn: '978-9876543210'
  },
  {
    id: '7',
    title: 'Beyond the Horizon',
    author: 'Amara Washington',
    description: 'A collection of interconnected short stories following characters who face moments of profound change. From New York to Tokyo to Rio, these tales explore how people redefine themselves when everything they know is called into question.',
    price: 17.50,
    coverImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Literary Fiction', 'Short Stories', 'Contemporary'],
    rating: 4.4,
    publishDate: '2023-02-10',
    pages: 284,
    isbn: '978-3692581470',
    featured: true
  },
  {
    id: '8',
    title: 'The Sustainable Kitchen',
    author: 'Liam Torres',
    description: 'A cookbook and guide to environmentally conscious eating. Torres, an acclaimed chef and environmental advocate, provides 100+ delicious recipes alongside practical tips for reducing food waste and making eco-friendly choices.',
    price: 32.00,
    coverImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    genre: ['Cookbook', 'Sustainability', 'Non-fiction'],
    rating: 4.9,
    publishDate: '2023-05-02',
    pages: 330,
    isbn: '978-4815162342'
  }
];

// Helper function to get a book by ID
export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

// Get featured books
export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};
