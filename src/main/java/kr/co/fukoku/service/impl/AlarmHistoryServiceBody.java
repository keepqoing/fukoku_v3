package kr.co.fukoku.service.impl;


import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.MonthlySummarization;
import kr.co.fukoku.repository_sqltem.AlarmHistoryRepository;
import kr.co.fukoku.service.AlarmHistoryService;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlarmHistoryServiceBody implements AlarmHistoryService {
    @Autowired
    private AlarmHistoryRepository alarmHistoryRepository;
//    @Autowired
//    private MachineService machineService;

    @Override
    public List<AlarmHistory> getAllAlarmHistories(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination) {
        return alarmHistoryRepository.findAll(alarmHistoryFilter, pagination);
    }

    @Override
    public List<Counting> getNumberAlarmByLine(String productionDate) {
        return alarmHistoryRepository.findNumberByLine(productionDate);
    }

    @Override
    public List<Counting> getNumberAlarmByMachine(String line, String productionDate) {
        return alarmHistoryRepository.findNumberByMachine(line, productionDate);
    }

    @Override
    public boolean addAlarmHistory(AlarmHistory alarmHistory) {
        alarmHistory.setDuration(Helper.getDateRangeInSecond(alarmHistory.getStartTime().replace("T", " "),
                alarmHistory.getEndTime().replace("T", " ")).toString());
//        Map<String, String> map = machineService.getAllMachineNameAndMappingWithKorean();
        String m = alarmHistory.getMachine();
        alarmHistory.setMachine(alarmHistory.getLine() + "_" + alarmHistory.getMachine());
        if (alarmHistory.getMachine() == null)
            alarmHistory.setMachine(m);
        return alarmHistoryRepository.save(alarmHistory);
    }

    @Override
    public Long countAlarm(String alarmId) {
        return alarmHistoryRepository.countAlarmHistorybyAlarmId(alarmId);
    }

    @Override
    public boolean updateTime(String endTime, String duration, String alarmId) {
        return alarmHistoryRepository.updateTime(endTime, duration, alarmId);
    }

    @Override
    public List<FreqValue> getFreqValue(FreqValueFilter filter) {
        return alarmHistoryRepository.getAlarmFreq(filter);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSummarization(String p_year) {
        return alarmHistoryRepository.getMonthlyAlarmSummarization(p_year);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSummarization(String p_line, String p_year) {
        return alarmHistoryRepository.getMonthlyAlarmSummarization(p_line, p_year);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSumByMachine(String p_machine, String p_year) {
        return alarmHistoryRepository.getMonthlyAlarmSumByMachine(p_machine, p_year);
    }

    @Override
    public List<MonthlySummarization> getMonthlyAlarmSumByLineMachine(AlarmHistoryFilter alarmHistoryFilter) {
        return alarmHistoryRepository.getMonthlyAlarmSumByLineMachine(alarmHistoryFilter);
    }
}
