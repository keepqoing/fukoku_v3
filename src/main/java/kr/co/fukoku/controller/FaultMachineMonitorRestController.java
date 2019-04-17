package kr.co.fukoku.controller;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.model.FaultMachineModel;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.repository.LineRepository;
import kr.co.fukoku.service.FaultMachineMonitorService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/api/fukoku/fault")
public class FaultMachineMonitorRestController {
    @Autowired
    private FaultMachineMonitorService faultMachineMonitorService;

    @Autowired
    private LineRepository lineRepository;
//    @Autowired
//    private ProductDefectDetailRepositoryBody productDefectDetail;

    @RequestMapping(value = "/{year}", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getFaultMachineData(@PathVariable("year") String year){
        ResponseList<FaultMachineModel> response = new ResponseList<>();
        List<FaultMachineModel> lstFm = new ArrayList<>();
        List<FaultMachineModel> dataTest2 = new ArrayList<>();
        List<FaultMachineModel> dataTest3 = new ArrayList<>();
        Map<String, Object> dataJson = new HashMap<>();
//        List<Line> line = null;
//        try {
//            line = productDefectDetail.getLine();
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
        List<Line> line = lineRepository.findAllLines();
        try {
            lstFm = faultMachineMonitorService.getFaultMachineData(year);
            if(lstFm.size()>0){
                for (int i = 0; i < line.size(); i++) {
                    FaultMachineModel mFault = new FaultMachineModel();
                    double []months = new double[12];
                    double totalStopTime = 0;
                    double totalFaultRate = 0;
                    for (int k = 0; k < lstFm.size(); k++) {
                        if(line.get(i).getAcronym().equalsIgnoreCase(lstFm.get(k).getLineName())){
                            /*System.out.println("MY LINE ======> " + lstFm.get(k).getLineName());
                            System.out.println("getMonth  =====> "+ lstFm.get(k).getMonthly());*/
                            int getMonth = lstFm.get(k).getMonthly();
                            months[getMonth-1] = lstFm.get(k).getDuration();
                            lstFm.get(k).setMonthStopTime(months);
                            totalStopTime+=lstFm.get(k).getDuration();
                            totalFaultRate+=lstFm.get(k).getFaultRate();

                            mFault.setTotalStopTime(totalStopTime);
                            mFault.setLineName(lstFm.get(k).getLineName());
                            mFault.setMonthly(lstFm.get(k).getMonthly());
                        }
                    }
                    mFault.setFaultRate(totalFaultRate);
                    mFault.setMonthStopTime(months);
                    dataTest2.add(mFault);
                }
                if(dataTest2.size()>0){
                    for(int i=0;i<dataTest2.size();i++){
                        if(dataTest2.get(i).getLineName()!=null){
                            dataTest3.add(dataTest2.get(i));
                        }
                    }
                }
                dataJson.put("DataTables",dataTest3);
                dataJson.put("CODE", "7777");
                response.setCode(StatusCode.FOUND);
                return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
            }else {
                response.setCode(StatusCode.NOT_FOUND);
                dataJson.put("CODE", "8888");
                dataJson.put("message","No data");
                return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
            }
        }catch (BusinessException e){
            e.printStackTrace();
        }
        return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/find-by-line", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getFaultMachineDataByLine(@ApiIgnore String year, @ApiIgnore String line){
        ResponseList<FaultMachineModel> response = new ResponseList<>();
        List<FaultMachineModel> lstFm = new ArrayList<>();
        List<FaultMachineModel> dataTest2 = new ArrayList<>();
        Map<String, Object> dataJson = new HashMap<>();
        DecimalFormat df4 = new DecimalFormat(".####");
        try {
            lstFm = faultMachineMonitorService.getFaultMachineDataByLine(year,line);
            if(lstFm.size()>0){
                List<String> machine = lstFm.stream().map(FaultMachineModel::getMachineName).distinct().collect(Collectors.toList());
                for(int i=0;i<machine.size();i++){
                    FaultMachineModel mFault = new FaultMachineModel();
                    double []months = new double[12];
                    double totalStopTime = 0;
                    double totalFaultRate = 0;
                    for (int j = 0; j < lstFm.size(); j++) {
                        if(machine.get(i).equalsIgnoreCase(lstFm.get(j).getMachineName())){
                            int getMonth = lstFm.get(j).getMonthly();
                            months[getMonth-1] = lstFm.get(j).getDuration();
                            lstFm.get(j).setMonthStopTime(months);
                            totalStopTime+=lstFm.get(j).getDuration();
                            totalFaultRate+=lstFm.get(j).getFaultRate();

                            mFault.setTotalStopTime(totalStopTime);
                            mFault.setLineName(lstFm.get(j).getLineName());
                            mFault.setMachineName(lstFm.get(j).getMachineName());
                            mFault.setDisplayName(lstFm.get(j).getDisplayName());
                            mFault.setMonthly(lstFm.get(j).getMonthly());
                        }
                    }
                    mFault.setFaultRate(Double.parseDouble(df4.format(totalFaultRate)));
                    mFault.setMonthStopTime(months);
                    dataTest2.add(mFault);
                }
                dataJson.put("DataTables",dataTest2);
                dataJson.put("CODE", "7777");
                response.setCode(StatusCode.FOUND);
                return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
            }else {
                response.setCode(StatusCode.NOT_FOUND);
                dataJson.put("CODE", "8888");
                dataJson.put("message","No data");
                return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.NOT_FOUND);
            }
        }catch (BusinessException e){
            e.printStackTrace();
        }
        return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/find-by-machine", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getFaultMachineDataByMachine(@ApiIgnore String year, @ApiIgnore String machine){
        System.out.println(year + "\t"+machine);
        ResponseList<FaultMachineModel> response = new ResponseList<>();
        List<FaultMachineModel> lstFm = new ArrayList<>();
        List<FaultMachineModel> dataTest2 = new ArrayList<>();
        Map<String, Object> dataJson = new HashMap<>();
        DecimalFormat df4 = new DecimalFormat(".####");

        try {
            lstFm = faultMachineMonitorService.getFaultMachineDataByMachine(year,machine);
            if(lstFm.size()>0){
                List<String> machineName = lstFm.stream().map(FaultMachineModel::getMachineName).distinct().collect(Collectors.toList());
                for(int i=0;i<machineName.size();i++){
                    FaultMachineModel mFault = new FaultMachineModel();
                    double []months = new double[12];
                    double totalStopTime = 0;
                    double totalFaultRate = 0;
                    for (int j = 0; j < lstFm.size(); j++) {
                        if(machineName.get(i).equalsIgnoreCase(lstFm.get(j).getMachineName())){
                            int getMonth = lstFm.get(j).getMonthly();
                            months[getMonth-1] = lstFm.get(j).getDuration();
                            lstFm.get(j).setMonthStopTime(months);
                            totalStopTime+=lstFm.get(j).getDuration();
                            totalFaultRate+=lstFm.get(j).getFaultRate();

                            mFault.setTotalStopTime(totalStopTime);
                            mFault.setLineName(lstFm.get(j).getLineName());
                            mFault.setMachineName(lstFm.get(j).getMachineName());
                            mFault.setDisplayName(lstFm.get(j).getDisplayName());
                            mFault.setMonthly(lstFm.get(j).getMonthly());
                        }
                    }
                    mFault.setFaultRate(Double.parseDouble(df4.format(totalFaultRate)));
                    mFault.setMonthStopTime(months);
                    dataTest2.add(mFault);
                }
                dataJson.put("DataTables",dataTest2);
                dataJson.put("CODE", "7777");
                response.setCode(StatusCode.FOUND);
                return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
            }else {
                response.setCode(StatusCode.NOT_FOUND);
                dataJson.put("CODE", "8888");
                dataJson.put("message","No data");
                return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.NOT_FOUND);
            }
        }catch (BusinessException e){
            e.printStackTrace();
        }
        return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.NOT_FOUND);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_time", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/freq-alarm", method = RequestMethod.GET)
    public ResponseList<FaultMachineModel> getFrequencyAlarm(@ApiIgnore FaultMachineModel fm){
        ResponseList<FaultMachineModel> response = new ResponseList<>();
        List<FaultMachineModel> lstFM = new ArrayList<>();
        lstFM = faultMachineMonitorService.getFrequencyAlarm(fm);
        if(lstFM.size()>0){
            response.setCode(StatusCode.FOUND);
            response.setData(lstFM);
        }else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_time", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/freq-non-moving-state", method = RequestMethod.GET)
    public ResponseList<FaultMachineModel> getFrequencyNonMovingState(@ApiIgnore FaultMachineModel fm){
        ResponseList<FaultMachineModel> response = new ResponseList<>();
        /*System.out.println(fm.toString());*/
        List<FaultMachineModel> lstFM = new ArrayList<>();
        lstFM = faultMachineMonitorService.getFrequencyNonMovingState(fm);
        if(lstFM.size()>0){
            response.setCode(StatusCode.FOUND);
            response.setData(lstFM);
        }else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "end_time", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/freq-er0ror", method = RequestMethod.GET)
    public ResponseList<FaultMachineModel> getFrequencyError(@ApiIgnore FaultMachineModel fm){
        ResponseList<FaultMachineModel> response = new ResponseList<>();
        List<FaultMachineModel> lstFM = new ArrayList<>();
        lstFM = faultMachineMonitorService.getFrequencyError(fm);
        if(lstFM.size()>0){
            response.setCode(StatusCode.FOUND);
            response.setData(lstFM);
        }else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }
}
