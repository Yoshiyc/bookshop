// src/pages/EditProfilePage.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

function EditProfilePage() {
  const { currentUser, updateProfileInfo } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileInfo(displayName);
    setOpen(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        編輯會員資料
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="會員名稱"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          儲存
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpen(false)}>
          資料已更新
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditProfilePage;
