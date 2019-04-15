package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.ProductStatusFreqFilter;
import kr.co.fukoku.model.ProductStatusFreqOrigin;

import java.sql.SQLException;
import java.util.List;

public interface ProductStatusFreqRepository {
    List<ProductStatusFreqOrigin> findAllByMachine(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException;
    List<ProductStatusFreqOrigin> findAllByLine(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException;
    List<ProductStatusFreqOrigin> findAllByOKProduct(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException;
    List<ProductStatusFreqOrigin> findAllByNG_DF(ProductStatusFreqFilter productStatusFreqFilter) throws SQLException;
}
