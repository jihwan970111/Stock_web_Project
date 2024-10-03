package kr.ac.kopo.ctc.stock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QKor_Gdp is a Querydsl query type for Kor_Gdp
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKor_Gdp extends EntityPathBase<Kor_Gdp> {

    private static final long serialVersionUID = -1832068142L;

    public static final QKor_Gdp kor_Gdp = new QKor_Gdp("kor_Gdp");

    public final NumberPath<Integer> 년도 = createNumber("년도", Integer.class);

    public final NumberPath<Double> 명목GDP = createNumber("명목GDP", Double.class);

    public final NumberPath<Double> 실질GDP성장률 = createNumber("실질GDP성장률", Double.class);

    public QKor_Gdp(String variable) {
        super(Kor_Gdp.class, forVariable(variable));
    }

    public QKor_Gdp(Path<? extends Kor_Gdp> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKor_Gdp(PathMetadata metadata) {
        super(Kor_Gdp.class, metadata);
    }

}

