import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "./NavBar";

// Define a type for book data
type Book = {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    listPrice: {
      amount: number;
    };
  };
};

const Cart: React.FC = () => {
  // Initialize state for storing cart items and total price
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fetch cart items from local storage when component mounts
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartItems: Book[] = JSON.parse(cartData);
      setCartItems(parsedCartItems);
    }
  }, []);

  // Calculate total price of all items in the cart
  useEffect(() => {
    const total = cartItems.reduce(
      (accumulator, book) =>
        accumulator + (book.saleInfo?.listPrice?.amount || 0),
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // Function to remove a book from the cart
  const removeFromCart = (bookId: string) => {
    const updatedCart = cartItems.filter((book) => book.id !== bookId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  // Function to handle buying all items in the cart
  const handleBuyNow = () => {
    // Add all items in the cart to the purchased items in local storage
    const purchasedItems = JSON.parse(localStorage.getItem("purchased") || "[]");
    const updatedPurchasedItems = [...purchasedItems, ...cartItems];
    localStorage.setItem("purchased", JSON.stringify(updatedPurchasedItems));
    // Empty the cart
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <Container>
      <NavBar />
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cartItems.map((book) => (
        <Card key={book.id} sx={{ marginBottom: 2 }}>
          <CardContent sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 100, height: 150, marginRight: 2 }}
              image={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
            <div>
              <Typography variant="h6">{book.volumeInfo.title}</Typography>
              <Typography variant="body2">
                Price: $
                {book.saleInfo && book.saleInfo.listPrice
                  ? book.saleInfo.listPrice.amount.toFixed(2)
                  : "N/A"}
              </Typography>
            </div>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(book.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
      <Button variant="contained" onClick={handleBuyNow} disabled={cartItems.length === 0}>
        Buy Now
      </Button>
    </Container>
  );
};

export default Cart;
