package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.MonthlySummarization;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface AlarmHistoryRepository {
    List<AlarmHistory> findAll(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination);
    List<Counting> findNumberByLine(String productionDate);
    List<Counting> findNumberByMachine(String line, String productionDate);
    boolean save(AlarmHistory alarmHistory);
    Long countAlarmHistorybyAlarmId(String alarmId);
    boolean updateTime(String endTime, String duration, String alarmId);

    List<FreqValue> getAlarmFreq(FreqValueFilter filter);

    // Get number of seconds
    List<MonthlySummarization> getMonthlyAlarmSummarization(String p_year);
    List<MonthlySummarization> getMonthlyAlarmSummarization(String p_line, String p_year);
    List<MonthlySummarization> getMonthlyAlarmSumByMachine(String p_machine, String p_year);
    List<MonthlySummarization> getMonthlyAlarmSumByLineMachine(AlarmHistoryFilter alarmHistoryFilter);

}
