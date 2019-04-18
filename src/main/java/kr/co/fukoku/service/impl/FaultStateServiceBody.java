package kr.co.fukoku.service.impl;


import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.filters.FreqValueFilter;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.model.FreqValue;
import kr.co.fukoku.repository_sqltem.FaultStateRepository;
import kr.co.fukoku.service.FaultStateService;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class FaultStateServiceBody implements FaultStateService {
//    @Autowired
//    private MachineService machineService;
    @Autowired
    private FaultStateRepository faultStateRepository;

    @Override
    public List<FaultState> getAllFaultStates(FaultStateFilter filter, Pagination pagination) {
        return faultStateRepository.findAll(filter, pagination);
    }

    @Override
    public List<Counting> getNumberByLine(String dep, String productionDate) {
        return faultStateRepository.findNumberByLine(dep, productionDate);
    }

    @Override
    public List<Counting> getNumberByMachine(String line, String dep, String productionDate) {
        return faultStateRepository.findNumberByMachine(line, dep, productionDate);
    }

    @Override
    public Long addFaultState(FaultState faultState) {
        faultState.setDuration(Helper.getDateRangeInSecond(faultState.getStartTime().replace("T", " "), faultState.getEndTime().replace("T", " ")).toString());
        if (!faultState.getMachine().contains("_")) {
//            Map<String, String> map = machineService.getAllMachineNameAndMappingWithKorean();
            faultState.setMachine(faultState.getLine() + "_" + faultState.getMachine());
        }
        return faultStateRepository.save(faultState);
    }

    @Override
    public List<FreqValue> getFreqValue(FreqValueFilter filter) {
        return faultStateRepository.findFreqValue(filter);
    }

    @Override
    public boolean deleteFaultStateAnalysis(int id) throws SQLException {
        return faultStateRepository.delete(id);
    }
}