package kr.co.fukoku.service;


import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.model.FaultState;

import java.util.List;


public interface FaultAprioriService {
    List<FaultState> getAllFaultStates(FaultStateFilter filter);

//    List<Counting> getNumberByLine(String dep, String productionDate);
//    List<Counting> getNumberByMachine(String line, String dep, String productionDate);
//    Long addFaultState(FaultState faultState);
//    List<FreqValue> getFreqValue(FreqValueFilter filter);

//    boolean deleteFaultStateAnalysis(int id) throws SQLException;
}
