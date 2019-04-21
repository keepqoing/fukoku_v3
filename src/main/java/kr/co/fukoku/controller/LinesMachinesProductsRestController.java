package kr.co.fukoku.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.LineProductMachineProcesses;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.service.LineMachineProcessProductService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/api/fukoku")
public class LinesMachinesProductsRestController {

    @Autowired
    private LineMachineProcessProductService service;

    @RequestMapping(value = "/line/{lineName}", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findLineByLineName(@PathVariable String lineName) {
        Map<String , Object> map = new HashMap<String , Object>();
        List<Line> data = service.findLineByLineName(lineName);
        if(data != null){
            map.put("code","200");
            map.put("message","RESULT FOUND");
            map.put("data",data);
        }else{
            map.put("code","404");
            map.put("message","RESULT NOT FOUND");
        }
        return new ResponseEntity<Map<String,Object>>(map , HttpStatus.OK);
    }
    
    @RequestMapping(value = "/machine/{lineName}", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findMachineByLineName(@PathVariable String lineName) {
        Map<String , Object> map = new HashMap<String , Object>();
        List<Machine> data = service.findMachineByLineName(lineName);
        if(data != null){
            map.put("code","200");
            map.put("message","RESULT FOUND");
            map.put("data",data);
        }else{
            map.put("code","404");
            map.put("message","RESULT NOT FOUND");
        }
        return new ResponseEntity<Map<String,Object>>(map , HttpStatus.OK);
    }
    
    @RequestMapping(value = "/process/{lineName}/{machineName}", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findProcessByLineNameAndMachineName(@PathVariable String lineName, @PathVariable String machineName) {
    	System.out.print("===================> "+ machineName);
        Map<String , Object> map = new HashMap<String , Object>();
        List<kr.co.fukoku.model.Process> data = service.findProcessByLineNameAndMachineName(lineName, machineName);
        if(data != null){
            map.put("code","200");
            map.put("message","RESULT FOUND");
            map.put("data",data);
        }else{
            map.put("code","404");
            map.put("message","RESULT NOT FOUND");
        }
        return new ResponseEntity<Map<String,Object>>(map , HttpStatus.OK);
    }
    
    @RequestMapping(value = "/product/{lineName}", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findProductByLineName(@PathVariable String lineName) {
        Map<String , Object> map = new HashMap<String , Object>();
        List<Product> data = service.findProductsByLine(lineName);
        if(data != null){
            map.put("code","200");
            map.put("message","RESULT FOUND");
            map.put("data",data);
        }else{
            map.put("code","404");
            map.put("message","RESULT NOT FOUND");
        }
        return new ResponseEntity<Map<String,Object>>(map , HttpStatus.OK);
    }
    
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllLineProductMachineProcess() {
        Map<String , Object> map = new HashMap<String , Object>();
        List<LineProductMachineProcesses> data = service.findAllLineProductMachineProcesses();
        if(data != null){
            map.put("code","200");
            map.put("message","RESULT FOUND");
            map.put("data",data);
        }else{
            map.put("code","404");
            map.put("message","RESULT NOT FOUND");
        }
        return new ResponseEntity<Map<String,Object>>(map , HttpStatus.OK);
    }
    

   




}
