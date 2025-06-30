// src/components/NavBar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [logoutMsg, setLogoutMsg] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutMsg(true);
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            書籍購物網站
          </Typography>
          <Button color="inherit" onClick={() => navigate("/books")}>
            書籍一覽
          </Button>
          <Button color="inherit" onClick={() => navigate("/add")}>
            上架書籍
          </Button>
          <Button color="inherit" onClick={() => navigate("/cart")}>
            購物車
          </Button>
          {currentUser ? (
            <>
              <Button color="inherit" onClick={() => navigate("/profile")}>
                {currentUser.displayName || "會員資料"}
              </Button>
              <Typography sx={{ mx: 1 }}>{currentUser.email}</Typography>
              <Button color="inherit" onClick={handleLogout}>
                登出
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                登入
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                註冊
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={logoutMsg}
        autoHideDuration={3000}
        onClose={() => setLogoutMsg(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" onClose={() => setLogoutMsg(false)}>
          您已登出
        </Alert>
      </Snackbar>
    </>
  );
}

export default NavBar;
