import React from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, AdminRoute } from "./components/index";
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  Admin,
  ProductDetails,
  Product,
  Cart,
  CheckoutDetails,
  CheckoutSuccess,
  CheckoutSummary,
  OrderHistory,
  OrderDetails,
  NotFound,
} from "./pages/index";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/E-Commerce-WebSite" element={<Home />} />
          <Route path="/E-Commerce-WebSite/contact" element={<Contact />} />
          <Route path="/E-Commerce-WebSite/login" element={<Login />} />
          <Route path="/E-Commerce-WebSite/register" element={<Register />} />
          <Route path="/E-Commerce-WebSite/reset" element={<Reset />} />
          <Route
            path="/E-Commerce-WebSite/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/E-Commerce-WebSite/product-details/:id"
            element={<ProductDetails />}
          />
          <Route path="/E-Commerce-WebSite/products" element={<Product />} />
          <Route path="/E-Commerce-WebSite/cart" element={<Cart />} />
          <Route
            path="/E-Commerce-WebSite/checkout-details"
            element={<CheckoutDetails />}
          />
          <Route
            path="/E-Commerce-WebSite/checkout-summary"
            element={<CheckoutSummary />}
          />
          <Route
            path="/E-Commerce-WebSite/checkout-success"
            element={<CheckoutSuccess />}
          />
          <Route
            path="/E-Commerce-WebSite/order-history"
            element={<OrderHistory />}
          />
          <Route
            path="/E-Commerce-WebSite/order-details/:id"
            element={<OrderDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
