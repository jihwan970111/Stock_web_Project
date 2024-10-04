import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiSend } from "react-icons/bi";
import Message from "./Message"; // Message 컴포넌트 임포트
import useUsernameStore from '../store'; // zustand에서 사용자 정보 가져오기

const Channel = ({ id = null }) => {
  const { username, email } = useUsernameStore(); // zustand에서 username과 email 가져오기
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const bottomListRef = useRef();

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/messages');
      setMessages(response.data);  // 메시지 상태 업데이트
    } catch (error) {
      console.error('메시지 조회 오류: ', error);
    }
  };

  useEffect(() => {
    fetchMessages();  // 컴포넌트 마운트 시 메시지 조회
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    
    // 이메일이 'unknown'이거나 빈 값일 경우 처리
    if (!email || email === 'unknown' || !username) {
      alert('로그인 후 다시 시도해 주세요.');
      return;
    }

    if (trimmedMessage) {
      try {
        await axios.post('http://localhost:8080/api/messages/send', {
          text: trimmedMessage,
          uid: email,
          displayName: username,
          photoURL: "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
        });
        setNewMessage("");  // 메시지 입력창 초기화
        fetchMessages();  // 메시지 다시 불러오기
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("메시지 전송 오류: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <ul>
            {messages?.map((message) => (
              <li key={message.id}>
                <Message {...message} />
              </li>
            ))}
          </ul>
          <div ref={bottomListRef} className="mb-16" />
        </div>
      </div>

      <div className="w-full z-20 pb-safe bottom-0 fixed md:max-w-xl p-4 bg-gray-50">
        <form onSubmit={handleOnSubmit} className="flex">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메세지를 입력하세요"
            className="border rounded-full px-4 h-10 flex-1 mr-1 ml-1"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="rounded-full bg-red-400 h-10 w-10"
          >
            <BiSend className="text-white text-xl w-10" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Channel;
