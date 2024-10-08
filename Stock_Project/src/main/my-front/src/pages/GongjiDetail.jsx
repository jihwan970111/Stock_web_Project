import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout';
import { useAuth } from '../lib/auth'; 
import styles from './GongjiDetail.module.css'; // 스타일 임포트

const GongjiDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyMap, setReplyMap] = useState({});
    const { currentUser } = useAuth(); 

    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, "board", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPost(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        const fetchComments = async () => {
            const q = query(
                collection(db, "comment"), 
                where("board_id", "==", id),
                orderBy("comment_order", "asc")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const orderedComments = buildCommentTree(data);
            setComments(orderedComments);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const buildCommentTree = (comments) => {
        let commentMap = {};
        let commentTree = [];

        comments.forEach(comment => {
            commentMap[comment.id] = { ...comment, children: [] };
        });

        comments.forEach(comment => {
            if (comment.parent_comment_id) {
                commentMap[comment.parent_comment_id].children.push(commentMap[comment.id]);
            } else {
                commentTree.push(commentMap[comment.id]);
            }
        });

        return commentTree;
    };

    const handleCommentSubmit = async (e, parentId = "") => {
        e.preventDefault();
        const commentText = parentId ? replyMap[parentId] : newComment;
        if (!commentText.trim()) return;

        try {
            const commentOrder = comments.length + 1;
            const commentData = {
                board_id: id,
                comment_order: commentOrder,
                date: new Date(),
                parent_comment_id: parentId,
                title: commentText,
                user_id: currentUser.email,
            };

            await addDoc(collection(db, "comment"), commentData);
            if (parentId) {
                setReplyMap(prevMap => ({ ...prevMap, [parentId]: '' }));
            } else {
                setNewComment('');
            }

            setComments(prevComments => [...prevComments, commentData]);
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    if (!post) return <p>Loading...</p>;

    const date = new Date(post.date.seconds * 1000);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.postHeader}>
                    <h1>{post.title}</h1>
                    <p>작성자: {post.user_id}</p>
                    <p>작성일: {date.toLocaleString()}</p>
                    <p>{post.content}</p>
                    <img src={post.stored_file_path} alt={post.original_file_name}></img>
                </div>

                <div className={styles.commentForm}>
                    <h2>댓글 작성하기</h2>
                    <form onSubmit={(e) => handleCommentSubmit(e)}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <button type="submit">댓글 작성</button>
                    </form>
                </div>

                <div className={styles.commentList}>
                    <h2>댓글</h2>
                    <ul>
                        {comments.map((comment) => renderComment(comment, handleCommentSubmit, replyMap, setReplyMap))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

const renderComment = (comment, handleCommentSubmit, replyMap, setReplyMap) => {
    const commentDate = new Date(comment.date.seconds * 1000);

    return (
        <li key={comment.id} className={styles.commentItem}>
            <p>작성자: {comment.user_id}</p>
            <p>{comment.title}</p>
            <p>{commentDate.toLocaleString()}</p>

            <form onSubmit={(e) => handleCommentSubmit(e, comment.id)}>
                <input
                    type="text"
                    value={replyMap[comment.id] || ''}
                    onChange={(e) => setReplyMap(prevMap => ({ ...prevMap, [comment.id]: e.target.value }))}
                    placeholder="대댓글을 입력하세요"
                    className={styles.replyInput} // 스타일 적용
                />
                <button type="submit" className={styles.replyButton}>대댓글 작성</button>
            </form>

            {comment.children && comment.children.length > 0 && (
                <ul>
                    {comment.children.map(child => renderComment(child, handleCommentSubmit, replyMap, setReplyMap))}
                </ul>
            )}
        </li>
    );
};

export default GongjiDetail;
