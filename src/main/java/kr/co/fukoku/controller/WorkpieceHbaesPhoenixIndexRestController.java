package kr.co.fukoku.controller;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.form.wp.WorkpieceIndexing;
import kr.co.fukoku.service.WorkpieceHbaesPhoenixIndexService;
import kr.co.fukoku.utils.MyConverter;

@RestController
@RequestMapping("/v3/api/fukoku/workpiece-hbase-phoenix-index")
public class WorkpieceHbaesPhoenixIndexRestController {
	
	@Autowired
	private WorkpieceHbaesPhoenixIndexService service;
	
	@RequestMapping(value="/hbase",method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> hbaseIndex(@RequestBody WorkpieceIndexing wp)   {
		Map<String , Object> map = new HashMap<String , Object>();
		
		//start
        long queryStartTime = System.nanoTime();
        
		String machineName = wp.getMachine().split("_")[1];
		
		long startDate = MyConverter.convertDateToMilliseconds(wp.getStartTime(), "YYYY/MM/DD HH:mm:ss");
		long stopDate =  MyConverter.convertDateToMilliseconds(wp.getStopTime(), "YYYY/MM/DD HH:mm:ss"); 
		String key= wp.getLine()+"+"+machineName+"+"+wp.getProduct()+"+"+wp.getProcesses().get(0);
		System.out.println(key+"+"+startDate);
		System.out.println(key+"+"+stopDate);
		List<Workpiece> data = service.findWorkpieceHbaseIndex(key+"+"+startDate, key+"+"+stopDate , wp.getOffset());
		if(data.size() != 0){
            map.put("code",200);
            map.put("message","RESULT FOUND");
            map.put("data",data);
            map.put("count",service.countWorkpiece(key+"+"+startDate, key+"+"+stopDate));
        }else{
            map.put("code",404);
            map.put("message","RESULT NOT FOUND");
        }
		//end
   	 	long queryEndTime = System.nanoTime();
        //time elapsed
   	 
        float queryTime = queryEndTime - queryStartTime;

        System.out.println("Query  time in seconds: " + (queryTime / 1000000) / 1000);
        
        map.put("query_time_second", Double.parseDouble(new DecimalFormat("##.##").format((queryTime / 1000000) / 1000)));
		return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
	}
	
	public static void main(String args[]) {
		System.out.println(MyConverter.convertDateToMilliseconds("2018/01/01 08:00:00", "YYYY/MM/DD HH:mm:ss"));
		System.out.println(MyConverter.convertDateToMilliseconds("2019/04/01 08:00:00", "YYYY/MM/DD HH:mm:ss"));
	}

}
