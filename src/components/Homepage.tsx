import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/api';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Button, Box, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Bookmark, ShoppingCart } from '@mui/icons-material';
import NavBar from './NavBar';

const Homepage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleAddToBookmark = (bookId: string, name:string) => {
    const bookmarkedBooks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const newBookmarks = [...bookmarkedBooks, bookId];
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setSelectedBook(name);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container>
      <NavBar />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {books.map(book => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Card>
                    <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={book.volumeInfo.imageLinks?.thumbnail || ''}
                        alt={book.volumeInfo.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{book.volumeInfo.title}</Typography>
                        <Typography variant="subtitle2" gutterBottom>{book.volumeInfo.subtitle}</Typography>
                        <Typography variant="body2" gutterBottom>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</Typography>
                      </CardContent>
                    </Link>
                  </Card>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <IconButton onClick={() => handleAddToBookmark(book,book.volumeInfo.title)} aria-label="add to bookmarks">
                      <Bookmark />
                    </IconButton>
                    <Button component={Link} to={`/book/${book.id}`} variant="contained" color="primary">
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      {/* Dialog to show that the book has been added to the bookmark */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Book Added to Bookmark</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedBook} has been added to your bookmarks.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Homepage;
