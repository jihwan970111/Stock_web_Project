package kr.ac.kopo.ctc.stock.domain;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Kor_global_exchange_rate {

	@Id
    @JsonProperty("나라")
	private String 나라;
	
	@Column
	@JsonProperty("금액")
	private double 금액;
	
	@Column
	@JsonProperty("변화금액")
	private double 변화금액;
	
	@Column
	@JsonProperty("퍼센트")
	private double 퍼센트;
	
	@Column
	@JsonProperty("이미지")
	private String 이미지;
}
