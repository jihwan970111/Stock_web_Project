import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
    const navigateTo = useNavigate();
    return (
        <div className={styles.menu_container}>
            <button onClick={() => navigateTo('/')}>주식</button>
            {/* <button onClick={() => navigateTo('/gesipan')}>게시판</button> */}
            <button onClick={() => navigateTo('/gongji')}>공지사항</button>
        </div>
    );
};

export default Menu;