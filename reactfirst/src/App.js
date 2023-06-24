import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import ForgotPswd from "./components/ForgotPswd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          {/* <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/forgotpswd' element={<ForgotPswd/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
