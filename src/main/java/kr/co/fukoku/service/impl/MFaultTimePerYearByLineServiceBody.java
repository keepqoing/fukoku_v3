package kr.co.fukoku.service.impl;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByLineFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByLine;
import kr.co.fukoku.repository_sqltem.MNonActiveTimePerYearByLineRepository;
import kr.co.fukoku.service.MFaultTimePerYearByLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;


@Service
public class MFaultTimePerYearByLineServiceBody implements MFaultTimePerYearByLineService {
    @Autowired
    private MNonActiveTimePerYearByLineRepository mStateRepository;

    @Override
    public List<MNonActiveTimePerYearByLine> getTotalHourByLine(MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException {
        try {
            return mStateRepository.findTotalHourByLine(filter);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }


    @Override
    public List<MNonActiveTimePerYearByLine> getLineName() throws BusinessException, IOException{
        try {
            return mStateRepository.findLineName();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<MNonActiveTimePerYearByLine> getGraphData(MFaultTimePerYearByLineFilter filter) throws IOException, SQLException {
        return mStateRepository.findGraphData(filter);
    }

    @Override
    public List<MNonActiveTimePerYearByLine> getMachineName(MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException, SQLException {
        return mStateRepository.findMachineName(filter);
    }

    @Override
    public List<MNonActiveTimePerYearByLine> getTotalDuration(MFaultTimePerYearByLineFilter filter) {
        return mStateRepository.findTotalDuraton(filter);
    }


}
