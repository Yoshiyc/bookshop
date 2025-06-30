// src/pages/CartPage.js
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, backgroundColor: "#fff" }}>
        <Typography variant="h5" gutterBottom>
          購物車
        </Typography>
        {cartItems.length === 0 ? (
          <Typography>您的購物車是空的。</Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2, backgroundColor: "#fff" }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>價格：${item.price}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton onClick={() => decrementQuantity(item.id)}><Remove /></IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton onClick={() => incrementQuantity(item.id)}><Add /></IconButton>
                    <IconButton onClick={() => removeFromCart(item.id)}><Delete color="error" /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Typography sx={{ mt: 2 }}>總金額：<strong>${getTotalPrice()}</strong></Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/thank-you")}
            >
              結帳
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CartPage;
