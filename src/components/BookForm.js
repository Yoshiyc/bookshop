// src/components/BookForm.js
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { categories } from "../data/categories";

const MAX_IMAGE_SIZE_MB = 1;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const BookForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    translator: "",
    publisher: "",
    publishDate: "",
    price: "",
    category: "前端",
    description: "",
    image: "",
    ...initialData,
  });

  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (initialData.image) {
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setImageError("只接受 JPG 或 PNG 圖片");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setImageError("圖片大小不可超過 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
      setImagePreview(reader.result);
      setImageError("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? "編輯書籍" : "新增書籍"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="title"
              label="書名"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="author"
              label="作者"
              fullWidth
              required
              value={formData.author}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="translator"
              label="譯者"
              fullWidth
              value={formData.translator}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="publisher"
              label="出版社"
              fullWidth
              value={formData.publisher}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="publishDate"
              label="出版日期"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.publishDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              label="價格"
              type="number"
              fullWidth
              required
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="category"
              label="分類"
              select
              fullWidth
              required
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="簡介"
              multiline
              rows={3}
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              上傳圖片
              <input
                type="file"
                hidden
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </Button>
            {imageError && (
              <Typography color="error" variant="body2" mt={1}>
                {imageError}
              </Typography>
            )}
            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="預覽圖"
                  style={{ width: "150px", height: "auto", borderRadius: 4 }}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            儲存
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BookForm;
