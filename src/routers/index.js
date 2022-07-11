import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Layout from "../pages/Layout";
import RequireAuth from "../pages/RequireAuth";
import Missing from "../pages/Missing";
import Unauthorized from "../pages/Unauthorized";
import Admin from "../pages/Admin";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* we want to protect these routes */}

        <Route element={<RequireAuth allowedRoles={["admin@abc.com"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};
export default MainRouter;
