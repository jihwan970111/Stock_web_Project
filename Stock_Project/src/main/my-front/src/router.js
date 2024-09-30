import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
const MyRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="gongji" element={<Main />} />
          <Route path="gesipan" element={<Main />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default MyRouter;