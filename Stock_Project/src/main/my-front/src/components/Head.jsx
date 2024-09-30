import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Head.module.css';
export default function Head() {
    const navigateTo = useNavigate();
    return (
        <div className={styles.head_container}>
            <h1>주식의 이야기</h1>
            <div className={styles.button_container}>
                <button onClick={() => navigateTo('/sign_in')}>회원가입</button>
                <button onClick={() => navigateTo('login')}>로그인</button>
            </div>
        </div>
    );
}