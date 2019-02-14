package kr.co.fukoku.service.impl;


import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.model.AlarmHistory;
import kr.co.fukoku.repository_sqltem.AlarmHistoryRepository;
import kr.co.fukoku.service.AlarmHistoryService;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AlarmHistoryServiceBody implements AlarmHistoryService {
    @Autowired
    private AlarmHistoryRepository alarmHistoryRepository;


    @Override
    public List<AlarmHistory> getAllAlarmHistories(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination) {
        return alarmHistoryRepository.findAll(alarmHistoryFilter, pagination);
    }
}
