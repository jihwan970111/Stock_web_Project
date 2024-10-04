package kr.ac.kopo.ctc.stock.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/news")
public class NewsController {

	@PostMapping("/collect")
	public ResponseEntity<String> collectNews(@RequestParam String stockName) {
	    try {
	        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
	            try {
	                ProcessBuilder processBuilder = new ProcessBuilder("/Users/parkjihwan/miniforge3/bin/python3", "/Users/parkjihwan/Documents/development/Jihwan/Python/news.py", stockName);
	                Process process = processBuilder.start();

	                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	                StringBuilder output = new StringBuilder();
	                String line;
	                while ((line = reader.readLine()) != null) {
	                    output.append(line);
	                    // 여기에 print로 한 줄씩 출력
	                    System.out.println("Python output: " + line);  // 여기서 Python 출력값을 확인
	                }

	                int exitCode = process.waitFor();
	                if (exitCode == 0) {
	                    return output.toString();  // Python 스크립트의 JSON 결과를 반환
	                } else {
	                    throw new RuntimeException("Python script exited with error code " + exitCode);
	                }
	            } catch (Exception e) {
	                throw new RuntimeException("Error during Python script execution", e);
	            }
	        });

	        // 비동기적으로 데이터가 수집되면 클라이언트에 결과 반환
	        return ResponseEntity.ok(future.get());
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Error while collecting news data: " + e.getMessage());
	    }
	}
}
