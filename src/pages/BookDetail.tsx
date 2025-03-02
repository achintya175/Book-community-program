
import React from 'react';
import Header from '@/components/Header';
import BookDetail from '@/components/BookDetail';

const BookDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <BookDetail />
    </div>
  );
};

export default BookDetailPage;
