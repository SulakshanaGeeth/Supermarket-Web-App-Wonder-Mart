import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./routes/PrivateRoute";

//User Management Imports
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
// import EditProfile from "./components/UserManagement/EditProfile";
import UserProfile from "./components/UserManagement/UserProfile";
import AdminDashboard from "./components/AdminDashboard";

//Product managemet Imports
// import Header from "./components/Header";
import Home from "./components/Home";

import About from "./components/About";

//Product delivery Imports

//Cart Management
import AllProducts from "./components/Cart Management/All_Products";
import UserCart from "./components/Cart Management/UserCart";

//Payment Management
import OrderCreate from "./components/Payment Management/OrderPlacing";
import Orders from "./components/Payment Management/Orders";
import OrderView from "./components/Payment Management/OrderView";

/* Orders Management */
import ViewOrder from "./components/Order Management/ViewOrder";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        {/*  */}
        {/*  */}
        {/* User Routes */}
        {/*  */}
        {/*  */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/changePassword/"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} exact />

        <Route
          path="/admin/adminHome"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/customerHome"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/customerDetails"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orderDetails"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<Home />} exact />
        {/*  */}
        {/*  */}
        {/* Product Routes */}
        {/*  */}
        {/*  */}
        <Route
          path="/admin/addProduct/"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
          exact
        />

        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<About />} exact />

        <Route
          path="/admin/product/:id"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        {/*  */}
        {/*  */}
        {/* Cart Management */}
        {/*  */}
        {/*  */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <AllProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/Cart"
          element={
            <PrivateRoute>
              <UserCart />
            </PrivateRoute>
          }
        />

        {/*  */}
        {/*  */}
        {/* Payment Management */}
        {/*  */}
        {/*  */}

        <Route
          path="/OrderPlace"
          element={
            <PrivateRoute>
              <OrderCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/Orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route
          path="/Orders/:id"
          element={
            <PrivateRoute>
              <OrderView />
            </PrivateRoute>
          }
        />

        {/*  */}
        {/*  */}
        {/* Orders Management */}
        {/*  */}
        {/*  */}

        <Route
          path="/admin/Orders"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/OrdersView/:id"
          element={
            <PrivateRoute>
              <ViewOrder />
            </PrivateRoute>
          }
        />

        {/*  */}
        {/*  */}
        {/* Delivery Routes */}
        {/*  */}
        {/*  */}
        <Route
          path="/admin/addPerson"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/allPersons"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
