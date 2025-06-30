import React from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import { Grid, Typography } from '@mui/material';

const CategoryPage = () => {
  const { category } = useParams();
  const { books } = useBooks();

  const filteredBooks = books.filter((book) => book.category === category);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        分類：{category}
      </Typography>
      {filteredBooks.length === 0 ? (
        <Typography variant="body1">這個分類目前沒有書籍。</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CategoryPage;
