import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

// Define a type for book data
type Book = {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
};

const Bookmarks: React.FC = () => {
  // Initialize state for storing bookmarked books
  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  // Fetch bookmarked books from local storage when component mounts
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      const parsedBookmarks: Book[] = JSON.parse(storedBookmarks);
      setBookmarks(parsedBookmarks);
    }
  }, []);

  // Function to remove a book from bookmarks
  const removeFromBookmarks = (bookId: string) => {
    const updatedBookmarks = bookmarks.filter(book => book.id !== bookId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Update local storage
  };

  return (
    <Container>
      <NavBar />
      <Typography variant="h4" gutterBottom>Bookmarks</Typography>
      <Grid container spacing={3}>
        {bookmarks.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={book.volumeInfo.imageLinks?.thumbnail || ''}
                  alt={book.volumeInfo.title}
                />
                <CardContent>
                  <Typography variant="h6">{book.volumeInfo.title}</Typography>
                  {book.volumeInfo.subtitle && (
                    <Typography variant="subtitle1">{book.volumeInfo.subtitle}</Typography>
                  )}
                  <Typography variant="body2">Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</Typography>
                </CardContent>
              </Link>
              <IconButton onClick={() => removeFromBookmarks(book.id)} aria-label="delete">
                <Delete />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Bookmarks;
