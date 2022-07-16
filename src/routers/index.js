import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Layout from "../pages/Layout";
import RequireAuth from "../pages/RequireAuth";
import Missing from "../pages/Missing";
import Unauthorized from "../pages/Unauthorized";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="Unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}

        <Route
          element={<RequireAuth allowedRoles={["Merchant", "Administrator"]} />}
        >
          <Route index element={<Home />} /> {/*子路由*/}
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};
export default MainRouter;
