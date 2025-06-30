// src/components/Sidebar.js
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';

const Sidebar = ({ horizontal = false }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === '全部') {
      navigate('/books');
    } else {
      navigate(`/category/${encodeURIComponent(category)}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: horizontal ? 'center' : 'flex-start',
        overflowX: horizontal ? 'auto' : 'visible',
        px: 2,
        py: 1,
        gap: 1,
      }}
    >
      {categories.map((cat) => (
        <Button key={cat} onClick={() => handleCategoryClick(cat)}>
          {cat}
        </Button>
      ))}
    </Box>
  );
};

export default Sidebar;
