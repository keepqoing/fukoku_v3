package kr.co.fukoku.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Process;
import kr.co.fukoku.model.ProcessMachine;
import kr.co.fukoku.model.ProcessVar;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.model.form.MachineFrm;
import kr.co.fukoku.model.form.ProcessFrm;
import kr.co.fukoku.model.form.ProcessMachineFrm;
import kr.co.fukoku.model.form.ProcessVarFrm;
import kr.co.fukoku.model.form.ProductFrm;
import kr.co.fukoku.model.response.Table;
import kr.co.fukoku.repository.FactoryRepository;
import kr.co.fukoku.repository.LineRepository;
import kr.co.fukoku.repository.MachineRepository;
import kr.co.fukoku.repository.ProcessMachineRepository;
import kr.co.fukoku.repository.ProcessRepository;
import kr.co.fukoku.repository.ProcessVarRepository;
import kr.co.fukoku.repository.ProductRepository;
import kr.co.fukoku.service.MStateMonitoringService;
import kr.co.fukoku.service.ProcessMachine3Service;
import kr.co.fukoku.utils.ExcelGeneratorDynamic;
import kr.co.fukoku.utils.ReadExcelDynamic;

@RestController
@RequestMapping("/v3/api/fukoku/mstate-monitoring")
public class MStateMonitoringRestController {
	
	@Autowired
	private MStateMonitoringService service;
	
	@RequestMapping(value="/real-time",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> realTime()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	List<Line> lines = service.findAllLines();
        	List<Process> processes = service.findAllProcesses();
        	map.put("lines", lines);
        	map.put("processes", processes);
        	map.put("code", 200);
        }catch(Exception e) {
        	e.printStackTrace();
        	map.put("code", 500);
    		map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
	
	
	
	
	
}
