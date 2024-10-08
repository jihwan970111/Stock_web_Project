import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';

export default function FindAccount() {
    const [isFindId, setIsFindId] = useState(true); // true면 아이디 찾기, false면 비밀번호 찾기
    const [email, setEmail] = useState('');
    const auth = getAuth();
    const navigateTo = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 아이디 이름과 전화번호를 통해 알아내기
    const handleFindId = async () => {
        try {
            const usersRef = db.collection('users');
            const querySnapshot = await usersRef
                .where('name', '==', name)
                .where('phone', '==', phone)
                .get();

                if (querySnapshot.size > 1) {
                    const emails = [];
                    querySnapshot.forEach(doc => {
                        emails.push(doc.data().email);
                    });
                    alert(`해당 정보와 일치하는 아이디는 다음과 같습니다:\n${emails.join('\n')}`);
                } else if (!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        alert(`아이디는: ${doc.data().email} 입니다`);
                    });
                } else {
                    setErrorMessage('일치하는 사용자를 찾을 수 없습니다.');
                }
                navigateTo('/login');
        } catch (error) {
            console.error('아이디 찾기 오류:', error);
            setErrorMessage('아이디 찾기 중 오류가 발생했습니다.');
        }
    };

    // 비밀번호 재설정 이메일 보내기
    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('비밀번호 재설정 이메일을 전송했습니다.');
            navigateTo('/login');
        } catch (error) {
            console.error('비밀번호 재설정 오류:', error.message);
            alert('비밀번호 재설정 실패: ' + error.message);
        }
    };

    // 페이지 전환 함수
    const toggleFindMethod = (findId) => {
        setIsFindId(findId);
    };

    return (
        <div>
            <div>
                <button onClick={() => toggleFindMethod(true)}>아이디 찾기</button>
                <button onClick={() => toggleFindMethod(false)}>비밀번호 찾기</button>
            </div>

            {isFindId ? (
                <div>
                    <h3>아이디 찾기</h3>
                    <input
                        type="text"
                        placeholder="이름 입력"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="휴대폰 번호 입력"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={handleFindId}>아이디 찾기</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            ) : (
                <div>
                    <h3>비밀번호 찾기</h3>
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handlePasswordReset}>비밀번호 재설정</button>
                </div>
            )}
        </div>
    );
}
