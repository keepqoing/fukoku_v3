package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.sql.SQLException;
import java.util.List;

public interface FaultStateRepository {
    List<FaultState> findAll(FaultStateFilter faultStateFilter, Pagination pagination);
    List<Counting> findNumberByLine(String dep, String productionDate);
    List<Counting> findNumberByMachine(String line, String dep, String productionDate);
    Long save(FaultState faultState);

    List<FreqValue> findFreqValue(FreqValueFilter filter);

    boolean delete(int id) throws SQLException;
}
