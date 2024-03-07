import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { format } from 'date-fns'; // Import date-fns for date formatting
import NavBar from './NavBar';

// Define a type for ordered book data
type OrderedBook = {
  id: string;
  title: string;
  subtitle?: string;
  authors?: string[]; // Make authors optional
  thumbnail?: string;
  purchaseDate: string; // Change type to string
};

const OrderedBooks: React.FC = () => {
  // Initialize state for storing ordered books
  const [orderedBooks, setOrderedBooks] = useState<OrderedBook[]>([]);

  // Fetch ordered books from local storage when component mounts
  useEffect(() => {
    const storedOrderedBooks = localStorage.getItem('purchased');
    if (storedOrderedBooks) {
      const parsedOrderedBooks: OrderedBook[] = JSON.parse(storedOrderedBooks).map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        subtitle: item.volumeInfo.subtitle,
        authors: item.volumeInfo.authors,
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
        purchaseDate: new Date().toString(), // You can use the current date or item.saleInfo.purchaseDate if available
      }));
      setOrderedBooks(parsedOrderedBooks);
    }
  }, []);

  return (
    <Container>
      <NavBar/>
      <Typography variant="h4" gutterBottom>Ordered Books</Typography>
      <List>
        {orderedBooks.map(book => (
          <div key={book.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={book.title} src={book.thumbnail || ''} />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={
                  <React.Fragment>
                    {book.subtitle && <Typography variant="subtitle1">{book.subtitle}</Typography>}
                    <Typography variant="body2">Authors: {book.authors ? book.authors.join(', ') : 'Unknown'}</Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
}

export default OrderedBooks;
