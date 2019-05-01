package kr.co.fukoku.service;


import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.WorkTimeCalendarFilter;
import kr.co.fukoku.model.WorkTimeCalendar;

import java.util.List;

public interface WorkTimeCalendarService {
    List<WorkTimeCalendar> getAllWorkTimeCalendars(WorkTimeCalendarFilter workTimeCalendarFilter) throws BusinessException;
    WorkTimeCalendar getWorkTimeCalendar(int id) throws BusinessException;
    boolean addWorkTimeCalendar(WorkTimeCalendar workTimeCalendar) throws BusinessException;
    boolean updateWorkTimeCalendar(WorkTimeCalendar workTimeCalendar) throws BusinessException;
    boolean deleteWorkTimeCalendar(int id) throws BusinessException;
}
