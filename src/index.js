// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // ✅ 導入自訂主題

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* 自動套用背景色、文字色等主題設定 */}
    <App />
  </ThemeProvider>
);
