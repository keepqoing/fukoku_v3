package kr.co.fukoku.controller;

import kr.co.fukoku.model.form.AlarmJSON.*;
import kr.co.fukoku.repository.AlarmJsonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v3/api/fukoku/json-alarm")
public class AlarmJsonRestController {

    @Autowired
    private AlarmJsonRepository repository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllAlarmsByFactory()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try{
            List<AlarmFactory> alarmFactories = repository.findAllAlarmFactory();

            if(alarmFactories.size() > 0){

                for(AlarmFactory alarmFactory : alarmFactories) {
                    System.out.println("Alarm Factory = " + alarmFactory.getFactory());
                    List<AlarmLine> alarmLines = repository.findAllLinesInFactory(alarmFactory.getFactory());

                    if(alarmLines.size() > 0 ){

                        for(AlarmLine alarmLine : alarmLines){

                            List<AlarmMachine> alarmMachines = repository.findAllMachinesInLine(alarmFactory.getFactory(),alarmLine.getLine());

                            if(alarmMachines.size() > 0){

                                for(AlarmMachine alarmMachine : alarmMachines){

                                    List<AlarmValue> alarmValues = repository.findAllAlarmsInMachine(
                                            alarmFactory.getFactory(),
                                            alarmLine.getLine(),
                                            alarmMachine.getMachine()
                                    );

                                    if(alarmValues.size() > 0){

                                        for(AlarmValue alarmValue : alarmValues){

                                            List<AlarmProduct> alarmProducts = repository.findAllProductsInAlarm(
                                                    alarmFactory.getFactory(),
                                                    alarmLine.getLine(),
                                                    alarmMachine.getMachine(),
                                                    alarmValue.getAlarm()
                                            );

                                            if(alarmProducts.size() > 0){

                                                for(AlarmProduct alarmProduct : alarmProducts){

                                                    String totalMonth = repository.findAllTotalMonthsInAlarm(
                                                            alarmFactory.getFactory(),
                                                            alarmLine.getLine(),
                                                            alarmMachine.getMachine(),
                                                            alarmValue.getAlarm(),
                                                            alarmProduct.getProduct(),
                                                            alarmProduct.getA_year());

                                                    String totalDay = repository.findAllTotalDaysInAlarm(
                                                            alarmFactory.getFactory(),
                                                            alarmLine.getLine(),
                                                            alarmMachine.getMachine(),
                                                            alarmValue.getAlarm(),
                                                            alarmProduct.getProduct(),
                                                            alarmProduct.getA_year());

                                                    if(!totalMonth.isEmpty()){
                                                        String[] str = totalMonth.split(",");
                                                        int[] array = Arrays.stream(str).mapToInt(Integer::parseInt).toArray();
                                                        alarmProduct.setTotal_month(array);


                                                        // Total Day
                                                        String[][] arr = to2dim (totalDay, ":", ",");

                                                        int[][] result = new int[12][];

                                                        for (int i = 0; i < arr.length; i++){
                                                            for (int j = 0; j < arr[i].length; j++){
                                                                result[i] = Arrays.stream(arr[i]).mapToInt(Integer::parseInt).toArray();
                                                            }
                                                        }
                                                        alarmProduct.setTotal_day(result);


                                                    }
                                                }

                                                alarmValue.setProducts(alarmProducts);
                                            }
                                        }

                                        alarmMachine.setAlarms(alarmValues);
                                    }
                                }
                                alarmLine.setMachines(alarmMachines);
                            }


                        }
                        alarmFactory.setLines(alarmLines);
                    }
                }
                map.put("data", alarmFactories);
                map.put("code", 200);
            }else{
                map.put("code", 404);
                map.put("message", "Data not found!");
            }

        }catch(Exception e){
            e.printStackTrace();
            map.put("code", 500);
            map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }



    public String [][] to2dim (String source, String outerdelim, String innerdelim) {

        String[] rows = source.split(outerdelim);

        String[][] table = new String[12][];
        for (int i = 0; i < rows.length; i++) {
            table[i] = rows[i].split(innerdelim);
        }
        return table;

    }
}
