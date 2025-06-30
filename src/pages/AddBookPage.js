// src/pages/AddBookPage.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Paper,
  InputLabel,
  Select,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import { useAuth } from "../contexts/AuthContext";
import { categories } from "../data/categories";

const AddBookPage = () => {
  const { addBook } = useBooks();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [translator, setTranslator] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      translator,
      publisher,
      publishDate,
      price,
      category,
      description,
      image,
      ownerId: currentUser.uid,
      ownerName: currentUser.displayName,
    };
    addBook(newBook);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("圖片大小不可超過 2MB");
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (img.width > 200 || img.height > 200) {
        alert("圖片尺寸不可超過 200x200");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, backgroundColor: "#fff" }}>
        <Typography variant="h5" gutterBottom>
          新增書籍
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField label="書名 *" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField label="作者 *" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} required />
          <TextField label="譯者" fullWidth value={translator} onChange={(e) => setTranslator(e.target.value)} />
          <TextField label="出版社" fullWidth value={publisher} onChange={(e) => setPublisher(e.target.value)} />
          <TextField
            label="出版日期"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
          <TextField
            label="價格 *"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <FormControl fullWidth required>
            <InputLabel>分類 *</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} label="分類 *">
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="簡介"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button variant="contained" component="label">
              上傳圖片
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            <Typography variant="caption" color="text.secondary">
              僅限 JPG/PNG，最大尺寸 200x200 像素，大小限 2MB
            </Typography>
            {image && (
              <Box>
                <img
                  src={image}
                  alt="預覽圖片"
                  style={{ width: 100, height: 100, objectFit: "cover", marginTop: 8 }}
                />
                <Button size="small" color="error" onClick={() => setImage(null)} sx={{ mt: 1 }}>
                  移除圖片
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ width: "100%", mt: 2 }}>
            <Button type="submit" variant="contained">
              儲存
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          書籍已成功新增！
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddBookPage;
