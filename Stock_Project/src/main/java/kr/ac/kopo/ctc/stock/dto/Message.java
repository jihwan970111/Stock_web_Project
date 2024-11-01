package kr.ac.kopo.ctc.stock.dto;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import com.google.cloud.Timestamp;
@Getter
@Setter
public class Message {
	private Timestamp createdAt;  // 타임스탬프
    private String displayName;       // 사용자 이름
    private String photoURL;          // 프로필 사진 URL
    private String text;              // 메시지 내용
    private String uid;               // 사용자 ID
    private boolean isRead;           // 읽음 여부
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public boolean isRead() {
		return isRead;
	}
	public void setIsRead(boolean isRead) {
		this.isRead = isRead;
	}
	public String getPhotoURL() {
		return photoURL;
	}
	public void setPhotoURL(String photoURL) {
		this.photoURL = photoURL;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
    
    
}
