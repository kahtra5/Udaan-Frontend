import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./pages/Navbar.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Getall from "./pages/Getall.jsx";
import AddLeads from "./pages/Addleads.jsx";
import TrackOrders from "./pages/Trackorders.jsx";
import AddInteraction from "./pages/Addinteraction.jsx";
import AddPoc from "./pages/AddPOC.jsx";
import PendingCalls from "./pages/Pendingcalls.jsx";
import TopPerformers from "./pages/Topperformers.jsx";
import { Navigate } from "react-router-dom";




const AppWithNavbar = () => {
  const location = useLocation();



  const isLoggedin = localStorage.getItem("status") === "loggedin";

  return (
    <>
      {isLoggedin && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedin ? <Getall /> :<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getall" element={isLoggedin ? <Getall />: <Navigate to='/login'/>} />
        <Route path="/addlead" element={isLoggedin ? <AddLeads />: <Navigate to='/login'/>} />
        <Route path="/addinteraction" element={isLoggedin ? <AddInteraction />: <Navigate to='/login'/>} />
        <Route path="/addpoc" element={isLoggedin ? <AddPoc />: <Navigate to='/login'/>} />
        <Route path="/pending" element={isLoggedin ? <PendingCalls />: <Navigate to='/login'/>} />
        <Route path="/topperformers" element={isLoggedin ? <TopPerformers />: <Navigate to='/login'/>} />
        <Route path="/trackorders" element={isLoggedin ? <TrackOrders />: <Navigate to='/login'/>} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppWithNavbar />
    </BrowserRouter>
  </StrictMode>
);
