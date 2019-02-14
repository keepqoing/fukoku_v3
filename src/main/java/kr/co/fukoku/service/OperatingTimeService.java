package kr.co.fukoku.service;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.OperatingTimeFilter;
import kr.co.fukoku.model.OperatingTime;
import kr.co.fukoku.utils.Pagination;

import java.util.List;

public interface OperatingTimeService {
    List<OperatingTime> getAllOperatingTime(OperatingTimeFilter operatingTimeFilter, Pagination pagination) throws BusinessException;
    List<OperatingTime> getAllOperatingTime() throws BusinessException;
    List<OperatingTime> getAllOperatingTimeTimeRange(OperatingTimeFilter filter) throws BusinessException;
    OperatingTime getOperatingTime(int id) throws BusinessException;
    boolean deleteOperatingTime(int id) throws BusinessException;
    boolean addOperatingTime(OperatingTime operatingTime) throws BusinessException;
    boolean updateOperatingTime(OperatingTime operatingTime) throws BusinessException;
}
