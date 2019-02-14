package kr.co.fukoku.repository_sqltem;



import kr.co.fukoku.filters.OperatingTimeFilter;
import kr.co.fukoku.model.OperatingTime;
import kr.co.fukoku.utils.Pagination;

import java.sql.SQLException;
import java.util.List;

public interface OperatingTimeRepository {
    List<OperatingTime> findAll(OperatingTimeFilter operatingTimeFilter, Pagination pagination) throws SQLException;
    List<OperatingTime> findAll() throws SQLException;
    List<OperatingTime> findAllTimeRange(OperatingTimeFilter filter) throws SQLException;
    OperatingTime findOne(int id) throws SQLException;
    boolean save(OperatingTime operatingTime) throws SQLException;
    boolean update(OperatingTime operatingTime) throws SQLException;
    boolean delete(int id) throws SQLException;
}
