import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; 
import Layout from '../components/layout';
import styles from './Gongji.module.css'; // 스타일 임포트

const Gongji = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "board"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(data);
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className={styles.container}>
                <h1>공지사항</h1>
                <table>
                    <thead>
                        <tr>
                            <th>생성 날짜</th>
                            <th>제목</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => {
                            const date = new Date(post.date.seconds * 1000);
                            return (
                                <tr key={index}>
                                    <td>{date.toLocaleString()}</td>
                                    <td>
                                        <Link to={`/gongji/${post.id}`}>{post.title}</Link>
                                    </td>
                                    <td>{post.user_id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Gongji;
