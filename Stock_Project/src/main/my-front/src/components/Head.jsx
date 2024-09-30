import React from 'react';
import styles from './Head.module.css';

export default function Head() {
    return (
        <div className={styles.head_container}>
            <h1>주식의 이야기</h1>
            <div className={styles.button_container}>
                <button>회원 가입</button>
                <button>로그인</button>
            </div>
        </div>
    );
}