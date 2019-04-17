package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByLineFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByLine;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.repository.MachineRepository;
import kr.co.fukoku.service.MFaultTimePerYearByLineService;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/api/fukoku/faultime")
public class MFaultTimePerYearByLineController {
    @Autowired
    private MFaultTimePerYearByLineService faultTimeMonitoringService;

    @Autowired
    private MachineRepository machineRepository;
    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endTime", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/totalHourByLine", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getAllMStateByLineAndStartTimeAndEndTime(@ApiIgnore MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException, SQLException {
        System.out.println("******************************Run in Class MFaultTimePerYearByLineController****************************** ");
        System.out.println(" Y " + filter.getStartTime() + " Line: " + filter.getLineName());
        ResponseList<MNonActiveTimePerYearByLine> response = new ResponseList<>();
        List<MNonActiveTimePerYearByLine> dataTotalHourByLine = faultTimeMonitoringService.getTotalHourByLine(filter);
        Map<String, List<MNonActiveTimePerYearByLine>> timeStopAutoWait = dataTotalHourByLine.stream().collect(Collectors.groupingBy(MNonActiveTimePerYearByLine::getMachine));
        List<MNonActiveTimePerYearByLine> graphData = new ArrayList<MNonActiveTimePerYearByLine>();


       /* for (int i = 0; i < dataTotalHourByLine.size(); i++) {
            MActiveTimePerYearByLine mFaultTimePerYearByLine = new MActiveTimePerYearByLine();
            mFaultTimePerYearByLine.setMachine(dataTotalHourByLine.get(i).getMachine());
            mFaultTimePerYearByLine.setStopautowaits(Double.valueOf(dataTotalHourByLine.get(i).getStopautowait()));
            graphData.add(mFaultTimePerYearByLine);
        }*/


        List<MNonActiveTimePerYearByLine> dataGraphData = faultTimeMonitoringService.getGraphData(filter);
        //dataGraphData.sort(Comparator.comparing(MActiveTimePerYearByLine::getStopautowait).reversed());
        for (int i = 0; i < dataGraphData.size(); i++) {
            MNonActiveTimePerYearByLine mFaultTimePerYearByLine = new MNonActiveTimePerYearByLine();
            mFaultTimePerYearByLine.setMachine(dataGraphData.get(i).getMachine());
            mFaultTimePerYearByLine.setStopautowaits(Double.valueOf(dataGraphData.get(i).getStopautowait()));
            graphData.add(mFaultTimePerYearByLine);
        }


        List<MNonActiveTimePerYearByLine> listGetMachineName = faultTimeMonitoringService.getMachineName(filter);
       /* listGetMachineName.stream().forEach(q->{
            System.out.println("www"+q.getMachineName());
        });*/
        List<MNonActiveTimePerYearByLine> finalMap = new ArrayList<MNonActiveTimePerYearByLine>();
       List<Machine> map = machineRepository.findAllMachines();

        for (int j = 0; j < listGetMachineName.size(); j++) {
            boolean exist = false;
            String[] months = new String[15];
            MNonActiveTimePerYearByLine mFaultTimePerYearByLine = new MNonActiveTimePerYearByLine();
            for (int k = 0; k < dataTotalHourByLine.size(); k++) {

                if (listGetMachineName.get(j).getMachineName().equals(dataTotalHourByLine.get(k).getMachine())) {
                    exist = true;

                    mFaultTimePerYearByLine.setLineName(dataTotalHourByLine.get(k).getLineName());
                    mFaultTimePerYearByLine.set_date(dataTotalHourByLine.get(k).get_date());
                    mFaultTimePerYearByLine.setMachine(dataTotalHourByLine.get(k).getMachine());

                    months[0]=dataTotalHourByLine.get(k).getJan();
                    months[1]=dataTotalHourByLine.get(k).getFeb();
                    months[2]=dataTotalHourByLine.get(k).getMar();
                    months[3]=dataTotalHourByLine.get(k).getApr();
                    months[4]=dataTotalHourByLine.get(k).getMay();
                    months[5]=dataTotalHourByLine.get(k).getJun();
                    months[6]=dataTotalHourByLine.get(k).getJul();
                    months[7]=dataTotalHourByLine.get(k).getAug();
                    months[8]=dataTotalHourByLine.get(k).getSept();
                    months[9]=dataTotalHourByLine.get(k).getOct();
                    months[10]=dataTotalHourByLine.get(k).getNov();
                    months[11]=dataTotalHourByLine.get(k).getDec();

                    months[12]=dataTotalHourByLine.get(k).getStopTime();
                    months[13]=dataTotalHourByLine.get(k).getActiveTime();
                    months[14]=dataTotalHourByLine.get(k).getPlaningnonworkingtime();
                    mFaultTimePerYearByLine.setStopTime(dataTotalHourByLine.get(k).getStopTime());
                }
            }
            if (!exist && j < listGetMachineName.size()) {
                mFaultTimePerYearByLine.setMachine(listGetMachineName.get(j).getMachineName());
                //TODO static select from web
                mFaultTimePerYearByLine.setLineName(filter.getLineName());
            }
            mFaultTimePerYearByLine.setMonthStopTime(months);
            finalMap.add(mFaultTimePerYearByLine);
        }

        finalMap.stream().forEach((MNonActiveTimePerYearByLine r) ->{
            // System.out.println("******** "+r.getMachine()+" "+r.getMonthStopTime()+" "+r.);
        });
        Map<String, Object> dataJson = new HashMap<>();
        dataJson.put("GraphData", graphData);
        dataJson.put("DataTables", finalMap);

        if (dataTotalHourByLine.size() != 0) {
            response.setCode(StatusCode.FOUND);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
    }

    @RequestMapping(value = "/lineName", method = RequestMethod.GET)
    public ResponseList<MNonActiveTimePerYearByLine> getLineName() throws BusinessException, IOException {
        System.out.println("******************************Run in getLineName****************************** ");
        ResponseList<MNonActiveTimePerYearByLine> response = new ResponseList<>();
        List<MNonActiveTimePerYearByLine> lineName = faultTimeMonitoringService.getLineName();
        if (lineName.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(lineName);

        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/graphData", method = RequestMethod.GET)
    public ResponseList<MNonActiveTimePerYearByLine> graphData(MFaultTimePerYearByLineFilter filter) throws BusinessException, IOException, SQLException {
        System.out.println("******************************Run in graphData****************************** ");
        ResponseList<MNonActiveTimePerYearByLine> response = new ResponseList<>();
        List<MNonActiveTimePerYearByLine> graphData = faultTimeMonitoringService.getGraphData(filter);
        graphData.stream().forEach(x -> System.out.println("$$$ " + x));
        if (graphData.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(graphData);

        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }
}
