package kr.co.fukoku.service.impl;

import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.model.NonActiveState;
import kr.co.fukoku.repository_sqltem.NonActiveStateRepository;
import kr.co.fukoku.service.NonActiveStateService;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;

@Service
public class NonActiveStateServiceBody implements NonActiveStateService {

    @Autowired
    private NonActiveStateRepository nonActiveStateRepository;
//    @Autowired
//    private MachineService machineService;

    @Override
    public List<NonActiveState> getAllNonMovingStates(NonActiveStateFilter filter, Pagination pagination) {
        return nonActiveStateRepository.findAll(filter, pagination);
    }

    @Override
    public List<Counting> getNumberByLine(String productionDate) {
        return nonActiveStateRepository.findNumberByLine(productionDate);
    }

    @Override
    public List<Counting> getNumberByMachine(String line, String productionDate) {
        return nonActiveStateRepository.findNumberByMachine(line, productionDate);
    }

    @Override
    public boolean addNonMovingState(NonActiveState nonActiveState) {
//        Map<String, String> map = machineService.getAllMachineNameAndMappingWithKorean();
        nonActiveState.setDuration(Helper.getDateRangeInSecond(nonActiveState.getStartTime().replace("T", " "),
                nonActiveState.getEndTime().replace("T", " ")).toString());
        nonActiveState.setMachine(nonActiveState.getLine() + "_" + nonActiveState.getMachine());
        return nonActiveStateRepository.save(nonActiveState);

    }

    @Override
    public List<FreqValue> countFreqValue(FreqValueFilter filter) {
        return nonActiveStateRepository.countFreqValue(filter);
    }

    @Override
    public List<FreqValue> countMSFreqValue(FreqValueFilter filter) {
        return nonActiveStateRepository.countMSFreqValue(filter);
    }

    @Override
    public boolean addNew(NonActiveState nonActiveState) {
        return nonActiveStateRepository.addNew(nonActiveState);
    }

    @Override
    public boolean updateEndTimeAndDuration(String endTime, String duration, String mstateId) {
        return nonActiveStateRepository.updateEndTimeAndDuration(endTime, duration, mstateId);
    }

    @Override
    public int countByMStateID(String mstateId) {
        return nonActiveStateRepository.countByMStateID(mstateId);
    }
}
