package kr.ac.kopo.ctc.stock.repository;
import kr.ac.kopo.ctc.stock.domain.Kor_Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface Kor_Price_Repository extends JpaRepository<Kor_Price, String>, JpaSpecificationExecutor<Kor_Price> {
	@Query(value = "SELECT kp.종목코드, kp.거래량, " +  // 쉼표 추가
	        "(SELECT kt.종목명 FROM kor_ticker kt WHERE kt.종목코드 = kp.종목코드 LIMIT 1) AS 종목명, " +
	        "kp.날짜, kp.종가, " +
	        "((kp.종가 - kpPrev.종가) / kpPrev.종가) * 100 AS 상승률 " +
	        "FROM kor_price kp " +
	        "JOIN kor_price kpPrev ON kp.종목코드 = kpPrev.종목코드 " +
	        "AND kp.날짜 = DATE_ADD(kpPrev.날짜, INTERVAL 1 DAY) " +
	        "WHERE kp.날짜 = ?1 " +
	        "ORDER BY 상승률 DESC LIMIT 50", nativeQuery = true)
	List<Object[]> findPriceIncreaseRateByDate(@Param("date") String date);

    
    @Query(value = "SELECT MAX(날짜) FROM kor_price", nativeQuery = true)
    String findMaxDate();
}


