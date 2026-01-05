import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchProfile } from "./redux/authSlice";
import ScrollToTop from "./ScrollToTop";
import Login from "./Login";
import ProductCard from "./ProductCard";
import About from "./About";
import Cartpage from "./Cartpage";
import ProductDetails from "./ProductDetails";
import Navbar from "./Navbar";
import Home from "./Home";
import HomeItems from "./HomeItems";
import OffersPage from "./Offerspage";
import Notifications from "./Notifications";
import Orderstatus from "./Orderstatus";
import Tracking from "./Trackingpage";
import Payments from "./Payments";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import FAQsPage from "./Faqs";
import InvalidOrder from "./InvalidOrder";
import Products from "./Products";
import PaymentsLogos from "./PaymentsLogos";
import Profile from './Profile';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';
import "./App.css";


function App() {
  const dispatch = useDispatch();

  //  Restore user session on refresh
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="app-layout">
      {/* <ScrollToTop /> */}
      <Navbar />
        <ScrollToTop />

      <div className="content">
        <Routes>
          {/* Main Routes */}
          <Route path="/ProductCard" element={<ProductCard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Cartpage" element={<Cartpage />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Orders" element={<Orderstatus />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/Profile" element={<Profile />} />
          {/* Offers */}
          <Route path="/offers1" element={<OffersPage />} />

          {/* Notifications */}
          <Route path="/Notifications" element={<Notifications />} />

          {/* Tracking */}
          <Route path="/TrackOrder" element={<Tracking />} />

          {/* Payments */}
          <Route path="/Payments" element={<Payments />} />

          {/* FAQs */}
          <Route path="/Faqs" element={<FAQsPage />} />

          <Route path="/Invalid" element={<InvalidOrder />} />
          <Route path="/collections/:priceLimit" element={<HomeItems />} />
          
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/Terms-Conditions" element={<TermsConditions />} />
          {/* Home */}
          <Route
            path="/Home"
            element={
              <>
                <Home />
                <HomeItems />
              </>
            }
          />

          {/* Default */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <HomeItems />
              </>
            }
          />
        </Routes>
      </div>

      <PaymentsLogos />
      <Footer />
    </div>
  );
}

export default App;
