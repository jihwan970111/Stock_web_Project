package kr.ac.kopo.ctc.stock.web;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class MainController {
	@RequestMapping("/")
	public ResponseEntity<String> ip (HttpServletRequest request){
		return ResponseEntity.ok(request.getRemoteAddr());
	}
}
