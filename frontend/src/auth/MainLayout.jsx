// MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Common/Header/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the child route */}
    </>
  );
}

export default MainLayout;