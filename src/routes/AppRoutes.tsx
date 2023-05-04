import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/Home/Recados";
import Signup from "../pages/singup/Signup";
import { GlobalStyled } from "../themes/matrix/GlobalStyle";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AppRoutes;
