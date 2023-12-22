import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ScrollToTopButton from "./Components/ScrollToTop/ScrollToTopButton";
import Footer from "./Components/Footer/Footer";

axios.defaults.baseURL =
  "https://furniture-store-zdenko-markovics-projects.vercel.app/";

function App() {
  const [cartDisplay, setCartDisplay] = useState(false);

  return (
    <>
      <Navbar setCartDisplay={setCartDisplay} />
      {cartDisplay && <Cart setCartDisplay={setCartDisplay} />}
      <ScrollToTop />
      <Outlet />
      <ScrollToTopButton />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
