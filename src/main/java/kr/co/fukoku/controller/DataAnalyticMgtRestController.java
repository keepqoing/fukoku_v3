package kr.co.fukoku.controller;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.form.wp.WorkpieceIndexing;
import kr.co.fukoku.repository.DataAnalyticMgtRepository;
import kr.co.fukoku.utils.MyConverter;

@RestController
@RequestMapping("/v3/api/fukoku/data-analytic-mgt")
public class DataAnalyticMgtRestController {
	
	@Autowired
	private DataAnalyticMgtRepository repo;
	
	@RequestMapping(value="/",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> hbaseIndex()   {
		Map<String , Object> map = new HashMap<String , Object>();
		
		//start
        long queryStartTime = System.nanoTime();
        
		
		
		List<Map<String, Object>> monitoring_mstate_tmp = repo.monitoring_mstate_tmp();
		List<Map<String, Object>> monitoring_workpiece_amount_tmp = repo.monitoring_workpiece_amount_tmp();
            map.put("code",200);
            map.put("message","RESULT FOUND");
            map.put("monitoring_mstate_tmp",monitoring_mstate_tmp);
            map.put("monitoring_workpiece_amount_tmp",monitoring_workpiece_amount_tmp);
        
		//end
   	 	long queryEndTime = System.nanoTime();
        //time elapsed
   	 
        float queryTime = queryEndTime - queryStartTime;

        System.out.println("Query  time in seconds: " + (queryTime / 1000000) / 1000);
        
        map.put("query_time_second", Double.parseDouble(new DecimalFormat("##.##").format((queryTime / 1000000) / 1000)));
		return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
	}

}
