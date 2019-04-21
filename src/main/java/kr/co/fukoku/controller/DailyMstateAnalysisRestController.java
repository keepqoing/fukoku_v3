package kr.co.fukoku.controller;

import kr.co.fukoku.filters.DailyMstateAnalysisFilter;
import kr.co.fukoku.model.DailyMstateAnalysis;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.ProductStatusGraph;
import kr.co.fukoku.repository.MachineRepository;
import kr.co.fukoku.repository.previousRepo.DailyMstateAnalysisRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/v1/api/fukoku/daily-mstate-analysis")
public class DailyMstateAnalysisRestController {

    @Autowired
    private DailyMstateAnalysisRepo dailyMstateAnalysisRepo;

    @Autowired
    private MachineRepository machineRepository;

    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> findDailyMstateAnalysises(@RequestBody DailyMstateAnalysisFilter f) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        ArrayList<DailyMstateAnalysis> dailyMstateAnalysises = dailyMstateAnalysisRepo.findDailyMstateAnalysises(f);
        map.put("daily_mstate_analysis",dailyMstateAnalysises);

        /**
         * ProductStatusGraph
         */
        ArrayList<ProductStatusGraph> productStatusGraphs = new ArrayList<ProductStatusGraph>();
        for (DailyMstateAnalysis d:dailyMstateAnalysises ) {
            ProductStatusGraph productStatusGraph = new ProductStatusGraph();
            productStatusGraph.setDay( d.getMachine() );
            productStatusGraph.setTotalAmount(Integer.parseInt(d.getTotal_product()));

            productStatusGraph.setPercentageDefectiveProduct( d.getTotal_product().equalsIgnoreCase("0")? 0:
                    (Double.parseDouble(d.getNg_product()) / Double.parseDouble(d.getTotal_product()))  * 100);

            productStatusGraph.setPercentageNonRunningTime(d.getWorking_time_s().equalsIgnoreCase("0")? 0:
                    (Double.parseDouble(d.getNon_active_time_s()) / Double.parseDouble(d.getWorking_time_s()))  * 100);
            productStatusGraph.setPercentageProductEfficiency(1);
            productStatusGraphs.add(productStatusGraph);
        }
        map.put("productStatusGraphs",productStatusGraphs);


        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }


    @RequestMapping(value = "/production-status", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> productionStatus(@RequestBody DailyMstateAnalysisFilter f) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        ArrayList<DailyMstateAnalysis> dailyMstateAnalysises = dailyMstateAnalysisRepo.productionStatus(f);
        map.put("daily_mstate_analysis",dailyMstateAnalysises);

        /**
         * ProductStatusGraph
         */
        ArrayList<ProductStatusGraph> productStatusGraphs = new ArrayList<ProductStatusGraph>();
        for (DailyMstateAnalysis d:dailyMstateAnalysises ) {
            ProductStatusGraph productStatusGraph = new ProductStatusGraph();
            productStatusGraph.setDay( d.getMachine() );
            productStatusGraph.setTotalAmount(Integer.parseInt(d.getTotal_product()));
            productStatusGraph.setPercentageDefectiveProduct( d.getTotal_product().equalsIgnoreCase("0")? 0 :
                    (Double.parseDouble(d.getNg_product()) / Double.parseDouble(d.getTotal_product()))  * 100);
            productStatusGraph.setPercentageNonRunningTime(d.getWorking_time_s().equalsIgnoreCase("0")? 0:
                    (Double.parseDouble(d.getNon_active_time_s()) / Double.parseDouble(d.getWorking_time_s()))  * 100);
            productStatusGraph.setPercentageProductEfficiency(1);
            productStatusGraphs.add(productStatusGraph);
        }
        map.put("productStatusGraphs",productStatusGraphs);


        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }


    @RequestMapping(value = "/process-defect-period-status", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> processDefectPeriodStatus(@RequestBody DailyMstateAnalysisFilter f) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        ArrayList<Map<String,Object>> dailyMstateAnalysises = dailyMstateAnalysisRepo.processDefectPeriodStatus(f);
        map.put("daily_mstate_analysis",dailyMstateAnalysises);
        map.put("error_names",dailyMstateAnalysisRepo.errorNames());
        map.put("count_errrors",dailyMstateAnalysisRepo.countError(f));
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-transcation-detail-by-id", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> deleteTranscationDetailById(@RequestBody DailyMstateAnalysisFilter f) throws Exception {
        String[] ids = f.getLine().split(",");
        ArrayList<Long> idLong = new ArrayList<Long>();
        for(String id : ids){
            idLong.add(Long.parseLong(id));
        }
        dailyMstateAnalysisRepo.deleteTranscationDetailById(idLong);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("daily_mstate_analysis","Data has been deleted "+ f.getLine());
        map.put("delete", true);
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }


    @RequestMapping(value = "/breakdowntimeanalysisbyline", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> breakdowntimeanalysisbyline(@RequestBody DailyMstateAnalysisFilter f) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("breakdowntimeanalysisbyline",  dailyMstateAnalysisRepo.breakdowntimeanalysisbyline(f));
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }

    @RequestMapping(value = "/non_active_Time_by_machine", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> nonActiveTimeByMachine(@RequestBody DailyMstateAnalysisFilter f) throws Exception {
        ArrayList<Map<String, Object>> mapArr = (ArrayList<Map<String, Object>>) dailyMstateAnalysisRepo.breakdowntimeanalysisbyline(f);
        System.out.println("###### non_active_Time_by_machine");
        List<Machine> machine = machineRepository.findAllMachines();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("breakdowntimeanalysisbyline",  mapArr);
        map.put("machines",  machine);
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }





}
