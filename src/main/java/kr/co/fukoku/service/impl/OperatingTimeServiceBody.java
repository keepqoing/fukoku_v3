package kr.co.fukoku.service.impl;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.OperatingTimeFilter;
import kr.co.fukoku.model.OperatingTime;
import kr.co.fukoku.repository_sqltem.OperatingTimeRepository;
import kr.co.fukoku.service.OperatingTimeService;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class OperatingTimeServiceBody implements OperatingTimeService {
    @Autowired
    private OperatingTimeRepository operatingTimeRepository;

    @Override
    public List<OperatingTime> getAllOperatingTime(OperatingTimeFilter filter, Pagination pagination) throws BusinessException {
        try {
            return operatingTimeRepository.findAll(filter, pagination);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<OperatingTime> getAllOperatingTime() throws BusinessException {
        try {
            return operatingTimeRepository.findAll();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public List<OperatingTime> getAllOperatingTimeTimeRange(OperatingTimeFilter filter) throws BusinessException {
        try {
            return operatingTimeRepository.findAllTimeRange(filter);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public OperatingTime getOperatingTime(int id) throws BusinessException {
        try {
            return operatingTimeRepository.findOne(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean deleteOperatingTime(int id) throws BusinessException {
        try {
            return operatingTimeRepository.delete(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean addOperatingTime(OperatingTime operatingTime) throws BusinessException {
        try {
            if(operatingTime.getStartTime().equals("00:00")) operatingTime.setStartTime("24:00");
            if(operatingTime.getEndTime().equals("00:00")) operatingTime.setEndTime("24:00");
            if(operatingTime.getStartTime().compareTo(operatingTime.getEndTime()) <= 0){
                operatingTime.setDuration(Integer.parseInt(Helper.getTimeRange(operatingTime.getStartTime(), operatingTime.getEndTime()).toString()));
                if(operatingTime.getStartTime().equals("24:00")) operatingTime.setStartTime("00:00");
            }else{
                operatingTime.setDuration(Helper.getTimeRangeWithNextDay(operatingTime.getStartTime(), operatingTime.getEndTime()));
                if(operatingTime.getStartTime().equals("24:00")) operatingTime.setStartTime("00:00");
            }
            return operatingTimeRepository.save(operatingTime);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean updateOperatingTime(OperatingTime operatingTime) throws BusinessException {
        try {
            if(operatingTime.getStartTime().equals("00:00")) operatingTime.setStartTime("24:00");
            if(operatingTime.getEndTime().equals("00:00")) operatingTime.setEndTime("24:00");
            if(operatingTime.getStartTime().compareTo(operatingTime.getEndTime()) <= 0){
                operatingTime.setDuration(Integer.parseInt(Helper.getTimeRange(operatingTime.getStartTime(), operatingTime.getEndTime()).toString()));
                if(operatingTime.getStartTime().equals("24:00")) operatingTime.setStartTime("00:00");
            }else{
                operatingTime.setDuration(Helper.getTimeRangeWithNextDay(operatingTime.getStartTime(), operatingTime.getEndTime()));
                if(operatingTime.getStartTime().equals("24:00")) operatingTime.setStartTime("00:00");
            }
            return operatingTimeRepository.update(operatingTime);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

}
