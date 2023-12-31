import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.sass"
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import SideMenu from "./components/Menu/SideMenu";
import Supliers from "./pages/registrations/Suppliers/Suppliers";
import Banks from "./pages/registrations/Banks/Banks";
import Categories from "./pages/registrations/Categories/Categories";
import Clients from "./pages/registrations/Clients/Clients";
import Navbar from "./components/Navbar/Navbar";
import ToPay from "./pages/accounts/ToPay/ToPay";
import ToReceive from "./pages/accounts/ToReceive/ToReceive";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-container">
        <SideMenu />
        <Routes>
          <Route path="/">
            <Route index element={<Login />}/>
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path="*" element={<NotFound />} />
            <Route path="suppliers" element={<Supliers />} />
            <Route path="banks" element={<Banks />} />
            <Route path="categories" element={<Categories />} />
            <Route path="clients" element={<Clients />} />
            <Route path="toPay" element={<ToPay />} />
            <Route path="toReceive" element={<ToReceive />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
