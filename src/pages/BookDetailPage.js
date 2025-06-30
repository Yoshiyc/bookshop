// src/pages/BookDetailPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

const BookDetailPage = () => {
  const { id } = useParams();
  const { books } = useBooks();
  const { addToCart } = useCart();
  const book = books.find((b) => String(b.id) === String(id));

  if (!book) return <Typography>找不到這本書。</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          backgroundColor: "#fff", // ✅ 設定白底
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box
          component="img"
          src={book.image || "/default-book.jpg"}
          alt={book.title}
          sx={{
            maxHeight: 300,
            maxWidth: "100%",
            objectFit: "contain",
            mb: 3,
          }}
        />
        <CardContent sx={{ maxWidth: 600 }}>
          <Typography variant="h5" gutterBottom>
            {book.title}
          </Typography>
          <Typography>作者：{book.author}</Typography>
          <Typography>譯者：{book.translator || "無"}</Typography>
          <Typography>出版社：{book.publisher}</Typography>
          <Typography>出版日期：{book.publishDate}</Typography>
          <Typography sx={{ mt: 2 }}>簡介：{book.description}</Typography>
          <Typography sx={{ mt: 2 }}>
            價格：<strong>${book.price}</strong>
          </Typography>
          <Typography>分類：{book.category}</Typography>
          <Typography>上架者：{book.ownerName}</Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => addToCart(book)}>
            加入購物車
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetailPage;
