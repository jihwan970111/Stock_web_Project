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

    const interval = setInterval(() => {
        fetchMessages();  // 5초마다 메시지 갱신
    }, 5000);

    return () => clearInterval(interval);  // 컴포넌트가 언마운트되면 인터벌을 정리
  }, []);
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    
    if (!email || email === 'unknown' || !username) {
      alert('로그인 후 다시 시도해 주세요.');
      return;
    }

    if (trimmedMessage) {
      try {
        const response = await axios.post('http://localhost:8080/api/messages/send', {
          text: trimmedMessage,
          uid: email,
          displayName: username,
          photoURL: "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
        });
        
        const sentMessage = response.data;  // 서버에서 반환된 메시지 데이터
        setMessages(prevMessages => [...prevMessages, sentMessage]);  // 기존 메시지에 새 메시지 추가
        
        setNewMessage("");  // 메시지 입력창 초기화
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });  // 스크롤 자동 이동
      } catch (error) {
        console.error("메시지 전송 오류: ", error);
      }
    }
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <ul>
          {messages?.map((message) => (
            <li key={message.id}>
              <Message {...message} />
            </li>
          ))}
        </ul>
        <div ref={bottomListRef} />
      </div>

      <div style={{ borderTop: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>
        <form onSubmit={handleOnSubmit} style={{ display: 'flex' }}>
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메세지를 입력하세요"
            style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
          />
          <button
            type="submit"
            disabled={!newMessage}
            style={{ backgroundColor: '#ff4d4d', color: 'white', borderRadius: '5px', padding: '10px 15px' }}
          >
            <BiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Channel;
