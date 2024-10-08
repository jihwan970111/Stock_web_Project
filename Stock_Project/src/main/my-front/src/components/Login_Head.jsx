import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // signInWithEmailAndPassword 추가
import useUsernameStore from '../store';
import { db } from '../lib/firebase';

export default function Login_Head() {
    const { updateUsername } = useUsernameStore();
    const navigateTo = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();  // Firebase auth 인스턴스 생성

    // 이메일/비밀번호 로그인 처리 함수
    const handleEmailLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password); // 수정된 부분
            const user = userCredential.user;
            if (user) {
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const userName = userDoc.data().name || 'Unknown User'; 
                    const userEmail = user.email;
                    updateUsername(userName, userEmail);
                    alert('로그인 성공');
                    navigateTo('/');
                } else {
                    console.log('사용자 정보가 없습니다.');
                }
            }
        } catch (error) {
            console.error('로그인 오류:', error.message);
            alert('로그인 실패: ' + error.message);
        }
    };

    return (
        <div>
            <div>
                <a href='/'><img src='https://flexible.img.hani.co.kr/flexible/normal/761/571/imgdb/original/2024/0329/20240329501901.jpg' alt="logo" /></a>
            </div>

            <div>
                <h3>이메일 로그인</h3>
                <input
                    type="email"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleEmailLogin}>로그인</button>
                <div>
                    <a href="/find_account">아이디·비밀번호 찾기</a>
                </div>
            </div>

            <br />
            <div>
                <button onClick={() => navigateTo('/sign_in')}>회원가입</button>
            </div>
        </div>
    );
}
