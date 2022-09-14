import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//User Management Imports
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import EditProfile from "./components/UserManagement/EditProfile";

//Product managemet Imports
// import Header from "./components/Header";
import Home from "./components/Home";
import AddProduct from "./components/Product/AddProduct";
import About from "./components/About";
import Products from "./components/Product/Products";
import ProductDetail from "./components/Product/ProductDetail";

//Product delivery Imports
import AllDperson from "./components/DeliveryManagement/AllDperson";
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

        <Route path="/products" element={<Products />} exact />

        <Route path="/about" element={<About />} exact />

        <Route path="/products/:id" element={<ProductDetail />} exact />

        {/* User Routes */}
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<EditProfile />} />

        <Route path="/" element={<Login />} />

        {/* Delivery Routes */}
        <Route path="/addPerson" element={<AddDeperson />} />

        <Route path="/allPersons" element={<AllDperson />} />

        <Route path="/edit/:id" element={<DpersonEdit />} />
      </Routes>
    </div>
  );
}

export default App;
