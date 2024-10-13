import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation hook
import Header from "../ui/Header";
import Sidebar from "../ui/Sidebar";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function Layout() {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Hide the sidebar and header only on the settings page
  const hideSidebarAndHeader = location.pathname === "/settings";

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {!hideSidebarAndHeader && (
        <>
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleDarkMode={toggleDarkMode}
            darkMode={theme === "dark"}
          />
        </>
      )}
      <Outlet />
      <Toaster />
    </ThemeProvider>
  );
}

export default Layout;
