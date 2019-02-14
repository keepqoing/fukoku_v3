package kr.co.fukoku.service;

import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface AlarmHistoryService {
    List<AlarmHistory> getAllAlarmHistories(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination);



}
