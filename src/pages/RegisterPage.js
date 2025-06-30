import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register({ email, password, displayName });
    if (result) {
      setSuccessMsg("註冊成功！");
      setTimeout(() => navigate("/"), 1500);
    } else {
      alert("該 Email 已被註冊，請使用其他帳號");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        會員註冊
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="會員名稱"
          fullWidth
          margin="normal"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <TextField
          label="電子郵件"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="密碼"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          註冊
        </Button>
      </Box>
      <Snackbar
        open={Boolean(successMsg)}
        autoHideDuration={2000}
        onClose={() => setSuccessMsg("")}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;
