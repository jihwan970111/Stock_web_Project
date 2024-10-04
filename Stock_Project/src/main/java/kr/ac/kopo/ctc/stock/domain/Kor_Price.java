package kr.ac.kopo.ctc.stock.domain;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
@Entity
@Getter
@Setter
public class Kor_Price {
	@Id
    @JsonProperty("종목코드")
	private String 종목코드;
	
	@Column
	@JsonProperty("날짜")
	private Date 날짜;
	
	@Column
	@JsonProperty("시가")
	private double 시가;
	
	@Column
	@JsonProperty("고가")
	private double 고가;
	
	@Column
	@JsonProperty("저가")
	private double 저가;
	
	@Column
	@JsonProperty("종가")
	private double 종가;
	
	@Column
	@JsonProperty("거래량")
	private double 거래량;
}
