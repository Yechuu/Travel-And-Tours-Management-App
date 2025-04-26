// MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the child route */}
      <Footer />
    </>
  );
}

export default MainLayout;