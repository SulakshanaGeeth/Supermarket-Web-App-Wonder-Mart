import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./routes/PrivateRoute";

//User Management Imports
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import EditProfile from "./components/UserManagement/EditProfile";
import AdminDashboard from "./components/AdminDashboard";
// import CustomerHome from "./components/UserManagement/CustomerHome";
// import AdminHome from "./components/AdminHome";

//Product managemet Imports
// import Header from "./components/Header";
import Home from "./components/Home";
import AddProduct from "./components/Product/AddProduct";
import About from "./components/About";
// import Products from "./components/Product/Products";
import ProductDetail from "./components/Product/ProductDetail";

//Product delivery Imports
// import AllDperson from "./components/DeliveryManagement/AllDperson";
import DpersonEdit from "./components/DeliveryManagement/Dedit";
import AddDeperson from "./components/DeliveryManagement/AddDperson";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        {/* Product Routes */}
        <Route path="/home" element={<Home />} exact />

        <Route path="/addProduct" element={<AddProduct />} exact />

        <Route
          path="/admin-dashboard/:username/products"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} exact />

        <Route
          path="/admin-dashboard/:username/products/:id"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* User Routes */}
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<EditProfile />} />

        <Route
          path="/admin-dashboard/:username/customerHome"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard/:username/adminHome"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Login />} />

        {/* Delivery Routes */}
        <Route path="/addPerson" element={<AddDeperson />} />

        <Route
          path="/admin-dashboard/:username/allPersons"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/edit/:id" element={<DpersonEdit />} />
      </Routes>
    </div>
  );
}

export default App;
