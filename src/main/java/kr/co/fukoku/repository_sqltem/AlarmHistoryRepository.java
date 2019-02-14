package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface AlarmHistoryRepository {
    List<AlarmHistory> findAll(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination);

}
