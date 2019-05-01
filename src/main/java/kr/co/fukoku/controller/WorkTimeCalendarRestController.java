package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.WorkTimeCalendarFilter;
import kr.co.fukoku.model.WorkTimeCalendar;
import kr.co.fukoku.model.form.WorkTimeCalendarForm;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.service.WorkTimeCalendarService;
import kr.co.fukoku.utils.Response;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/work-time-calendar")
public class WorkTimeCalendarRestController {

    @Autowired
    private WorkTimeCalendarService workTimeCalendarService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "shortDate", dataType = "string", paramType = "query"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<WorkTimeCalendar> getAllWorkTimeCalendars(@ApiIgnore WorkTimeCalendarFilter filter) throws BusinessException {
        ResponseList<WorkTimeCalendar> response = new ResponseList<>();
        List<WorkTimeCalendar> workTimeCalendarList = workTimeCalendarService.getAllWorkTimeCalendars(filter);
        if(workTimeCalendarList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(workTimeCalendarList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseRecord<WorkTimeCalendar> getWorkTimeCalendar(@PathVariable("id") int id){
        ResponseRecord<WorkTimeCalendar> response = new ResponseRecord<>();
        try {
            WorkTimeCalendar workTimeCalendar = workTimeCalendarService.getWorkTimeCalendar(id);
            if(workTimeCalendar != null){
                response.setCode(StatusCode.SUCCESS);
                response.setData(workTimeCalendar);
            }else{
                response.setCode(StatusCode.NOT_FOUND);
            }
        } catch (BusinessException e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addWorkTimeCalendar(@Valid @RequestBody WorkTimeCalendarForm workTimeCalendarForm){
        Response response = new Response();
        try{
            WorkTimeCalendar workTimeCalendar = new WorkTimeCalendar(
                    workTimeCalendarForm.getRefOperatingTime(),
                    workTimeCalendarForm.getTotal(),
                    workTimeCalendarForm.getRefLine(),
                    workTimeCalendarForm.getRefProduct(),
                    workTimeCalendarForm.get_date(),
                    workTimeCalendarForm.getShortDate()
            );
            workTimeCalendar.setCrossDate(workTimeCalendarForm.getCrossDate());
            workTimeCalendar.setCrossDateLabel(workTimeCalendarForm.getCrossDateLabel());
            if(workTimeCalendarService.addWorkTimeCalendar(workTimeCalendar)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(BusinessException e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Response deleteWorkTimeCalendar(@PathVariable("id") int id){
        Response response = new Response();
        try{
            boolean result = workTimeCalendarService.deleteWorkTimeCalendar(id);
            if(result){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(BusinessException e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value="/update", method = RequestMethod.POST)
    public Response updateWorkTimeCalendar(@Valid @RequestBody WorkTimeCalendarForm.WorkTimeCalendarUpdateForm workTimeCalendarUpdateForm){
        Response response = new Response();
        try{
            WorkTimeCalendar workTimeCalendar = new WorkTimeCalendar();
            workTimeCalendar.setRefOperatingTime(workTimeCalendarUpdateForm.getRefOperatingTime());
            workTimeCalendar.setTotal(workTimeCalendarUpdateForm.getTotal());
            workTimeCalendar.setRefProduct(workTimeCalendarUpdateForm.getRefProduct());
            workTimeCalendar.setId(workTimeCalendarUpdateForm.getId());
            workTimeCalendar.setCrossDate(workTimeCalendarUpdateForm.getCrossDate());
            workTimeCalendar.setCrossDateLabel(workTimeCalendarUpdateForm.getCrossDateLabel());
            workTimeCalendar.setRefLine(workTimeCalendarUpdateForm.getRefLine());
            System.out.println("====== updateWorkTimeCalendar =====> " + workTimeCalendarUpdateForm.getRefLine());
            if(workTimeCalendarService.updateWorkTimeCalendar(workTimeCalendar)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(BusinessException e){
            e.printStackTrace();
        }
        return response;
    }
}