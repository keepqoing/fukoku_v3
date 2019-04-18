package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByMFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByM;
import kr.co.fukoku.repository_sqltem.MNonActiveTimePerYearByMRepository;
import kr.co.fukoku.service.MNonActiveTimePerYearByMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


@Service
public class MFaultTimePerYearByMServiceBody implements MNonActiveTimePerYearByMService {
    @Autowired
    private MNonActiveTimePerYearByMRepository mFaultTimePerYearByMRepository;

    @Override
    public List<MNonActiveTimePerYearByM> getTotalHourByMachine(MFaultTimePerYearByMFilter filter) throws BusinessException, IOException {
        try {
            return mFaultTimePerYearByMRepository.fineTotalHourByMachine(filter);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<MNonActiveTimePerYearByM> findMachineName() throws SQLException, BusinessException {
        return mFaultTimePerYearByMRepository.findMachineName();
    }

    @Override
    public List<MNonActiveTimePerYearByM> findMachineNameBySelectLine(MFaultTimePerYearByMFilter filter) throws SQLException {
        return mFaultTimePerYearByMRepository.findMachineNameBySelectLine(filter);
    }

    @Override
    public List<MNonActiveTimePerYearByM> findGraphDataByMachine(MFaultTimePerYearByMFilter filter) throws SQLException {
        return mFaultTimePerYearByMRepository.findGraphDataByMachine(filter);
    }

    @Override
    public List<MNonActiveTimePerYearByM> getMachineName(MFaultTimePerYearByMFilter filter) {
        return mFaultTimePerYearByMRepository.findMachineNameInAllLine(filter);
    }

    @Override
    public List<MNonActiveTimePerYearByM> getTotalDuration(MFaultTimePerYearByMFilter filter) {
        return mFaultTimePerYearByMRepository.findNonOperationTimeEachMachine(filter);
    }

    @Override
    public List<MNonActiveTimePerYearByM> getGraphData(MFaultTimePerYearByMFilter filter) {
        return mFaultTimePerYearByMRepository.findGraphData(filter);
    }
}
