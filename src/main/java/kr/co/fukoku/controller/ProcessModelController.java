package kr.co.fukoku.controller;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.*;
import kr.co.fukoku.repository.ProcessModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v3/api/fukoku/process_model")
public class ProcessModelController {

    @Autowired
    private ProcessModelRepository repository;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> save(@RequestBody List<ProcessModel> frm)  {
        Map<String, Object> map = new HashMap<String, Object>();

        int truncateSucess = repository.truncateProcessModel();
        if(truncateSucess != 1){
            map.put("code", 500);
            map.put("message", "Error! " );
        }

        try {
            for(ProcessModel processModel: frm){
                ProcessModel pro = processModel;
                long i = (repository.save(pro)) ;
                System.out.println("I = " + i);
                if(i>0){
                    int lastID = repository.getLastID();
                    pro.setId(lastID);


                    /// Insert into Process_Product Table
                    List<ProcessProductFrm> proPds = processModel.getProcess_product();
                    for(ProcessProductFrm pp : proPds){
                        pp.setRef_process_chain_id(lastID);
                        int m = repository.saveProcessProduct(pp);
                    }
                    //==================================================


                    List<ProcessChainElementModelFrm> pCEs = processModel.getProcess_chain_element();
                    for(ProcessChainElementModelFrm pCE : pCEs){
                        pCE.setRef_process_chain_id(lastID);
                        long j = repository.saveProcessChainElement(pCE);
                        if(j>0){
                            int lastPCEID = repository.getLastPCEID();
                            pCE.setId(lastPCEID);
                            List<ProcessMachineModelFrm> pMs = pCE.getProcessMachineFrms();
                            for(ProcessMachineModelFrm pm : pMs){
                                pm.setRefProcessChainElement(lastPCEID);
                                long z = repository.saveProcessMachine(pm);
                                if(z > 0){
                                    map.put("message", "Data has been inserted!");
                                    map.put("code", 200);
                                }
                            }

                        }
                    }



                }else {
                    map.put("code", 404);
                    map.put("message", "Data has not been inserted!");
                }
                System.out.println(pro.toString());
            }

        }catch(Exception e) {
            e.printStackTrace();
            map.put("code", 500);
            map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }



    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllProcessModels()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<ProcessModel> processModels = repository.findAllProcessModels();

            if(processModels.size() > 0 ) {
                for(ProcessModel processModel : processModels){

                    // Get all Procss Product
                    List<ProcessProductFrm> processProductFrms =
                            repository.findAllProcessProducts(processModel.getId());

                    List<ProcessChainElementModelFrm> processChainElements =
                            repository.findAllProcessChainElements(processModel.getId());

                    if(processChainElements.size() > 0){
                        for(ProcessChainElementModelFrm pce : processChainElements){
                            List<ProcessMachineModelFrm> processMachines = repository.findAllProcessMachines(pce.getId());
                            if(processMachines.size() > 0 ){
                                pce.setProcessMachineFrms(processMachines);
                            }
                        }
                    }

                    processModel.setProcess_product(processProductFrms);
                    processModel.setProcess_chain_element(processChainElements);
                    System.out.println(processModel.toString());
                }
                    map.put("data", processModels);
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


    @RequestMapping(value="/lines/{lines}", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllProcessModelsByLines(@PathVariable("lines") String lines)  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {

//            lines  = lines.replace("_",",");

            List<ProcessModel> processModels = repository.findProcessModelsByLines(lines);

            if(processModels.size() > 0 ) {

                for(ProcessModel processModel : processModels){

                    // Get all Procss Product
                    List<ProcessProductFrm> processProductFrms =
                            repository.findAllProcessProducts(processModel.getId());


                    List<ProcessChainElementModelFrm> processChainElements =
                            repository.findAllProcessChainElements(processModel.getId());

                    if(processChainElements.size() > 0){
                        for(ProcessChainElementModelFrm pce : processChainElements){
                            List<ProcessMachineModelFrm> processMachines = repository.findAllProcessMachines(pce.getId());
                            if(processMachines.size() > 0 ){
                                pce.setProcessMachineFrms(processMachines);
                            }
                        }
                    }
                    processModel.setProcess_product(processProductFrms);
                    processModel.setProcess_chain_element(processChainElements);
                    System.out.println(processModel.toString());
                }
                map.put("data", processModels);
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

    //	Chomrern as of 2019-01-28
    @RequestMapping(value="/lines", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllLines()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<Line> data = repository.findAllLineInProcessModel();
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
