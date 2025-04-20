import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Tours from "./pages/Tours/Tours";
import TourDetails from "./pages/Tours/TourDetails";
import Booking from "./pages/Booking/Booking";
import Destinations from "./pages/Destinations/Destinations";
import PhotoGallary from "./pages/PhotoGallery/PhotoGallery";
import PhotoGallery from "./pages/PhotoGallery/PhotoGallery";
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import { AuthProvider } from "./auth/AuthContext";
function App() {
  return (
    <AuthProvider>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tour-details" element={<TourDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="gallery" element={<PhotoGallery />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

      </Routes>
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;
