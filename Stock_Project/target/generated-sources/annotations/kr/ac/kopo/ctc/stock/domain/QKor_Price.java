package kr.ac.kopo.ctc.stock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QKor_Price is a Querydsl query type for Kor_Price
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKor_Price extends EntityPathBase<Kor_Price> {

    private static final long serialVersionUID = 327832104L;

    public static final QKor_Price kor_Price = new QKor_Price("kor_Price");

    public final NumberPath<Double> 거래량 = createNumber("거래량", Double.class);

    public final NumberPath<Double> 고가 = createNumber("고가", Double.class);

    public final DateTimePath<java.util.Date> 날짜 = createDateTime("날짜", java.util.Date.class);

    public final NumberPath<Double> 시가 = createNumber("시가", Double.class);

    public final NumberPath<Double> 저가 = createNumber("저가", Double.class);

    public final NumberPath<Double> 종가 = createNumber("종가", Double.class);

    public final StringPath 종목코드 = createString("종목코드");

    public QKor_Price(String variable) {
        super(Kor_Price.class, forVariable(variable));
    }

    public QKor_Price(Path<? extends Kor_Price> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKor_Price(PathMetadata metadata) {
        super(Kor_Price.class, metadata);
    }

}

