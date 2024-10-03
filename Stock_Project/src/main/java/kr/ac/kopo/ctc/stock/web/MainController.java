package kr.ac.kopo.ctc.stock.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.kopo.ctc.stock.domain.Kor_Gdp;
import kr.ac.kopo.ctc.stock.repository.Kor_Gdp_Repository;

@Controller
public class MainController {
    @Autowired
    private Kor_Gdp_Repository kor_Gdp_Repository;
    
    @GetMapping("/gdp")
    public ResponseEntity<List<Kor_Gdp>> getGdpData() {
        List<Kor_Gdp> kor_gdp = kor_Gdp_Repository.findAll();
        
        // 데이터 출력하여 확인
        System.out.println("Kor_Gdp 데이터:");
        for (Kor_Gdp data : kor_gdp) {
            System.out.println(data);
        }
        
        return ResponseEntity.ok(kor_gdp);
    }
}
