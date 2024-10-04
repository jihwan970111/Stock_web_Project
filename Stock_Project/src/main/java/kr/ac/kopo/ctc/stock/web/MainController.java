package kr.ac.kopo.ctc.stock.web;

import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import kr.ac.kopo.ctc.stock.domain.Kor_Gdp;
import kr.ac.kopo.ctc.stock.domain.Kor_Price;
import kr.ac.kopo.ctc.stock.domain.Kor_global_exchange_rate;
import kr.ac.kopo.ctc.stock.service.StockService;

@Controller
public class MainController {
	@Autowired
    private StockService stockService;
    
    @GetMapping("/gdp")
    public ResponseEntity<List<Kor_global_exchange_rate>> getGdpData() {
        List<Kor_global_exchange_rate> kor_global = stockService.getAllGlobalExchangeRates();
        return ResponseEntity.ok(kor_global);
    }

    @GetMapping("/priceIncreaseRate")
    public ResponseEntity<List<Object[]>> getPriceIncreaseRateByLatestDate() {
        // 서비스에서 가장 최근 날짜의 상승률 데이터를 가져옴
        List<Object[]> priceIncreaseRates = stockService.getPriceIncreaseRatesByLatestDate();
        return ResponseEntity.ok(priceIncreaseRates);
    }
    
}
