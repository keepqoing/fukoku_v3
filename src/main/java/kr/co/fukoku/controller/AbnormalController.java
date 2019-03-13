package kr.co.fukoku.controller;

import kr.co.fukoku.model.form.AbnormalFrm;
import kr.co.fukoku.model.response.Table;
import kr.co.fukoku.repository.AbnormalRepository;
import kr.co.fukoku.utils.ReadExcelDynamic;
import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v3/api/fukoku/abnormal")
public class AbnormalController {

    @Autowired
    private AbnormalRepository repository;

    @PostMapping(value = "/import")
    public ResponseEntity<Map<String,Object>> handleFileUpload(@RequestParam("file") MultipartFile uploadfile) throws IOException, JSONException {
        Map<String, Object> map = new HashMap<String, Object>();
        JSONArray jsonArr = ReadExcelDynamic.readExcel(uploadfile, Table.ABNORMAL_COLUMN);
        List<AbnormalFrm> fArr = new ArrayList<AbnormalFrm>();

        for(int i=0;i<jsonArr.length();i++) {
            AbnormalFrm  f = new AbnormalFrm();
            f.setFactory( (String) jsonArr.getJSONObject(i).get("factory"));  ;
            f.setDepartment( (String) jsonArr.getJSONObject(i).get("department")  );
            f.setManagementName( (String) jsonArr.getJSONObject(i).get("management_name")  );
            f.setLine( (String) jsonArr.getJSONObject(i).get("line")  );
            f.setType( (String) jsonArr.getJSONObject(i).get("type")  );
            f.setStep( (String) jsonArr.getJSONObject(i).get("step")  );
            f.setCode( (String) jsonArr.getJSONObject(i).get("code")  );
            f.setCategoryName( (String) jsonArr.getJSONObject(i).get("category_name")  );
            f.setSubCategoryCode( (String) jsonArr.getJSONObject(i).get("sub_category_code")  );
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
