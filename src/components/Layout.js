// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Box sx={{ bgcolor: "#f5f5f5", borderBottom: 1, borderColor: "divider" }}>
        <Sidebar horizontal /> {/* 傳遞 props 控制水平排版 */}
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
