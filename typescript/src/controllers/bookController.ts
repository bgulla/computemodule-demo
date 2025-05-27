import { Request, Response } from 'express';
import { Book } from '../models/book';

const books: Record<string, Book> = {};

export const addBook = (req: Request, res: Response) => {
  const userId = req.header('User-ID');
  const { title, author, publishedYear } = req.body;
  const bookId = (Math.random() * 1000000).toFixed(0);

  const newBook: Book = { title, author, publishedYear, addedBy: userId };
  books[bookId] = newBook;

  res.status(200).json({ bookId });
};

export const getBook = (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = books[bookId];

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};
