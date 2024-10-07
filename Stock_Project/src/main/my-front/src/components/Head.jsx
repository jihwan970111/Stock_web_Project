import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Head.module.css';
import useUsernameStore from '../store';
export default function Head() {
    const { username, updateUsername } = useUsernameStore();
    const navigateTo = useNavigate();

    const logout = () => {
        updateUsername('unknown');
        alert('로그아웃 되었습니다!'); 
    }
    return (
        <div className={styles.head_container}>
            <h1>주식의 이야기</h1>
            {username==="unknown" ? (
                <div className={styles.button_container}>
                    <button onClick={() => navigateTo('/sign_in')}>회원가입</button>
                    <button onClick={() => navigateTo('/login')}>로그인</button>
                </div>
            )
            : (
                <div className={styles.button_container}>
                    {username}
                    <button onClick={logout}>로그아웃</button>
                </div>
            )}
            </div>
    );
}