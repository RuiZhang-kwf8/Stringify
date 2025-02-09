import './App.css';
import { Route, Routes } from "react-router-dom";
//import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPages";
//import Callback from "./pages/Callback";
import Dashboard from "./pages/Dashboard";
import { UserContextProvider } from "./UserContext";
import Layout from "./Layout.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
         <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
