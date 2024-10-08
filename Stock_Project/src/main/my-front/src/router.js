import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Channel from "./components/Channel";
import Login from "./components/Login_Head";
import Sign_in from "./pages/Sign_in";
import FindAccount from "./components/FindAccont";
import Gongji from "./components/Gongji";
import GongjiDetail from "./pages/GongjiDetail";
const MyRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="gongji" element={<Gongji />} />
          <Route path="gongji/:id" element={<GongjiDetail />} /> {/* 동적 경로 */}
          <Route path="gesipan" element={<Gongji />} />
          <Route path="chat" element={<Channel id="test-chat-room" />} />
          <Route path="login" element={<Login/>} />
          <Route path="sign_in" element={<Sign_in/>} />
          <Route path="find_account" element={<FindAccount/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default MyRouter;