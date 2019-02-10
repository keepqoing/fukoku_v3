package kr.co.fukoku.service;

import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.AlarmStatistics;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface AlarmStatisticsService {
    List<AlarmStatistics> findAll(AlarmStatisticsFilter alarmStatisticsFilter, Pagination pagination);
    List<Counting> findNumberByFactory(String startYear, String endYear);
    List<Counting> findNumberByLine(String factoryName, String startYear, String endYear);
    List<Counting> findNumberByMachine(String line, String startYear, String endYear);
}
