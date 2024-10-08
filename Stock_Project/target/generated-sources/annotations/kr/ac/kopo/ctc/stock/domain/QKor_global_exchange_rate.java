package kr.ac.kopo.ctc.stock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QKor_global_exchange_rate is a Querydsl query type for Kor_global_exchange_rate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKor_global_exchange_rate extends EntityPathBase<Kor_global_exchange_rate> {

    private static final long serialVersionUID = -313556223L;

    public static final QKor_global_exchange_rate kor_global_exchange_rate = new QKor_global_exchange_rate("kor_global_exchange_rate");

    public final NumberPath<Double> 금액 = createNumber("금액", Double.class);

    public final StringPath 나라 = createString("나라");

    public final NumberPath<Double> 변화금액 = createNumber("변화금액", Double.class);

    public final StringPath 이미지 = createString("이미지");

    public final NumberPath<Double> 퍼센트 = createNumber("퍼센트", Double.class);

    public QKor_global_exchange_rate(String variable) {
        super(Kor_global_exchange_rate.class, forVariable(variable));
    }

    public QKor_global_exchange_rate(Path<? extends Kor_global_exchange_rate> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKor_global_exchange_rate(PathMetadata metadata) {
        super(Kor_global_exchange_rate.class, metadata);
    }

}

