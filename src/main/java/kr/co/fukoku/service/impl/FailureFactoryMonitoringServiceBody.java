package kr.co.fukoku.service.impl;

import kr.co.fukoku.filters.FailureFactoryMonitoringFilter;
import kr.co.fukoku.model.FailureFactoryMonitoring;
import kr.co.fukoku.repository_sqltem.FailureFactoryMonitoringRepository;
import kr.co.fukoku.service.FailureFactoryMonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@Service
public class FailureFactoryMonitoringServiceBody implements FailureFactoryMonitoringService {
    @Autowired
    private FailureFactoryMonitoringRepository failureFactoryMonitoringRepository;

    @Override
    public List<FailureFactoryMonitoring> getMachineInFactory(FailureFactoryMonitoringFilter filter) throws IOException, SQLException {

            return failureFactoryMonitoringRepository.findMachineInFactory(filter);

    }
    @Override
    public List<FailureFactoryMonitoring> getFactoryName() throws IOException, SQLException {
        return failureFactoryMonitoringRepository.fineFactoryName();
    }
}
