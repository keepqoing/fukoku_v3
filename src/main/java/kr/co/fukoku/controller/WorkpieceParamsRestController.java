package kr.co.fukoku.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.ProcessChain;
import kr.co.fukoku.model.ProductProcessVar;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.LineRepository;
import kr.co.fukoku.repository.WorkpieceParamsRepository;

@RestController
@RequestMapping("/v3/api/fukoku/workpiece-params")
public class WorkpieceParamsRestController {
	
	@Autowired
	private WorkpieceParamsRepository repository;
	
	@RequestMapping(value="/lines",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> lines()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	List<Line> data = repository.findAll();
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
	
	@RequestMapping(value="/product-machine/{line}",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> productMachine(@PathVariable("line") String line)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	ProcessChain data = repository.findProcessChainByRefLine(line);
        	if(data != null ) {
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
	
	@RequestMapping(value="/process-var/{process_chain_machine_id}",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> productMachine(@PathVariable("process_chain_machine_id") long id)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	List<ProductProcessVar> data = repository.finProductProcessVar(id);
        	if(data != null ) {
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
