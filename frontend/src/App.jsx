import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log("Online Users : ", onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      
      <Navbar />

      <Routes>
        <Route path="/" element={ authUser ?  <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={ !authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ?  <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
