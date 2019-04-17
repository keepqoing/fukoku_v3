package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.NonActiveState;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface NonActiveStateRepository {
    List<NonActiveState> findAll(NonActiveStateFilter filter, Pagination pagination);
    List<Counting> findNumberByLine(String productionDate);
    List<Counting> findNumberByMachine(String line, String productionDate);
    boolean save(NonActiveState nonActiveState);
    List<FreqValue> countFreqValue(FreqValueFilter filter);
    List<FreqValue> countMSFreqValue(FreqValueFilter filter);

    // New Version to update mstate when duplicate records
    // We update only end_time and recalculate for duration
    boolean addNew(NonActiveState nonActiveState);
    boolean updateEndTimeAndDuration(String endTime, String duration, String mstateId);
    int countByMStateID(String mstateId);
}
