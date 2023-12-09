import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTenant from "./pages/createTenant";
import ShowTenant from "./pages/ShowTenant";
import EditTenant from "./pages/EditTenant";
import DeleteTenant from "./pages/DeleteTenant";
import CreateRequest from "./pages/CreateRequest";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tenants/create" element={<CreateTenant />} />
      <Route path="/tenants/details/:id" element={<ShowTenant />} />
      <Route path="/tenants/edit/:id" element={<EditTenant />} />
      <Route path="/tenants/delete/:id" element={<DeleteTenant />} />
      <Route path="/tenants/requests/:id" element={<CreateRequest />} />
    </Routes>
  );
};

export default App;
