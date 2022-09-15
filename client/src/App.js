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

import About from "./components/About";

//Product delivery Imports

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

        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <EditProfile />
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
          path="/admin/adminHome"
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
