// src/pages/BookListPage.js
import React from "react";
import { useBooks } from "../contexts/BookContext";
import { Grid, Container, Typography } from "@mui/material";
import BookCard from "../components/BookCard";

const BookListPage = () => {
  const { books } = useBooks();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        書籍列表
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {books.map((book) => (
          <Grid
            item
            key={book.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3} // 讓 xl 畫面也維持一列四張
          >
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookListPage;
