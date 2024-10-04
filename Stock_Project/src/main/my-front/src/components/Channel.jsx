import React, { useState, useRef, useEffect } from "react";
import { db, firebase } from "../lib/firebase"; // Firebase 설정 경로
import { useFirestoreQuery } from "../lib/hooks"; // Firestore 훅 경로 확인
import { BiSend } from "react-icons/bi"; // BiSend 아이콘 임포트
import Message from "./Message"; // Message 컴포넌트 임포트
import useUsernameStore from '../store'; // zustand에서 사용자 정보 가져오기

const Channel = ({ id = null }) => {
  const messagesRef = db.collection('messages');
  const messages = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "desc").limit(1000)
  );

  const { username, email } = useUsernameStore(); // zustand에서 username과 email 가져오기

  useEffect(() => {
    console.log("Submitting message with username:", username); // 값 확인
    console.log("Submitting message with email:", email);       // 값 확인
  }, [username, email]);

  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef();
  const bottomListRef = useRef();

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (!email || !username ) {
      console.error('로그인 정보가 없습니다.');
      alert('로그인 후 다시 시도해 주세요.');
      return;
    }

    if (trimmedMessage) {
      await messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: email, // 이메일을 uid로 저장
        displayName: username, // 실제 사용자 이름 저장
        photoURL: "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png", // 실제 사용자 프로필 사진
        isRead: false,
      });

      setNewMessage("");
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <ul>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map((message) => (
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
            onChange={handleOnChange}
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
