package kr.co.fukoku.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.form.wp.WorkpieceIndexing;
import kr.co.fukoku.model.visualization.ArrayCycleTimesVisualization;
import kr.co.fukoku.model.visualization.SingleDataMultiLinesVisualization;
import kr.co.fukoku.repository_hbase.WorkpieceHBaseRealTimeRepository;
import kr.co.fukoku.service.WorkpieceProcessCycleTimeService;
import kr.co.fukoku.utils.MyConverter;

@Service
public class WorkpieceProcessCycleTimeServiceImpl implements WorkpieceProcessCycleTimeService {
	
	@Autowired
	private WorkpieceHBaseRealTimeRepository repo;

	@Override
	public Map<String , Object> workpieceProcessCycleTimes(WorkpieceIndexing wp) {
		
		Map<String , Object> map = new HashMap<String , Object>();
		
		List<ArrayCycleTimesVisualization> visualizations = new ArrayList<ArrayCycleTimesVisualization>();
		
		
		//start
        long queryStartTime = System.nanoTime();
        
        String machineName = wp.getMachine().split("_")[1];
		
		String startDate = wp.getStartTime();// MyConverter.getDate(0);
		String stopDate =  wp.getStopTime();// MyConverter.getDate(1);
		
		List<Workpiece> workpieces = new ArrayList<Workpiece>();
		
		if(wp.getProcesses().size() > 0){
			for(int i=0 ; i < wp.getProcesses().size() ; i++ ) {
				String key= wp.getLine()+"+"+wp.getProduct()+"+"+machineName+"+"+wp.getProcesses().get(i);
				List<Workpiece> inWorkpieces = new ArrayList<Workpiece>();
				inWorkpieces = repo.findWorkpiecePhoenixIndex(key+"+"+startDate, key+"+"+stopDate);
				workpieces.addAll(inWorkpieces);
			}
		}else {
			String key= wp.getLine()+"+"+wp.getProduct()+"+"+machineName+"+"+wp.getProcesses().get(0);
			System.out.println(key+"+"+startDate + " ##### "+ key+"+"+stopDate);
			workpieces = repo.findWorkpiecePhoenixIndex(key+"+"+startDate, key+"+"+stopDate);
		}
		
		
		
		//end
   	 	long queryEndTime = System.nanoTime();
        //time elapsed
        float queryTime = queryEndTime - queryStartTime;
        System.out.println("Query  time in seconds: " + (queryTime / 1000000) / 1000);
        map.put("query_time_second", Double.parseDouble(new DecimalFormat("##.##").format((queryTime / 1000000) / 1000)));
		
        
        
        
        /******************************************
         ******************************************
         ******************************************/
        
        // analyzing start
        long analyzingStartTime = System.nanoTime();

		double minMachineCycleTime = 0;
        double minProcessCycleTime = 0;
        double minProcessIntervalCycleTime = 0;
        double minProductionCycleTime = 0;
        
        double maxMachineCycleTime = 0;
        double maxProcessCycleTime = 0;
        double maxProcessIntervalCycleTime = 0;
        double maxProductionCycleTime = 0;
        
		long workpieceCount = 0;
		
		int forEachIndex = 0;
		for (Workpiece workpiece : workpieces) {
			
			forEachIndex++;
			long oneProcessIntervalCycleTime = 0;
			workpieceCount += 1;
       	 
			ArrayCycleTimesVisualization visualization = new ArrayCycleTimesVisualization();
			
			String machineStartTime="";
	        String machineEndTime="";
	        String processStartTime = "";
	        String processEndTime = "";
	        
	        long machineCycleTime = 0;
	        long processCycleTime = 0;
	        long processIntervalCycleTime = 0;
	        long productionCycleTime = 0;
	        
	        
	        
	        long startTimeReadPoint = 0;
	        long endTimeReadPoint = 0;
	        
	        /***  Process/Machine start time and end time ***/
      	  if(machineStartTime.equals("")) {
      		  machineStartTime = workpiece.getProductStartTime();
      	  } 
            machineEndTime = workpiece.getProductEndTime();
            
            if(processStartTime.equals("")) {
          	  processStartTime = workpiece.getProductDetailStartTime();
      	  }
            processEndTime = workpiece.getProductDetailStartTime();
            /***  End Process/Machine start time and end time ***/
	        
	        /***
             * Start and end point (by 1st and  last workpiece)
             */
            if (!workpiece.getReadPoints().trim().equalsIgnoreCase("[]")) {
          	  if(!workpiece.getReadPoints().equals("null")){
          		  long pdst = MyConverter.convertDateToMilliseconds(workpiece.getProductDetailStartTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
          		  long pdet = MyConverter.convertDateToMilliseconds(workpiece.getProductDetailStartTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
          		  String rp = workpiece.getReadPoints().replace("]", "");
                    long[] readPointArr = Stream.of(rp.replace("[", "").split(","))
                            .mapToLong(Long::parseLong)
                            .toArray();
                    if(readPointArr.length > 0) {
                  	  pdst += readPointArr[0];
                  	  if(startTimeReadPoint == 0) {
                  		  startTimeReadPoint = pdst;
  		        	  }
                        for (int d = 0; d < readPointArr.length; d++) {
                      	  pdet += readPointArr[d];
                        }
                        endTimeReadPoint = pdet;
                        
                        if(readPointArr.length > 1) {
                      	  oneProcessIntervalCycleTime = endTimeReadPoint - startTimeReadPoint;  
                        }else {
                      	  oneProcessIntervalCycleTime = readPointArr[0];
                        }
                        
                    }
          	  }
            }
            /***
             * Start and end point
             */
	        
	        /**
             * Cycle Time
             * - machine_cycle_time : pet - pst
             * - process_cycle_time : pdet - pdst
             * - process_interval_cycle_time : last read point - first read point
             * - production_cycle_time : pst+1 - pet 
             */
            try {
          	  // machine_cycle_time : pet - pst
          	  long oneMachineCycleTime =   MyConverter.convertDateToMilliseconds(workpiece.getProductEndTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS") - MyConverter.convertDateToMilliseconds(workpiece.getProductStartTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
	              machineCycleTime += oneMachineCycleTime;
	              // min & max
	              if(oneMachineCycleTime < minMachineCycleTime ) {
	            	  minMachineCycleTime = oneMachineCycleTime;
	              }
	              if(oneMachineCycleTime > maxMachineCycleTime ) {
	            	  maxMachineCycleTime = oneMachineCycleTime;
	              }
            }catch(Exception e) {}
            try {
          	  // process_cycle_time : pdet - pdst
          	  long oneProcessCycleTime =   MyConverter.convertDateToMilliseconds(workpiece.getProductDetailEndTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS") - MyConverter.convertDateToMilliseconds(workpiece.getProductDetailStartTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
	              processCycleTime += oneProcessCycleTime;
	              // min & max
	              if(oneProcessCycleTime < minProcessCycleTime ) {
	            	  minProcessCycleTime = oneProcessCycleTime;
	              }
	              if(oneProcessCycleTime > maxProcessCycleTime ) {
	            	  maxProcessCycleTime = oneProcessCycleTime;
	              }
            }catch(Exception e) {}
            try {
          	  // process_interval_cycle_time : last read point - first read point
	              processIntervalCycleTime += oneProcessIntervalCycleTime;
	              // min & max
	              if(oneProcessIntervalCycleTime < minProcessIntervalCycleTime ) {
	            	  minProcessIntervalCycleTime = oneProcessIntervalCycleTime;
	              }
	              if(oneProcessIntervalCycleTime > maxProcessIntervalCycleTime ) {
	            	  maxProcessIntervalCycleTime = oneProcessIntervalCycleTime;
	              }
            }catch(Exception e) {}
            try {
          	  // production_cycle_time : pst+1 - pet 
          	  if(workpieces.size() > workpieceCount ) {
          		System.out.println("*** "+ workpieces.get((int) workpieceCount).getProductStartTime() +" ***** "+ workpiece.getProductEndTime() +"********************************************");
					long oneProductionCycleTime =  MyConverter.convertDateToMilliseconds( workpieces.get(forEachIndex).getProductStartTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS") - MyConverter.convertDateToMilliseconds(workpiece.getProductEndTime(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
	            	productionCycleTime += oneProductionCycleTime;
	            	// min & max
		            if(oneProductionCycleTime < minProductionCycleTime ) {
		            	minProductionCycleTime = oneProductionCycleTime;
		            }
		            if(oneProductionCycleTime > maxProductionCycleTime ) {
		            	maxProductionCycleTime = oneProductionCycleTime;
		            }
				  }
            }catch(Exception e) {}
            
            
            /***** End Cycle Time ******/
			
            
  	        
  	        Object[][] machineCycleTimeAr = new Object[1][11];
			Object[][] processCycleTimeAr = new Object[1][11];
			Object[][] processIntervalCycleTimeAr = new Object[1][11];
			Object[][] productionCycleTimeAr = new Object[1][11];
			
			machineCycleTimeAr[0][0] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
			machineCycleTimeAr[0][1] = machineCycleTime / 1000;
			machineCycleTimeAr[0][2] = workpiece.getProcessName();
			machineCycleTimeAr[0][3] = workpiece.getModel();
			machineCycleTimeAr[0][4] = forEachIndex;
			machineCycleTimeAr[0][5] = 0;
			machineCycleTimeAr[0][6] = 0;
			machineCycleTimeAr[0][7] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");;
			machineCycleTimeAr[0][8] = forEachIndex;
			machineCycleTimeAr[0][9] = workpiece.getProductDetailQuality();
			
			processCycleTimeAr[0][0] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
			processCycleTimeAr[0][1] = processCycleTime / 1000;
			processCycleTimeAr[0][2] = workpiece.getProcessName();
			processCycleTimeAr[0][3] = workpiece.getModel();
			processCycleTimeAr[0][4] = forEachIndex;
			processCycleTimeAr[0][5] = 0;
			processCycleTimeAr[0][6] = 0;
			processCycleTimeAr[0][7] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");;
			processCycleTimeAr[0][8] = forEachIndex;
			processCycleTimeAr[0][9] = workpiece.getProductDetailQuality();
			
			processIntervalCycleTimeAr[0][0] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
			processIntervalCycleTimeAr[0][1] = processIntervalCycleTime / 1000;
			processIntervalCycleTimeAr[0][2] = workpiece.getProcessName();
			processIntervalCycleTimeAr[0][3] = workpiece.getModel();
			processIntervalCycleTimeAr[0][4] = forEachIndex;
			processIntervalCycleTimeAr[0][5] = 0;
			processIntervalCycleTimeAr[0][6] = 0;
			processIntervalCycleTimeAr[0][7] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");;
			processIntervalCycleTimeAr[0][8] = forEachIndex;
			processIntervalCycleTimeAr[0][9] = workpiece.getProductDetailQuality();
			
			productionCycleTimeAr[0][0] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
			productionCycleTimeAr[0][1] = productionCycleTime / 1000;
			productionCycleTimeAr[0][2] = workpiece.getProcessName();
			productionCycleTimeAr[0][3] = workpiece.getModel();
			productionCycleTimeAr[0][4] = forEachIndex;
			productionCycleTimeAr[0][5] = 0;
			productionCycleTimeAr[0][6] = 0;
			productionCycleTimeAr[0][7] = MyConverter.convertDateToMilliseconds(processStartTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");;
			productionCycleTimeAr[0][8] = forEachIndex;
			productionCycleTimeAr[0][9] = workpiece.getProductDetailQuality();
			
			
		
			visualization.setMachineCycleTime(machineCycleTimeAr);
			visualization.setProcessCycleTime(processCycleTimeAr);
			visualization.setProcessIntervalCycleTime(processIntervalCycleTimeAr);
			visualization.setProductionCycleTime(productionCycleTimeAr);
			 
  	        visualizations.add(visualization);
		}
		
        
//		double[] nums ={minMachineCycleTime, minProcessCycleTime, minProcessIntervalCycleTime, minProductionCycleTime, 
//				maxMachineCycleTime, maxProcessCycleTime,maxProcessIntervalCycleTime,maxProductionCycleTime};
		double[] nums ={minMachineCycleTime,
				maxMachineCycleTime};
		Arrays.sort(nums);
		
		SingleDataMultiLinesVisualization singleData = new SingleDataMultiLinesVisualization();
		singleData.setMaxBar(nums[nums.length - 1] / 1000 );
		singleData.setMinBar(nums[0] / 1000); 
		
	
		//end
   	 	long analyzingEndTime = System.nanoTime();
        //time elapsed
   	    float analyzingTime = analyzingEndTime - analyzingStartTime;
        System.out.println("analyzing time in seconds: " + (analyzingTime / 1000000) / 1000);
        map.put("analyzing_time_second", Double.parseDouble(new DecimalFormat("##.##").format((analyzingTime / 1000000) / 1000)));
		
        if(workpieces.size() != 0){
            map.put("code",200);
            map.put("message","RESULT FOUND");
            map.put("data",visualizations);
            map.put("single_data",singleData);
        }else{
            map.put("code",404);
            map.put("message","RESULT NOT FOUND");
        }
		
		
		return map;
	}

	
}
