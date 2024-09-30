import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login_Head() {
    const navigateTo = useNavigate();
    const [isEmailLogin, setIsEmailLogin] = useState(true);

    const toggleLoginMethod = (useEmail) => {
        setIsEmailLogin(useEmail);
    }

    return (
        <div>
            <div>
                <img src='https://flexible.img.hani.co.kr/flexible/normal/761/571/imgdb/original/2024/0329/20240329501901.jpg' alt="logo" />
            </div>
            <div>
                <button onClick={() => toggleLoginMethod(true)}>
                    이메일 로그인
                </button>
                <button onClick={() => toggleLoginMethod(false)}>
                    휴대폰번호 로그인
                </button>
            </div>
            {isEmailLogin ? (
                <div>
                    <h3>이메일 로그인</h3>
                    <input type="email" placeholder="이메일 입력" />
                    <input type="password" placeholder="비밀번호 입력" />
                    <button>로그인</button>
                    <div>
                        <a href="#">아이디·비밀번호 찾기</a>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>휴대폰번호 로그인</h3>
                    <input type="tel" placeholder="휴대폰번호 입력" />
                    <button>인증번호 발송</button>
                </div>
            )}
            <br />
            <div>
            <button onClick={() => navigateTo('/sign_in')}>회원가입</button>
            </div>
        </div>
    );
}
