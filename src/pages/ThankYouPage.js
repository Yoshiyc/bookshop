// src/pages/ThankYouPage.js
import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        感謝您的訂購！
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        您的訂單已成功送出，我們將盡快處理。
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        返回首頁
      </Button>
    </Container>
  );
};

export default ThankYouPage;
