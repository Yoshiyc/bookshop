import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Snackbar,
  CardActionArea,
  IconButton,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BookContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const defaultImage = "/default-book.jpg";

const BookCard = ({ book }) => {
  const { currentUser } = useAuth();
  const { deleteBook } = useBooks();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(book);
    setOpenSnackbar(true);
  };

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("確定要刪除這本書嗎？")) {
      deleteBook(book.id);
    }
  };

  const handleViewDetail = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <Card
      sx={{
        width: 210,
        height: 360,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "#fff", // 設定卡片背景為白色
      }}
    >
      {/* 圖片與文字可點擊 */}
      <CardActionArea onClick={handleViewDetail}>
        <Box
          sx={{
            height: 140,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <CardMedia
            component="img"
            image={book.image || defaultImage}
            alt={book.title}
            sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </Box>

        <CardContent sx={{ p: 0, mb: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            noWrap
            title={book.title}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            作者：{book.author}
          </Typography>
        </CardContent>

        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          ${book.price}
        </Typography>
      </CardActionArea>

      {/* 下方按鈕列 */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={handleAddToCart} color="primary">
          <ShoppingCartIcon />
        </IconButton>
        {currentUser?.uid === book.ownerId && (
          <Box>
            <Button size="small" onClick={handleEdit}>
              <EditIcon fontSize="small" />
            </Button>
            <Button size="small" color="error" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </Button>
          </Box>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="已加入購物車"
      />
    </Card>
  );
};

export default BookCard;
