package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.exception.BusinessException;
import kr.co.fukoku.filters.MFaultTimePerYearByMFilter;
import kr.co.fukoku.model.MNonActiveTimePerYearByM;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.repository.MachineRepository;
import kr.co.fukoku.service.MNonActiveTimePerYearByMService;
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
import java.util.*;

@RestController
@RequestMapping("/v1/api/fukoku/faultime")
public class MNonActiveTimePerYearByMController {
    @Autowired
    private MNonActiveTimePerYearByMService faultTimeMonitoringService;
//    @Autowired
//    private MachineService machineService;


    @ApiImplicitParams({
            @ApiImplicitParam(name = "lineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "machineName", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "startTime", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "endTime", dataType = "string", paramType = "query"),
    })
    @RequestMapping(value = "/getTotalHourByMachine", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> getTotalHourByMachine(@ApiIgnore MFaultTimePerYearByMFilter filter) throws BusinessException, IOException {
        System.out.println("******************************Run in Class MFaultTimePerYearByMController****************************** ");
        //System.out.println("??????????????? "+filter.getMachineName() + filter.getStartTime());
        List<MNonActiveTimePerYearByM> listGetMachineName = faultTimeMonitoringService.getMachineName(filter);
        List<MNonActiveTimePerYearByM> dataTotalHourByMacine = faultTimeMonitoringService.getTotalHourByMachine(filter);
        ResponseList<MNonActiveTimePerYearByM> response = new ResponseList<>();
        List<MNonActiveTimePerYearByM> finalMap = new ArrayList<MNonActiveTimePerYearByM>();

        List<MNonActiveTimePerYearByM> graphData = new ArrayList<MNonActiveTimePerYearByM>();

        List<MNonActiveTimePerYearByM> dataGraphData = faultTimeMonitoringService.getGraphData(filter);
        for (int i = 0; i < dataGraphData.size(); i++) {
            MNonActiveTimePerYearByM mFaultTimePerYearByM = new MNonActiveTimePerYearByM();
            mFaultTimePerYearByM.setMachine(dataGraphData.get(i).getMachine());
            mFaultTimePerYearByM.setStopautowaits(Double.valueOf(dataGraphData.get(i).getStopautowait()));
            graphData.add(mFaultTimePerYearByM);
        }

        //TODO first we wnat to know machines is available in other lines 1:M
        for (int j = 0; j < listGetMachineName.size(); j++) {
            double totalHourPerMonth = 0;
            double totalWorkingTime = 0;
            double totalAllMonthNonOperatingTime = 0;
            final boolean[] exist = {false};
            String[] months = new String[15];
            //TODO We try to mapping korea word with english word
            MNonActiveTimePerYearByM mFaultTimePerYearByM = new MNonActiveTimePerYearByM();
            filter.setMachineNameEng(listGetMachineName.get(j).getMappingName());
            filter.setLineName(listGetMachineName.get(j).getLineName());
//            filter.setMachineName(map.get(listGetMachineName.get(j).getMappingName()));

            //TODO calculate percentage of Non operating Rate
            List<MNonActiveTimePerYearByM> getDuration = faultTimeMonitoringService.getTotalDuration(filter);
            //TODO loop get all machines inside the lines
            for (int i2 = 0; i2 < getDuration.size(); i2++) {
                totalAllMonthNonOperatingTime = Double.valueOf(getDuration.get(i2).getNon_operating_time());
            }
            //TODO We need to calculate STOPAUTO_STOPWAIT for all months (12)
            //dataTotalHourByMacine.stream().sorted();
            //Collections.reverse(dataTotalHourByMacine);
            /*final Comparator<MNonActiveTimePerYearByM> comp = (p1, p2) -> Double.compare( Double.parseDouble(p1.getStopTime().replace(",","")), Double.parseDouble(p2.getStopTime().replace(",","")));
            MNonActiveTimePerYearByM getMax = dataTotalHourByMacine.stream()
                    .max(comp)
                    .get();
            System.out.println("%%%%%% "+getMax.getStopTime());*/
            int finalJ = j;
            dataTotalHourByMacine.stream().sorted((Comparator.comparing(MNonActiveTimePerYearByM::getStopTime).reversed())).forEach(q->{
                System.out.println("GGGGGGGGGGGGG "+q.getStopTime());
           // });

          //  for (int k = 0; k < dataTotalHourByMacine.size(); k++) {




                //TODO compare unix machine name in database with data available in database table

                if (listGetMachineName.get(finalJ).getMappingName().equals(q.getMachine())) {
                   // System.out.println("GGGGGGGGGGGGG "+dataTotalHourByMacine.get(k).getStopTime());
                    //TODO prevent null and set default line name although it has no data
                    exist[0] = true;

                    mFaultTimePerYearByM.setLineName(q.getLineName());
                    mFaultTimePerYearByM.setMachine(q.getMachine());
                    months[0]=q.getJan();
                    months[1]=q.getFeb();
                    months[2]=q.getMar();
                    months[3]=q.getApr();
                    months[4]=q.getMay();
                    months[5]=q.getJun();
                    months[6]=q.getJul();
                    months[7]=q.getAug();
                    months[8]=q.getSept();
                    months[9]=q.getOct();
                    months[10]=q.getNov();
                    months[11]=q.getDec();


                    months[12]=q.getStopTime();
                    months[13]=q.getActiveTime();
                    months[14]=q.getPlaningnonworkingtime();
                    mFaultTimePerYearByM.setStopTime(q.getStopTime());
                    //mFaultTimePerYearByM.setActiveTime(dataTotalHourByLine.get(k).getActiveTime());

                }



            //}
            });
            if (!exist[0] && j < listGetMachineName.size()) {
                mFaultTimePerYearByM.setMachine(listGetMachineName.get(j).getMappingName());
                //TODO static select from web
                mFaultTimePerYearByM.setLineName(listGetMachineName.get(j).getLineName());
            }
            mFaultTimePerYearByM.setMonthStopTime(months);
            finalMap.add(mFaultTimePerYearByM);
            graphData.add(mFaultTimePerYearByM);
            System.out.println("$%%%% "+mFaultTimePerYearByM);
        }

        Map<String, Object> dataJson = new HashMap<>();
        dataJson.put("GraphData", graphData);
        dataJson.put("DataTables", finalMap);

        return new ResponseEntity<Map<String, Object>>(dataJson, HttpStatus.OK);
    }

    @RequestMapping(value = "/machineName", method = RequestMethod.GET)
    public ResponseList<MNonActiveTimePerYearByM> findMachineName(MFaultTimePerYearByMFilter mFilter) throws SQLException, BusinessException {
        System.out.println("******************************findMachineName****************************** ");
        ResponseList<MNonActiveTimePerYearByM> response = new ResponseList<>();
        List<MNonActiveTimePerYearByM> mStateList = null;
        System.out.println("Get Line Name " + mFilter.getLineName());
        if (!mFilter.getLineName().equals("")) {
            System.out.println("1111111111111111111111111111");
            mStateList = faultTimeMonitoringService.findMachineNameBySelectLine(mFilter);
        } else {
            System.out.println("2222222222222222222222222222222222");
            mStateList = faultTimeMonitoringService.findMachineName();
        }
        if (mStateList.size() != 0) {

            response.setCode(StatusCode.FOUND);
            response.setData(mStateList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/graphDataByMachine", method = RequestMethod.GET)
    public ResponseList<MNonActiveTimePerYearByM> graphData(MFaultTimePerYearByMFilter filter) throws BusinessException, IOException, SQLException {
        System.out.println("******************************Run in graphData****************************** ");
        System.out.println("ddddddddddddddddddddddddd " + filter.getMachineName() + filter.getStartTime());

        ResponseList<MNonActiveTimePerYearByM> response = new ResponseList<>();
        List<MNonActiveTimePerYearByM> graphData = faultTimeMonitoringService.findGraphDataByMachine(filter);
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
