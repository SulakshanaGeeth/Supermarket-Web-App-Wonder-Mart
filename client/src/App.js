import Header from "./components/Header"
import React from "react";
import {Route, Routes} from 'react-router-dom'
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import About from "./components/About"
import Products from "./components/Product/Products"
import ProductDetail from "./components/Product/ProductDetail";
function App() {
    return <React.Fragment>
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
    </React.Fragment>
}

export default App;
