package kr.co.fukoku.service;



import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.FailureFactoryMonitoringFilter;
import kr.co.fukoku.model.FailureFactoryMonitoring;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface FailureFactoryMonitoringService {
    List<FailureFactoryMonitoring> getMachineInFactory(FailureFactoryMonitoringFilter filter) throws BusinessException, IOException, SQLException;
    List<FailureFactoryMonitoring> getFactoryName() throws IOException, SQLException;
}
