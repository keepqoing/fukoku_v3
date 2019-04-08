package kr.co.fukoku.controller;

import kr.co.fukoku.model.AbnormalMgt;
import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.form.AbnormalMgtFrm;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.model.response.Table;
import kr.co.fukoku.repository.AbnormalMgtRepository;
import kr.co.fukoku.repository.FactoryRepository;
import kr.co.fukoku.utils.ExcelGeneratorDynamic;
import kr.co.fukoku.utils.ReadExcelDynamic;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v3/api/fukoku/abnormal-mgt")
public class AbnormalMgtRestController {
	
	@Autowired
	private AbnormalMgtRepository repository;

	@RequestMapping(value="/find",method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> findAll(@RequestBody AbnormalMgtFrm frm)  {
        Map<String, Object> map = new HashMap<String, Object>();
        System.out.print("name ===== "+ frm.getName());
        try {
        	List<AbnormalMgt> data = repository.findAll(frm);
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
	
	@RequestMapping(value="/{name}",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findOne(@PathVariable("name") String name)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	AbnormalMgt data = repository.findOne(name);
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

	@RequestMapping(value="/id/{id}",method = RequestMethod.GET)
	public ResponseEntity<Map<String,Object>> findOneById(@PathVariable("id") long id)  {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			AbnormalMgt data = repository.findOneById(id);
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

	
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> save(@RequestBody AbnormalMgtFrm frm)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	System.out.print(frm.toString());
        	repository.save(frm);
       		// Insert into abnormal_mgt_line table
			repository.saveLstAbnormalMgtLine(frm.getLines(), frm.getId());

			map.put("message", "Data has been inserted!");
			map.put("code", 200);

        }catch(Exception e) {
        	e.printStackTrace();
        	map.put("code", 500);
    		map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
	
	@RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Map<String,Object>> update(@RequestBody AbnormalMgtFrm frm)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
        	System.out.print(frm.toString());
        	if(repository.update(frm)) {

        		// Firstly, remove the old relationship between abnormal_mgt and line
				repository.deleteAbnormalMgtLine(frm.getId());
				// Secondly, save the new relationship between abnormal_mgt and line
				repository.saveLstAbnormalMgtLine(frm.getLines(), frm.getId());

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

	
	@PostMapping(value = "/download")
    public ResponseEntity<InputStreamResource> excelCustomersReport(@RequestBody AbnormalMgtFrm frm) throws IOException {
		List<Map<String, Object>>  f =(List<Map<String, Object>> ) repository.findMap(frm);
		
		
		ByteArrayInputStream in = ExcelGeneratorDynamic.customersToExcel(f,Table.ABNORMAL_MGT_COLUMN);
		// return IOUtils.toByteArray(in);
		
		HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=abnormal-mgt.xlsx");
		
		 return ResponseEntity
	                .ok()
	                .headers(headers)
	                .body(new InputStreamResource(in));
    }
	
	
	@PostMapping(value = "/import")
	public ResponseEntity<Map<String,Object>> handleFileUpload( @RequestParam("file") MultipartFile uploadfile) throws IOException, JSONException {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONArray jsonArr = ReadExcelDynamic.readExcel(uploadfile, Table.ABNORMAL_MGT_COLUMN);
		List<AbnormalMgtFrm> fArr = new ArrayList<AbnormalMgtFrm>();
		
		for(int i=0;i<jsonArr.length();i++) {
			AbnormalMgtFrm  f = new AbnormalMgtFrm();

			f.setName( (String) jsonArr.getJSONObject(i).get("name")  );
			f.setSeq( Integer.parseInt((String) jsonArr.getJSONObject(i).get("seq")));  ;
			f.setRefFactoryId( Integer.parseInt((String) jsonArr.getJSONObject(i).get("ref_factory_id")));  ;
			f.setRefDepartmentId( Integer.parseInt((String) jsonArr.getJSONObject(i).get("ref_department_id")));  ;
//			f.set( (String) jsonArr.getJSONObject(i).get("ref_line_id")  );
			f.setData( (String) jsonArr.getJSONObject(i).get("data")  );
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

	



}
