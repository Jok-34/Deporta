import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchFields from "../pages/SearchFields";
import RegisterComplex from "../pages/RegisterComplex";
import RegisterSuccess from "../pages/RegisterSuccess";
import RegisterSportSpace from "../pages/RegisterSportSpace";
import RegisterSportSpaceSuccess from "../pages/RegisterSportSpaceSuccess";
import Dashboard from "../pages/Dashboard";
import ReservationGuide from "../pages/ReservationGuide";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchFields />} />
        <Route path="/register-complex" element={<RegisterComplex />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/register-sport-space" element={<RegisterSportSpace />} />
        <Route path="/register-sport-space-success" element={<RegisterSportSpaceSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservation-guide"element={<ReservationGuide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;