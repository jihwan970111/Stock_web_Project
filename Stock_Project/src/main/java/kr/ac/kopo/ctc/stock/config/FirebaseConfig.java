package kr.ac.kopo.ctc.stock.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

	public FirebaseConfig() throws IOException {
	    try (FileInputStream serviceAccount =
	            new FileInputStream("/Users/parkjihwan/Documents/development/react-chat-3bf1b-firebase-adminsdk-jb8w8-8a4d6459f9.json")) {

	        FirebaseOptions options = new FirebaseOptions.Builder()
	                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
	                .build();

	        if (FirebaseApp.getApps().isEmpty()) {
	            FirebaseApp.initializeApp(options);
	            System.out.println("Firebase 초기화 성공");
	        }
	    } catch (Exception e) {
	        System.err.println("Firebase 초기화 실패: " + e.getMessage());
	        e.printStackTrace();
	    }
	}
}