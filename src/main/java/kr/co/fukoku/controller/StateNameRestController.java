package kr.co.fukoku.controller;

import kr.co.fukoku.model.StateName;
import kr.co.fukoku.model.form.StateNameFrm;
import kr.co.fukoku.model.response.Table;
import kr.co.fukoku.repository.StateNameRepository;
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
@RequestMapping("/v3/api/fukoku/state-name")
public class StateNameRestController {

	@Autowired
	private StateNameRepository repository;

	@RequestMapping(value="/find",method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> findAll(@RequestBody StateNameFrm f) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<StateName> data = repository.findAll(f);
			if (data.size() > 0) {
				map.put("data", data);
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data not found!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> findOne(@PathVariable("id") long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			StateName data = repository.findOne(id);
			if (data != null) {
				map.put("data", data);
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data not found!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/korean-name/{koreanName}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> findOneByKoreanName(@PathVariable("koreanName") String koreanName) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			StateName data = repository.findOneByKoreanName(koreanName);
			if (data != null) {
				map.put("data", data);
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data not found!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/english-name/{englishName}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> findOneByEnglishName(@PathVariable("englishName") String englishName) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			StateName data = repository.findOneByKoreanName(englishName);
			if (data != null) {
				map.put("data", data);
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data not found!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Map<String, Object>> delete(@PathVariable("id") long id) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if (repository.delete(id)) {
				map.put("message", "Data has been deleted!");
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data has not been deleted!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> save(@RequestBody StateNameFrm frm) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			System.out.print(frm.toString());
			if (repository.save(frm)) {
				map.put("message", "Data has been inserted!");
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data has not been inserted!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Map<String, Object>> update(@RequestBody StateNameFrm frm) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			System.out.print(frm.toString());
			if (repository.update(frm)) {
				map.put("message", "Data has been updated!");
				map.put("code", 200);
			} else {
				map.put("code", 404);
				map.put("message", "Data has not been updated!");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 500);
			map.put("message", "Error! " + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	
	@GetMapping(value = "/download")
    public ResponseEntity<InputStreamResource> excelCustomersReport() throws IOException {
		List<Map<String, Object>>  f =(List<Map<String, Object>> ) repository.findMap(new StateNameFrm());
		
		ByteArrayInputStream in = ExcelGeneratorDynamic.customersToExcel(f,Table.STATE_NAME_COLUMN);
		// return IOUtils.toByteArray(in);
		
		HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=StateName.xlsx");
		
		return ResponseEntity
	                .ok()
	                .headers(headers)
	                .body(new InputStreamResource(in));
    }
	
	
	@PostMapping(value = "/import")
	public ResponseEntity<Map<String,Object>> handleFileUpload( @RequestParam("file") MultipartFile uploadfile) throws IOException, JSONException {
		Map<String, Object> map = new HashMap<String, Object>();
		JSONArray jsonArr = ReadExcelDynamic.readExcel(uploadfile, Table.STATE_NAME_COLUMN);
		List<StateNameFrm> fArr = new ArrayList<StateNameFrm>();
		
		for(int i=0;i<jsonArr.length();i++) {
			StateNameFrm  f = new StateNameFrm();
			f.setSeq( Long.parseLong((String) jsonArr.getJSONObject(i).get("seq")))  ;
			f.setEngName( (String) jsonArr.getJSONObject(i).get("eng_name")  );
			f.setKoreanName( (String) jsonArr.getJSONObject(i).get("korean_name")  );
			f.setStatus( (String) jsonArr.getJSONObject(i).get("status")  );
			f.setColor( (String) jsonArr.getJSONObject(i).get("color")  );
			f.setUnit((String) jsonArr.getJSONObject(i).get("unit"));
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
