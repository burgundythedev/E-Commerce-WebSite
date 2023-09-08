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
import { Helmet } from "react-helmet";

const App = () => {
  <Helmet>
    <meta charSet="utf-8" />
    <title>E-COMMERCE</title>
    <link
      rel="canonical"
      href="https://burgundythedev.github.io/e-commerceweb/"
    />
  </Helmet>;
  return (
    <React.Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="e-commerceweb/" element={<Home />} />
          <Route path="e-commerceweb/contact" element={<Contact />} />
          <Route path="e-commerceweb/login" element={<Login />} />
          <Route path="e-commerceweb/register" element={<Register />} />
          <Route path="e-commerceweb/reset" element={<Reset />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="e-commerceweb/product-details/:id"
            element={<ProductDetails />}
          />
          <Route path="e-commerceweb/products" element={<Product />} />
          <Route path="e-commerceweb/cart" element={<Cart />} />
          <Route
            path="e-commerceweb/checkout-details"
            element={<CheckoutDetails />}
          />
          <Route
            path="e-commerceweb/checkout-summary"
            element={<CheckoutSummary />}
          />
          <Route
            path="e-commerceweb/checkout-success"
            element={<CheckoutSuccess />}
          />
          <Route
            path="e-commerceweb/order-history"
            element={<OrderHistory />}
          />
          <Route
            path="e-commerceweb/order-details/:id"
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
