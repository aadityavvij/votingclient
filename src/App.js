import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from "./pages/Projects/Projects";
import CreateProject from "./pages/CreateProject/CreateProject";
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import Project from "./pages/Project/Project";


function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Projects/>} />
        <Route path="/CreateProject" element={<CreateProject/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/project/:id" element={<Project />} />
      </Routes>
      
    </div>
  );
}

export default App;
