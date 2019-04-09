package kr.co.fukoku.service;

import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.ProductStatusFreqFilter;
import kr.co.fukoku.model.Pie;
import kr.co.fukoku.model.ProductStatusFreq;

import java.util.List;

public interface ProductStatusFreqService {
    List<ProductStatusFreq> getAllProductStatusFreqPerMachineGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException;
    List<ProductStatusFreq> getAllProductStatusFreqPerLineGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException;
    List<Pie> getAllProductStatusFreqOKProductGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException;
    List<Pie> getAllProductStatusFreqNGGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException;
    List<Pie> getAllProductStatusFreqDFGraph(ProductStatusFreqFilter productStatusFreqFilter) throws BusinessException;
}
