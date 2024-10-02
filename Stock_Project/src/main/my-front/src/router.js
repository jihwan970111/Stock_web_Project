import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Channel from "./components/Channel";
import Login from "./components/Login_Head";
import Sign_in from "./pages/Sign_in";
const MyRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="gongji" element={<Main />} />
          <Route path="gesipan" element={<Main />} />
          <Route path="chat" element={<Channel id="test-chat-room" />} />
          <Route path="login" element={<Login/>} />
          <Route path="sign_in" element={<Sign_in/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default MyRouter;