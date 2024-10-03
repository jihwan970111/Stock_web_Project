package kr.ac.kopo.ctc.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import kr.ac.kopo.ctc.stock.domain.Kor_Gdp;
@Repository
public interface Kor_Gdp_Repository extends JpaRepository<Kor_Gdp, Integer>, JpaSpecificationExecutor<Kor_Gdp>{

}
