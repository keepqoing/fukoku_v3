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
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.model.form.MachineFrm;
import kr.co.fukoku.model.form.ProductFrm;
import kr.co.fukoku.model.response.Table;
import kr.co.fukoku.repository.FactoryRepository;
import kr.co.fukoku.repository.LineRepository;
import kr.co.fukoku.repository.MachineRepository;
import kr.co.fukoku.repository.ProductRepository;
import kr.co.fukoku.utils.ExcelGeneratorDynamic;
import kr.co.fukoku.utils.ReadExcelDynamic;

@RestController
@RequestMapping("/v3/api/fukoku/machine")
public class MachineRestController {
	
	@Autowired
	private MachineRepository repository;
	
	@RequestMapping(value="/find",method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> findAll(@RequestBody MachineFrm f)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	List<Machine> data = repository.findAll(f);
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
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findOne(@PathVariable("id") long id)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	Machine data = repository.findOne(id);
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
	
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<Map<String,Object>> delete(@PathVariable("id") long id)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	if(repository.delete(id)) {
        		map.put("message", "Data has been deleted!");
        		map.put("code", 200);
        	}else {
        		map.put("code", 404);
        		map.put("message", "Data has not been deleted!");
        	}
        }catch(Exception e) {
        	e.printStackTrace();
        	map.put("code", 500);
    		map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> save(@RequestBody MachineFrm frm)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	if(repository.save(frm)) {
        		map.put("message", "Data has been inserted!");
        		map.put("code", 200);
        	}else {
        		map.put("code", 404);
        		map.put("message", "Data has not been inserted!");
        	}
        }catch(Exception e) {
        	e.printStackTrace();
        	map.put("code", 500);
    		map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Map<String,Object>> update(@RequestBody MachineFrm frm)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	if(repository.update(frm)) {
        		map.put("message", "Data has been updated!");
        		map.put("code", 200);
        	}else {
        		map.put("code", 404);
        		map.put("message", "Data has not been updated!");
        	}
        }catch(Exception e) {
        	e.printStackTrace();
        	map.put("code", 500);
    		map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
	
	@GetMapping(value = "/download")
    public ResponseEntity<InputStreamResource> excelCustomersReport() throws IOException {
		List<Map<String, Object>>  f =(List<Map<String, Object>> ) repository.findMap(new MachineFrm(""));
		
		ByteArrayInputStream in = ExcelGeneratorDynamic.customersToExcel(f,Table.MACHINE_COLUMN);
		// return IOUtils.toByteArray(in);
		
		HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Machine.xlsx");
		
		 return ResponseEntity
	                .ok()
	                .headers(headers)
	                .body(new InputStreamResource(in));
    }
	
	@PostMapping(value = "/import")
	public ResponseEntity<Map<String,Object>> handleFileUpload( @RequestParam("file") MultipartFile uploadfile) throws IOException, JSONException {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONArray jsonArr = ReadExcelDynamic.readExcel(uploadfile, Table.MACHINE_COLUMN);
		List<MachineFrm> fArr = new ArrayList<MachineFrm>();
		
		for(int i=0;i<jsonArr.length();i++) {
			MachineFrm  f = new MachineFrm();
			f.setName( (String) jsonArr.getJSONObject(i).get("name")  );
			f.setSeq( Long.parseLong((String) jsonArr.getJSONObject(i).get("seq"))  );
			f.setRefProcessId(Long.parseLong((String) jsonArr.getJSONObject(i).get("ref_process_id"))  );
			f.setIp( (String) jsonArr.getJSONObject(i).get("ip")  );
			f.setImportDate( (String) jsonArr.getJSONObject(i).get("import_date")  );
			f.setCode( (String) jsonArr.getJSONObject(i).get("code")  );
			f.setManufacturer((String) jsonArr.getJSONObject(i).get("manufacturer"));
			f.setFacilityStaff((String) jsonArr.getJSONObject(i).get("facility_staff"));
			f.setFacilityContactPerson((String) jsonArr.getJSONObject(i).get("facility_contact_person"));
			f.setPlcType((String) jsonArr.getJSONObject(i).get("plc_type"));
			f.setPlcCommunicationDevice((String) jsonArr.getJSONObject(i).get("plc_communication_device"));
			f.setStation((String) jsonArr.getJSONObject(i).get("station"));
			f.setRemark((String) jsonArr.getJSONObject(i).get("remark"));
			f.setStatus( (String) jsonArr.getJSONObject(i).get("status")  );
			fArr.add(f);
		}
		
		if(repository.saveLst(fArr)) {
    		map.put("message", "Data(s) has been inserted!");
    		map.put("code", 200);
    	}else {
    		map.put("code", 404);
    		map.put("message", "Data(s) has not been inserted!");
    	}
		
		
		return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
	}

	// Chomrern as of 2019-01-14
	@RequestMapping(value="/by_process/{process_name}",method = RequestMethod.GET)
	public ResponseEntity<Map<String,Object>> findAllByProcess(@PathVariable("process_name") String process_name)  {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<Machine> data = repository.findAllByProcess(process_name);
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
