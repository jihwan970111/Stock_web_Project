package kr.ac.kopo.ctc.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.ZoneId;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import kr.ac.kopo.ctc.stock.dto.Message;
import com.google.cloud.firestore.Query;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import com.google.cloud.Timestamp;

@Service
public class MessageService {
	
	// Firestore에 메시지 저장
	public void saveMessage(String text, String uid, String displayName, String photoURL) {
	    Firestore db = FirestoreClient.getFirestore();

	    Message message = new Message();
	    message.setText(text);
	    message.setUid(uid);
	    message.setDisplayName(displayName);
	    message.setPhotoURL(photoURL);
	    message.setCreatedAt(Timestamp.now());  // Firestore에서 사용하는 Timestamp 사용
	    message.setIsRead(false);

	    // Firestore에 메시지 저장
	    db.collection("messages").add(message);
	}


	// Firestore에서 메시지 목록 가져오기 (시간 순으로 정렬하여 가져오기)
    public List<Message> getMessages() {
        Firestore db = FirestoreClient.getFirestore();
        List<Message> messages = new ArrayList<>();

        try {
            // Firestore에서 메시지를 가져오고 시간순으로 정렬 (내림차순)
            QuerySnapshot snapshot = db.collection("messages")
                                       .orderBy("createdAt", Query.Direction.ASCENDING)  // 시간 순으로 정렬
                                       .get()
                                       .get();
            
            snapshot.forEach(document -> {
                Message message = document.toObject(Message.class);
                messages.add(message);  // 가져온 메시지 추가
            });
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("메시지 목록 조회 실패: " + e.getMessage());
        }

        return messages;
    }
}
