import React from "react";
import PropTypes from "prop-types";
import { timeFormat } from "../utils/timeFormat"; // 유틸리티 함수 임포트

const Message = ({
  createdAt = null,
  uid = "",
  text = "",
  displayName = "",
  photoURL = "",
  isRead = false,
}) => {
  const currentUser = { id: "currentUser?.id" }; // 로그인된 사용자 정보를 대신함

  if (!text) return null;

  return (
    <div
      className={`flex items-start flex-wrap p-4 ${
        uid === currentUser?.id && "flex-row-reverse"
      }`}
    >
      {currentUser?.id !== uid && (
        <div className={`w-10 ${uid === currentUser.id ? "" : "mr-2"}`}>
          <img
            src={photoURL || "/gray.png"}
            alt="Avatar"
            className="rounded-full mr-4 h-10 w-10"
          />
        </div>
      )}

      <div
        className={`p-2 rounded-lg ${
          uid === currentUser.id ? "bg-red-400 text-white" : "bg-gray-100"
        }`}
      >
        {text}
      </div>
      <div className="text-gray-400 text-xs mx-2 flex flex-col">
        {createdAt?.seconds ? (
          <span className={`text-gray-500 text-xs ${uid === currentUser?.id && "flex-row-reverse"}`}>
            {isRead === false && uid === currentUser.id && (
              <div className="text-right text-xs text-red-400">1</div>
            )}
            {/* timeFormat 함수를 사용하여 시간 표시 */}
            {timeFormat(new Date(createdAt.seconds * 1000))}
          </span>
        ) : null}
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;