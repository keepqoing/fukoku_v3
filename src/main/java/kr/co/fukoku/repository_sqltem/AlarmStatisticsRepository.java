package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.*;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface AlarmStatisticsRepository {
    List<Counting> findNumberByFactory();
    List<Counting> findNumberByLine(String factoryName);
    List<Counting> findNumberByMachine(String line);

    List<Line> findAllLinesByFactory(String factoryName, String startYear, String endYear);
    List<Machine> findAllMachinesByLine(String line, String startYear, String endYear);

    String callAutoCountingAlarm();
    List<MainAlarmStatistics> getMainAlarmStatistic(String factory, String line, String machine, String year);

    List<AlarmHistory> findAllAlarmHistory(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination);

    String callAutoCountingAlarmDuration();
    List<MainAlarmStatistics> getMainAlarmStatisticDuration(String factory, String line, String machine, String year);

    // summation
    List<MainAlarmStatistics> getMainAlarmStatisticSum(String factory, String line, String machine, String year);
    List<MainAlarmStatistics> getMainAlarmStatisticDurationSum(String factory, String line, String machine, String year);


}
