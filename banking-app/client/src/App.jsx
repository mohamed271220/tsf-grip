import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./scenes/Layout";
import Home from "./scenes/Home";
import Customer from "./scenes/Customer";
import Error from "./scenes/Error";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Routes className="app">
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App