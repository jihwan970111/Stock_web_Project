const express = require('express');
const { db } = require('adminFirebase'); // Firebase Admin SDK 설정 파일 불러오기
const admin = require('firebase-admin');
const app = express();

app.use(express.json()); // JSON 요청 처리

// 메시지 전송 API
app.post('/api/messages/send', async (req, res) => {
  const { text, uid, displayName, photoURL } = req.body;

  if (!text || !uid || !displayName) {
    return res.status(400).send("필수 필드가 누락되었습니다.");
  }

  try {
    await db.collection('messages').add({
      text,
      uid,
      displayName,
      photoURL,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isRead: false
    });
    res.status(200).send("메시지 전송 성공");
  } catch (error) {
    res.status(500).send("메시지 전송 오류: " + error.message);
  }
});

// 메시지 목록 조회 API
app.get('/api/messages', async (req, res) => {
  try {
    const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').limit(100).get();
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send("메시지 조회 오류: " + error.message);
  }
});

// 서버 시작
app.listen(8080, () => {
  console.log('서버가 8080 포트에서 실행 중입니다.');
});
