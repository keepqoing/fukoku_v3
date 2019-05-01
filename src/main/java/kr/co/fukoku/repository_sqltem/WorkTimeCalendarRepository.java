package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.filters.WorkTimeCalendarFilter;
import kr.co.fukoku.model.WorkTimeCalendar;

import java.sql.SQLException;
import java.util.List;

public interface WorkTimeCalendarRepository {
    List<WorkTimeCalendar> findAll(WorkTimeCalendarFilter workTimeCalendarFilter) throws SQLException;
    WorkTimeCalendar findOne(int id) throws SQLException;
    boolean save(WorkTimeCalendar workTimeCalendar) throws SQLException;
    boolean update(WorkTimeCalendar workTimeCalendar) throws SQLException;
    boolean delete(int id) throws SQLException;
}
