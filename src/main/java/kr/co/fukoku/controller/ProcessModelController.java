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
    public ResponseEntity<Map<String,Object>> save(@RequestBody List<ProcessChain> frm)  {
        Map<String, Object> map = new HashMap<String, Object>();



        try {
            for(ProcessChain processChain: frm){
                ProcessChain pro = processChain;


//                System.out.println("id of the line " + pro.getRef_line() + " is " + pro.getId());
//                System.out.println("after id of the line " + pro.getRef_line() + " is "
//                        + repository.getProcessChainIdByLine(pro.getRef_line()));
                int truncateSucess = repository.truncateProcessModel(pro.getName());
                if(truncateSucess != 1){
                    map.put("code", 500);
                    map.put("message", "Error! " );
                }

                // TRUNCATE FIRST
                /*
                int truncateSucess = repository.truncateProcessModel(pro.getRef_line());
                if(truncateSucess != 1){
                    map.put("code", 500);
                    map.put("message", "Error! " );
                }
                */

//                long i = (repository.save(pro)) ;
//                System.out.println("I = " + i);
                int processChainID = repository.getLastID(pro);

                if(processChainID > 0){
//                    int lastID = repository.getLastID();
                    pro.setId(processChainID);


                    /// Insert into Process_Product Table
                    List<ProcessProductFrm> proPds = processChain.getProcess_product();
                    for(ProcessProductFrm pp : proPds){
                        pp.setRef_process_chain_id(processChainID);
                        int m = repository.saveProcessProduct(pp);
                    }
                    //==================================================


                    List<ProcessChainElementModelFrm> pCEs = processChain.getProcess_chain_element();
                    for(ProcessChainElementModelFrm pCE : pCEs){
                        pCE.setRef_process_chain_id(processChainID);
//                        long j = repository.saveProcessChainElement(pCE);
                        int pCEID = repository.getLastPCEID(pCE);
                        if(pCEID>0){
//                            int lastPCEID = repository.getLastPCEID();
                            pCE.setId(pCEID);
                            List<ProcessMachineModelFrm> pMs = pCE.getProcessMachineFrms();
                            for(ProcessMachineModelFrm pm : pMs){
                                pm.setRefProcessChainElement(pCEID);
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
//                System.out.println(pro.toString());
            }

        }catch(Exception e) {
            e.printStackTrace();
            map.put("code", 500);
            map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }


    /*
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
                                // Product Process Var
                                for(ProcessMachineModelFrm pm : processMachines){
                                    List<ProductProcessVarFrm> ppf = repository.findAllProductProcessVar(pm.getId());
                                    if(ppf.size() > 0){
                                        pm.setProductProcessVarFrm(ppf);
                                    }
                                }
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
    */

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> findAllProcessModels()  {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<ProcessModel> processModels = repository.findAllProcessModels();

            if(processModels.size() > 0 ) {
                for(ProcessModel processModel : processModels) {

                    List<ProcessChain> processChains = repository.findProcessModelsByLines(processModel.getRef_line());

                    if(processChains.size() > 0) {
                        // Get all Procss Product

                        for(ProcessChain processChain : processChains){
                        List<ProcessProductFrm> processProductFrms =
                                repository.findAllProcessProducts(processChain.getId());

                        List<ProcessChainElementModelFrm> processChainElements =
                                repository.findAllProcessChainElements(processChain.getId());

                        if (processChainElements.size() > 0) {
                            for (ProcessChainElementModelFrm pce : processChainElements) {
                                List<ProcessMachineModelFrm> processMachines = repository.findAllProcessMachines(pce.getId());
                                if (processMachines.size() > 0) {
                                    // Product Process Var
//                                    for (ProcessMachineModelFrm pm : processMachines) {
//                                        List<ProductProcessVarFrm> ppf = repository.findAllProductProcessVar(pm.getId());
//                                        if (ppf.size() > 0) {
//                                            pm.setProductProcessVarFrm(ppf);
//                                        }
//                                    }
                                    pce.setProcessMachineFrms(processMachines);
                                }
                            }
                        }

                            processChain.setProcess_product(processProductFrms);
                            processChain.setProcess_chain_element(processChainElements);
                            processModel.setProcessChains(processChains);
//                        System.out.println(processModel.toString());
                    }
                }
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

            List<ProcessModel> processModels = repository.findAllProcessModelsInLine(lines);

            if(processModels.size() > 0 ) {
                for(ProcessModel processModel : processModels) {

                    List<ProcessChain> processChains = repository.findProcessModelsByLines(processModel.getRef_line());

                    if(processChains.size() > 0) {
                        // Get all Procss Product

                        for(ProcessChain processChain : processChains){
                            List<ProcessProductFrm> processProductFrms =
                                    repository.findAllProcessProducts(processChain.getId());

                            List<ProcessChainElementModelFrm> processChainElements =
                                    repository.findAllProcessChainElements(processChain.getId());

                            if (processChainElements.size() > 0) {
                                for (ProcessChainElementModelFrm pce : processChainElements) {
                                    List<ProcessMachineModelFrm> processMachines = repository.findAllProcessMachines(pce.getId());
                                    if (processMachines.size() > 0) {
                                        // Product Process Var
//                                        for (ProcessMachineModelFrm pm : processMachines) {
//                                            List<ProductProcessVarFrm> ppf = repository.findAllProductProcessVar(pm.getId());
//                                            if (ppf.size() > 0) {
//                                                pm.setProductProcessVarFrm(ppf);
//                                            }
//                                        }
                                        pce.setProcessMachineFrms(processMachines);
                                    }
                                }
                            }

                            processChain.setProcess_product(processProductFrms);
                            processChain.setProcess_chain_element(processChainElements);
                            processModel.setProcessChains(processChains);
//                            System.out.println(processModel.toString());
                        }
                    }
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

    @RequestMapping(value="/remove/{lines}",method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> delete(@PathVariable("lines") String lines)  {
        Map<String, Object> map = new HashMap<String, Object>();

        System.out.println("lines will be removed are : "+ lines);


        try {
            int i = repository.truncateProcessModel(lines);
            if( i == 1) {
                map.put("message", "Data has been deleted!");
                map.put("code", 200);
            }else if(i == 2){
                map.put("code", 404);
                map.put("message", "Data has not been deleted!");
            } else{
                map.put("code", 888);
                map.put("message", "Data has not been deleted!");
            }
        }catch(Exception e) {
            e.printStackTrace();
            map.put("code", 500);
            map.put("message", "Error! " + e.getMessage());
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }
}
