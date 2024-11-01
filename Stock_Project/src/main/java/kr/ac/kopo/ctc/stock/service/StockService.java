package kr.ac.kopo.ctc.stock.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import kr.ac.kopo.ctc.stock.domain.Kor_global_exchange_rate;
import kr.ac.kopo.ctc.stock.repository.Kor_Gdp_Repository;
import kr.ac.kopo.ctc.stock.repository.Kor_global_exchange_rate_Repository;
import kr.ac.kopo.ctc.stock.repository.Kor_Price_Repository;
@Service
public class StockService {
	@Autowired
    private Kor_Gdp_Repository kor_Gdp_Repository;
    
    @Autowired
    private Kor_global_exchange_rate_Repository kor_global_exchange_Repository;
    
    @Autowired
    private Kor_Price_Repository kor_Price_Repository;

    public List<Kor_global_exchange_rate> getAllGlobalExchangeRates() {
        return kor_global_exchange_Repository.findAll();
    }
    
    public List<Object[]> getPriceIncreaseRatesByLatestDate() {
        // 가장 최근 날짜를 가져옴
        String maxDate = kor_Price_Repository.findMaxDate();
        // 해당 날짜에 대한 가격 상승률 데이터 가져옴
        return kor_Price_Repository.findPriceIncreaseRateByDate(maxDate);
    }
    
    
}
