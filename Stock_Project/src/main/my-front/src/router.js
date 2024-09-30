import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Channel from "./components/Channel";
const MyRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="gongji" element={<Main />} />
          <Route path="gesipan" element={<Main />} />
          <Route path="chat" element={<Channel id="test-chat-room" />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default MyRouter;