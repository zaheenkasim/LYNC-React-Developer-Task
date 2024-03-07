import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookDetails } from "../services/api";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Box, // Import Box component
} from "@mui/material";
import { ShoppingCart, Bookmark } from "@mui/icons-material";
import NavBar from "./NavBar";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        if (!id) {
          console.error("ID is undefined");
          return;
        }

        const response = await getBookDetails(id);
        setBook(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(book);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // Set minimum height to make it full screen
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <NavBar />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={book.volumeInfo.imageLinks?.thumbnail || ""}
              alt={book.volumeInfo.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {book.volumeInfo.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {book.volumeInfo.subtitle}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
              />
              <Typography variant="body2" gutterBottom>
                Page Count: {book.volumeInfo.pageCount}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Price:{" "}
                {book.saleInfo.saleability === "FOR_SALE"
                  ? `$${book.saleInfo.listPrice.amount}`
                  : "Not for sale"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={book.saleInfo.saleability !== "FOR_SALE"}
                onClick={handleAddToCart}
                startIcon={<ShoppingCart />}
              >
                Buy
              </Button>
              <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Book added to cart!</DialogTitle>
                <DialogContent>
                  <Typography variant="body1">The book has been successfully added to your cart.</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary" autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetails;
