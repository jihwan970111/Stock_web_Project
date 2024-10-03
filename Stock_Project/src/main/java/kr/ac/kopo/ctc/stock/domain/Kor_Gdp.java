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
public class Kor_Gdp {
    @Id
    @JsonProperty("년도")
    private int 년도;

    @Column
    @JsonProperty("명목GDP")
    private double 명목GDP;

    @Column
    @JsonProperty("실질GDP성장률")
    private double 실질GDP성장률;
}