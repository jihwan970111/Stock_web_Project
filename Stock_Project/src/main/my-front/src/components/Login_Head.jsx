import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase'; // Firebase 설정 임포트
import useUsernameStore from '../store';


export default function Login_Head() {
    const { updateUsername } = useUsernameStore();
    const navigateTo = useNavigate();
    const [isEmailLogin, setIsEmailLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    // 이메일/비밀번호 로그인 처리 함수
    const handleEmailLogin = async () => {
        try {
            // Firebase Authentication 로그인 시도
            await auth.signInWithEmailAndPassword(email, password);
            alert('로그인 성공');
            updateUsername(email);
            navigateTo('/'); // 로그인 성공 후 대시보드로 이동
        } catch (error) {
            console.error('로그인 오류:', error.message);
            alert('로그인 실패: ' + error.message);
        }
    };

    // 휴대폰 번호 인증 코드 요청
    const sendVerificationCode = async () => {
        try {
            const recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container');
            const phoneProvider = new auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier);
            setVerificationId(verificationId);
            alert('인증번호가 발송되었습니다.');
        } catch (error) {
            console.error('인증번호 발송 오류:', error.message);
            alert('인증번호 발송 실패: ' + error.message);
        }
    };

    // 인증 코드로 로그인 처리
    const handlePhoneLogin = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
            await auth.signInWithCredential(credential);
            alert('휴대폰 로그인 성공');
            navigateTo('/dashboard');
        } catch (error) {
            console.error('휴대폰 로그인 오류:', error.message);
            alert('로그인 실패: ' + error.message);
        }
    };

    // 로그인 방법 토글
    const toggleLoginMethod = (useEmail) => {
        setIsEmailLogin(useEmail);
    };

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
                        <a href="#">아이디·비밀번호 찾기</a>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>휴대폰번호 로그인</h3>
                    <input
                        type="tel"
                        placeholder="휴대폰번호 입력"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={sendVerificationCode}>인증번호 발송</button>

                    <input
                        type="text"
                        placeholder="인증번호 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button onClick={handlePhoneLogin}>로그인</button>

                    <div id="recaptcha-container"></div>
                </div>
            )}

            <br />
            <div>
                <button onClick={() => navigateTo('/sign_in')}>회원가입</button>
            </div>
        </div>
    );
}
