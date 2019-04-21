package kr.co.fukoku.service.impl;

import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.model.*;
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
    public List<Counting> findNumberByFactory() {
        return alarmStatisticsRepository.findNumberByFactory();
    }

    @Override
    public List<Counting> findNumberByLine(String factoryName) {
        return alarmStatisticsRepository.findNumberByLine(factoryName);
    }

    @Override
    public List<Counting> findNumberByMachine(String line) {
        return alarmStatisticsRepository.findNumberByMachine(line);
    }

    @Override
    public List<Line> findAllLinesByFactory(String factoryName, String startYear, String endYear) {
        return alarmStatisticsRepository.findAllLinesByFactory(factoryName, startYear, endYear);
    }

    @Override
    public List<Machine> findAllMachinesByLine(String line, String startYear, String endYear) {
        return alarmStatisticsRepository.findAllMachinesByLine(line, startYear, endYear);
    }

    @Override
    public String callAutoCountingAlarm() {
        return alarmStatisticsRepository.callAutoCountingAlarm();
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatistic(String factory, String line, String machine, String year) {
        return alarmStatisticsRepository.getMainAlarmStatistic(factory, line, machine, year);
    }

    @Override
    public List<AlarmHistory> getAllAlarmHistories(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination) {
        return alarmStatisticsRepository.findAllAlarmHistory(alarmHistoryFilter, pagination);
    }

    @Override
    public String callAutoCountingAlarmDuration() {
        return alarmStatisticsRepository.callAutoCountingAlarmDuration();
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatisticDuration(String factory, String line, String machine, String year) {
        return alarmStatisticsRepository.getMainAlarmStatisticDuration(factory, line, machine, year);
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatisticSum(String factory, String line, String machine, String year) {
        return alarmStatisticsRepository.getMainAlarmStatisticSum(factory, line, machine, year);
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatisticDurationSum(String factory, String line, String machine, String year) {
        return alarmStatisticsRepository.getMainAlarmStatisticDurationSum(factory, line, machine, year);
    }

    @Override
    public List<MainAlarmStatistics> graphAlarmCountingByYear(String p_year) {
        return alarmStatisticsRepository.graphAlarmCountingByYear(p_year);
    }
}
