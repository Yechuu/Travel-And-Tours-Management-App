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
import { useLocation } from "react-router-dom";
import MainLayout from "./auth/MainLayout";
import AuthLayout from "./auth/AuthLayout";
import CreateDestinationForm from "./pages/CreateDestinationForm/CreateDestinationForm";
import CreatePackageForm from "./pages/CreatePackages/CreatePackages";
import CreateItinerariesForm from "./pages/CreateItineraries/CreateItineraries";
import EmailVerificationPage from "./pages/EmailVerificationPage/EmailVerificationPage"
import ResendVerification from "./pages/ResendVerification/ResendVerification";
import { PriceFilterProvider } from "./contexts/PriceFilterContext";
import DeleteDestinationForm from "./pages/DeleteDestination/DeleteDestination"; 
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Main app layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          {/* <Route path="/tours/:destinationId" element={<Tours />} /> */}
          <Route path="/tour-details/:tourPackageId" element={<TourDetails />} />
          <Route path="/tours/:destinationId" element={<PriceFilterProvider> <Tours /></PriceFilterProvider>}/>
          <Route path="/booking/:packageId" element={<Booking />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="gallery" element={<PhotoGallery />} />
          <Route path="add-destinations" element={< CreateDestinationForm/>} />
          <Route path="add-packages" element={<CreatePackageForm />} />
          <Route path="add-itineraries" element={<CreateItinerariesForm />} />
          <Route path="delete" element={<DeleteDestinationForm />} />

        </Route>

        {/* Auth layout (no header) */}
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
          <Route path="resend-verification" element={<ResendVerification />} />

        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
