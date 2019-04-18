package kr.co.fukoku.service;

import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.MonthlySummarization;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface AlarmHistoryService {
    List<AlarmHistory> getAllAlarmHistories(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination);
    List<Counting> getNumberAlarmByLine(String productionDate);
    List<Counting> getNumberAlarmByMachine(String line, String productionDate);
    boolean addAlarmHistory(AlarmHistory alarmHistory);
    Long countAlarm(String alarmId);
    boolean updateTime(String endTime, String duration, String alarmId);

    List<FreqValue> getFreqValue(FreqValueFilter filter);
    // Get number of seconds
    List<MonthlySummarization> getMonthlyAlarmSummarization(String p_year);
    List<MonthlySummarization> getMonthlyAlarmSummarization(String p_line, String p_year);
    List<MonthlySummarization> getMonthlyAlarmSumByMachine(String p_machine, String p_year);
    List<MonthlySummarization> getMonthlyAlarmSumByLineMachine(AlarmHistoryFilter alarmHistoryFilter);



}
