import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//User Management Imports
import Register from "./components/UserManagement/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
