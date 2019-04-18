package kr.co.fukoku.service;



import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.sql.SQLException;
import java.util.List;


public interface FaultStateService {
    List<FaultState> getAllFaultStates(FaultStateFilter filter, Pagination pagination);
    List<Counting> getNumberByLine(String dep, String productionDate);
    List<Counting> getNumberByMachine(String line, String dep, String productionDate);
    Long addFaultState(FaultState faultState);
    List<FreqValue> getFreqValue(FreqValueFilter filter);

    boolean deleteFaultStateAnalysis(int id) throws SQLException;
}
