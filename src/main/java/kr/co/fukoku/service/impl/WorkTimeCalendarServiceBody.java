package kr.co.fukoku.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.WorkTimeCalendarFilter;
import kr.co.fukoku.model.WorkTimeCalendar;
import kr.co.fukoku.repository_sqltem.WorkTimeCalendarRepository;
import kr.co.fukoku.service.WorkTimeCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class WorkTimeCalendarServiceBody implements WorkTimeCalendarService {

    @Autowired
    private WorkTimeCalendarRepository workTimeCalendarRepository;

    @Override
    public List<WorkTimeCalendar> getAllWorkTimeCalendars(WorkTimeCalendarFilter filter) throws BusinessException {
        try {
            return workTimeCalendarRepository.findAll(filter);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public WorkTimeCalendar getWorkTimeCalendar(int id) throws BusinessException {
        try {
            return workTimeCalendarRepository.findOne(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean deleteWorkTimeCalendar(int id) throws BusinessException {
        try {
            return workTimeCalendarRepository.delete(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean addWorkTimeCalendar(WorkTimeCalendar workTimeCalendar) throws BusinessException {
        try {
            JsonObject convertedObject = new Gson().fromJson(workTimeCalendar.getDate(), JsonObject.class);
            for(int i=0;i<convertedObject.get("DATA").getAsJsonArray().size();i++){
                JsonObject obj = new Gson().fromJson(convertedObject.get("DATA").getAsJsonArray().get(i), JsonObject.class);
                WorkTimeCalendar w = new WorkTimeCalendar();
                w.setDate(obj.get("DATE").toString().replace("\"",""));
                w.setRefLine(obj.get("LINE").toString().replace("\"",""));
                w.setRefOperatingTime(Integer.parseInt(obj.get("OPERATING_TIME").toString().replace("\"","")));
                w.setRefProduct(obj.get("PRODUCT").toString().replace("\"",""));
                w.setShortDate(obj.get("SHORT_DATE").toString().replace("\"",""));
                w.setCrossDate(obj.get("CROSS_DATE").toString().replace("\"",""));
                w.setCrossDateLabel(obj.get("CROSS_DATE_LABEL").toString().replace("\"",""));
                w.setTotal(Integer.parseInt(obj.get("TOTAL").toString().replace("\"","")));
                workTimeCalendarRepository.save(w);
            }
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }

    @Override
    public boolean updateWorkTimeCalendar(WorkTimeCalendar workTimeCalendar) throws BusinessException {
        try {
            System.out.println("=====> service ====> " + workTimeCalendar.getRefLine());
            return workTimeCalendarRepository.update(workTimeCalendar);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BusinessException();
        }
    }
}