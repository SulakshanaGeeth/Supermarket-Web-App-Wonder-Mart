

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//User Management Imports
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import EditProfile from "./components/UserManagement/EditProfile";

//Product managemet Imports

    import Header from "./components/Header"
    import Home from "./components/Home";
    import AddProduct from "./components/AddProduct";
    import About from "./components/About"
    import Products from "./components/Product/Products"
    import ProductDetail from "./components/Product/ProductDetail";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
            <header>
                <Header/>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home/> } exact />
                    <Route path="/add" element={<AddProduct/> } exact />
                    <Route path="/products" element={<Products/> } exact />
                    <Route path="/about" element={<About/> } exact />
                    <Route path="/products/:id" element={<ProductDetail/> } exact />
                </Routes>
            </main>





          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<EditProfile />} />

          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
