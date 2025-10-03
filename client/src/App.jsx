import { Routes, Route, Navigate } from "react-router";
import { ChatPage } from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OtpVerification from "./pages/OtpVerification";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Loader from "./components/Loader.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center overflow-hidden">
      {/* DECORATORS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route path="/" element={authUser && authUser.isVerified ? (<ChatPage />) : (<Navigate to="/login"/>)} />
        <Route path="/login" element={!authUser?(<LoginPage />):(<Navigate to="/"/>)} />
        <Route path="/signup" element={ !authUser ? (<SignupPage />):(<Navigate to="/"/>)} />
        <Route path="/otp-verification" element={authUser && !authUser.isVerified ? (<OtpVerification />):(<Navigate to="/"/>)} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
