package kr.co.fukoku.controller;

import kr.co.fukoku.model.form.AlarmAppearance.AlarmAppearanceGraph;
import kr.co.fukoku.repository.AlarmAppearanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v3/api/fukoku/alarm-appearance")
public class AlarmAppearanceController {

    @Autowired
    private AlarmAppearanceRepository repository;

    @RequestMapping(value="/{line}/{machine}/{work_date}",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> getAlarmAppearance(
            @PathVariable("line") String line,
            @PathVariable("machine") String machine,
            @PathVariable("work_date") String work_date
    )  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<AlarmAppearanceGraph> result = repository.findAlarmAppearance(line, machine, work_date);
            if(result.size() > 0 ) {

                map.put("data", result);
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
