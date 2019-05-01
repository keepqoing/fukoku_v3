package kr.co.fukoku.service.impl;


import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.repository_sqltem.FaultAprioriRepository;
import kr.co.fukoku.service.FaultAprioriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaultAprioriServiceBody implements FaultAprioriService {
//    @Autowired
//    private MachineService machineService;
    @Autowired
    private FaultAprioriRepository faultAprioriRepository;

    @Override
    public List<FaultState> getAllFaultStates(FaultStateFilter filter) {
        return faultAprioriRepository.findAll(filter);
    }

}