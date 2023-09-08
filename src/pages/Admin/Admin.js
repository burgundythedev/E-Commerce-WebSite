import React from "react";
import "./Admin.scss";
import { Routes, Route } from "react-router-dom";
import NavBarAdmin from "../../components/Admin/NavBar/NavBarAdmin";
import HomeAdmin from "../../components/Admin/Home/HomeAdmin";
import AddProduct from "../../components/Admin/Product/AddProduct";
import Orders from "../../components/Admin/Orders/Orders";
import ViewProduct from "../../components/Admin/Product/ViewProduct";
import OrdersDetails from "../../components/Admin/Orders/OrdersDetails";

const Admin = () => {
  return (
    <div className="admin">
      <nav className="admin__navbar">
        <NavBarAdmin />
      </nav>
      <div className="admin__content">
        <Routes>
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/product/:id" element={<AddProduct />} />
          <Route path="/admin/viewproducts" element={<ViewProduct />} />
          <Route path="/admin/orders-details/:id" element={<OrdersDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
