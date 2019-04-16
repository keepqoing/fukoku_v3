package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.filters.NewCorrelationFilter;

import java.sql.SQLException;
import java.util.List;

public interface NewCorrelationRepository {
    List<Object[]> findAll(NewCorrelationFilter correlationFilter) throws SQLException;
}
