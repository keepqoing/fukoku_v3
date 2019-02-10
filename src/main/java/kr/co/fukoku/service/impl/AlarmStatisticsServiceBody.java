package kr.co.fukoku.service.impl;

import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.AlarmStatistics;
import kr.co.fukoku.repository_sqltem.AlarmStatisticsRepository;
import kr.co.fukoku.service.AlarmStatisticsService;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmStatisticsServiceBody implements AlarmStatisticsService {
    @Autowired
    private AlarmStatisticsRepository alarmStatisticsRepository;


    @Override
    public List<AlarmStatistics> findAll(AlarmStatisticsFilter alarmStatisticsFilter, Pagination pagination) {
        return alarmStatisticsRepository.findAll(alarmStatisticsFilter,pagination);
    }

    @Override
    public List<Counting> findNumberByFactory(String startYear, String endYear) {
        return alarmStatisticsRepository.findNumberByFactory(startYear, endYear);
    }

    @Override
    public List<Counting> findNumberByLine(String factoryName, String startYear, String endYear) {
        return alarmStatisticsRepository.findNumberByLine(factoryName, startYear, endYear);
    }

    @Override
    public List<Counting> findNumberByMachine(String line, String startYear, String endYear) {
        return alarmStatisticsRepository.findNumberByMachine(line, startYear, endYear);
    }
}
