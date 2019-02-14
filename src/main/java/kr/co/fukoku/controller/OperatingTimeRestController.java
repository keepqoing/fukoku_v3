package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.OperatingTimeFilter;
import kr.co.fukoku.model.OperatingTime;
import kr.co.fukoku.model.form.OperatingTimeForm;
import kr.co.fukoku.model.response.Response;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.service.OperatingTimeService;
import kr.co.fukoku.utils.Pagination;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/operating-time")
public class OperatingTimeRestController {

    @Autowired
    private OperatingTimeService operatingTimeService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "workingTypeName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "actionType", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
            @ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<OperatingTime> getAllOperatingTime(@ApiIgnore OperatingTimeFilter filter, @ApiIgnore Pagination pagination) throws BusinessException {
        ResponseList<OperatingTime> response = new ResponseList<>();
        List<OperatingTime> workTimeList = operatingTimeService.getAllOperatingTime(filter, pagination);
        if(workTimeList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(workTimeList);
            System.out.println();
            response.setPagination(pagination);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endTime", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value="/time-range", method = RequestMethod.GET)
    public ResponseList<OperatingTime> getAllOperatingTimeTimeRange(@ApiIgnore OperatingTimeFilter filter) throws BusinessException {
        ResponseList<OperatingTime> response = new ResponseList<>();
        List<OperatingTime> workTimeList = operatingTimeService.getAllOperatingTimeTimeRange(filter);
        if(workTimeList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(workTimeList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value="/select-box", method = RequestMethod.GET)
    public ResponseList<OperatingTime> getAllOperatingTime() throws BusinessException {
        ResponseList<OperatingTime> response = new ResponseList<>();
        List<OperatingTime> workTimeList = operatingTimeService.getAllOperatingTime();
        System.out.println();
        if(workTimeList.size() != 0){
            response.setCode(StatusCode.FOUND);
            response.setData(workTimeList);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseRecord<OperatingTime> getOperatingTime(@PathVariable("id") int id){
        ResponseRecord<OperatingTime> response = new ResponseRecord<>();
        try {
            OperatingTime workTime = operatingTimeService.getOperatingTime(id);
            if(workTime != null){
                response.setCode(StatusCode.SUCCESS);
                response.setData(workTime);
            }else{
                response.setCode(StatusCode.NOT_FOUND);
            }
        } catch (BusinessException e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addOperatingTime(@Valid @RequestBody OperatingTimeForm operatingTimeForm){
        Response response = new Response();
        try{
            OperatingTime operatingTime = new OperatingTime(
                    operatingTimeForm.getWorkingCode(),
                    operatingTimeForm.getWorkingTypeName(),
                    operatingTimeForm.getWorkTypeName(),
                    operatingTimeForm.getTimeTag(),
                    operatingTimeForm.getActionType(),
                    operatingTimeForm.getStartTime(),
                    operatingTimeForm.getEndTime(),
                    operatingTimeForm.getItem(),
                    operatingTimeForm.getStartDay(),
                    operatingTimeForm.getEndDay(),
                    operatingTimeForm.getStartDate(),
                    operatingTimeForm.getEndDate()
            );
            operatingTime.setLine(operatingTimeForm.getLine());
            if(operatingTimeService.addOperatingTime(operatingTime)){
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
    public Response deleteOperatingTime(@PathVariable("id") int id){
        Response response = new Response();
        try{
            boolean result = operatingTimeService.deleteOperatingTime(id);
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
    public Response updateOperatingTime(@Valid @RequestBody OperatingTimeForm.OperatingTImeUpdateForm operatingTImeUpdateForm){
        Response response = new Response();
        try{
            OperatingTime operatingTime = new OperatingTime(
                    operatingTImeUpdateForm.getId(),
                    operatingTImeUpdateForm.getWorkingCode(),
                    operatingTImeUpdateForm.getWorkingTypeName(),
                    operatingTImeUpdateForm.getWorkTypeName(),
                    operatingTImeUpdateForm.getTimeTag(),
                    operatingTImeUpdateForm.getActionType(),
                    operatingTImeUpdateForm.getStartTime(),
                    operatingTImeUpdateForm.getEndTime(),
                    operatingTImeUpdateForm.getItem(),
                    operatingTImeUpdateForm.getStartDay(),
                    operatingTImeUpdateForm.getEndDay(),
                    operatingTImeUpdateForm.getStartDate(),
                    operatingTImeUpdateForm.getEndDate()
            );
            operatingTime.setLine(operatingTImeUpdateForm.getLine());
            if(operatingTimeService.updateOperatingTime(operatingTime)){
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