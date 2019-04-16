package kr.co.fukoku.service;



import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.NewCorrelationFilter;

import java.util.Map;

public interface NewCorrelationService {
    Map<String, Object> getAllNewCorrelation(NewCorrelationFilter correlationFilter) throws BusinessException;
}
