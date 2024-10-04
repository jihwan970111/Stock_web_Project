package kr.ac.kopo.ctc.stock.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.kopo.ctc.stock.dto.Message;
import kr.ac.kopo.ctc.stock.service.MessageService;
import java.util.Map; 
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;  // Message 저장을 위한 서비스

    // 메시지 전송 API
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        String uid = payload.get("uid");
        String displayName = payload.get("displayName");
        String photoURL = payload.get("photoURL");

        // 서버 측에서 유효성 검사
        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("메시지 내용이 없습니다.");
        }
        if (uid == null || uid.trim().isEmpty() || "unknown".equals(uid)) {
            return ResponseEntity.badRequest().body("유효하지 않은 사용자 정보입니다.");
        }
        if (displayName == null || displayName.trim().isEmpty() || "unknown".equals(displayName)) {
            return ResponseEntity.badRequest().body("유효하지 않은 사용자 이름입니다.");
        }

        // 메시지 저장
        messageService.saveMessage(text, uid, displayName, photoURL);
        return ResponseEntity.ok("메시지 전송 성공");
    }

    // 메시지 조회 API (선택 사항)
    @GetMapping
    public ResponseEntity<List<Message>> getMessages() {
        List<Message> messages = messageService.getMessages();
        return ResponseEntity.ok(messages);
    }
}