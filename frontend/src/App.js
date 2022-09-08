import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {getGlobalState} from './GlobalState'
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to={getGlobalState('loggedIn')?"/home":'/login'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
