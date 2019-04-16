package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.filters.FailureFactoryMonitoringFilter;
import kr.co.fukoku.model.FailureFactoryMonitoring;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


public interface FailureFactoryMonitoringRepository {
    List<FailureFactoryMonitoring> findMachineInFactory(FailureFactoryMonitoringFilter filter) throws SQLException, IOException;
    List<FailureFactoryMonitoring> fineFactoryName() throws SQLException, IOException;
}
