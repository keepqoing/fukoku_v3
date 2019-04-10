package kr.co.fukoku.controller;

import kr.co.fukoku.repository.previousRepo.DefectiveProductV2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v2/api/fukoku/defective-product-v2")
public class DefectiveProductV2RestController {
	
	@Autowired
	private DefectiveProductV2Repository repository;
	
	@RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAll()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	List<Map<String, Object>> data = repository.findAll();
        	if(data.size() > 0 ) {
        		map.put("data", data);
        		map.put("code", 200);
        	}else {
        		map.put("code", 404);
        		map.put("message", "Data not found!");
        	}
        	
        }catch(Exception e) {
        	e.printStackTrace();
        	map.put("code", 500);
    		map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }

}
