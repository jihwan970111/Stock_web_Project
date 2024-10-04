package kr.ac.kopo.ctc.stock.repository;
import kr.ac.kopo.ctc.stock.domain.Kor_global_exchange_rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface Kor_global_exchange_rate_Repository extends JpaRepository<Kor_global_exchange_rate, String>, 
JpaSpecificationExecutor<Kor_global_exchange_rate>{

}
