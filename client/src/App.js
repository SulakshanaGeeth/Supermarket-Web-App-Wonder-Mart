import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//User Management Imports
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
