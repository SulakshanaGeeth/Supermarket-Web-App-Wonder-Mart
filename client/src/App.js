import AddDeperson from "./components/AddDperson/AddDperson";
import { BrowserRouter , Routes ,Route } from "react-router-dom";
import AllDperson from "./components/ViewDperson/AllDperson";
import DpersonEdit from "./components/Dedit/Dedit";
function App() {
  return (
    
  
    
    <BrowserRouter>
      <Routes>


        <Route path="/add" element={<AddDeperson/>}/>
        <Route path="/"    element={<AllDperson/>}/>
        <Route path="/edit/:id" element={<DpersonEdit/>}/>
      
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
