package kr.co.fukoku.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.fukoku.filters.WorkpieceFilter;
import kr.co.fukoku.service.WorkpieceProduceAmountService;

@RestController
@RequestMapping("/v1/api/fukoku/workpiece")
public class WorkpieceProduceAmountRestController {
	
	@Autowired
	private WorkpieceProduceAmountService service;
	
	@RequestMapping(value = "/findTargetAndProducedProduct", method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> findTargetAndProducedProduct(@RequestBody WorkpieceFilter filter) {
        Map<String , Object> map = new HashMap<String , Object>();
        try{
            map.put("code","7777");
            map.put("message","RESULT FOUND");
            map.put("TargetAndProducedProduct",service.findTargetAndProducedProduct(filter));
            map.put("getMaxDsAndTargetByModelFromLastMachine", service.getMaxDsAndTargetByModelFromLastMachine(filter));
            map.put("getWorkPlanGroupByModel", service.getWorkPlanGroupByModel(filter));
        }catch (Exception e){
            e.printStackTrace();
            map.put("code","0000");
            map.put("message","ERROR! TIMEOUT.");
        }
        return new ResponseEntity<Map<String,Object>>(map , HttpStatus.OK);
    }

}
