package kr.co.fukoku.controller;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.LongStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.math.Stats;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.form.wp.WorkpieceIndexing;
import kr.co.fukoku.model.visualization.ArrayMultiLinesVisualization;
import kr.co.fukoku.model.visualization.SingleDataMultiLinesVisualization;
import kr.co.fukoku.service.WorkpieceHBaseRealTimeService;
import kr.co.fukoku.utils.MyConverter;
import kr.co.fukoku.utils.StatisticalCalculation;

@RestController
@RequestMapping("/v3/api/fukoku/workpiece")
public class WorkpieceRealTimeRestController {
	
	@Autowired
	private WorkpieceHBaseRealTimeService service;
	
	
	
	@RequestMapping(value="/real-time",method = RequestMethod.POST)
    public ResponseEntity<Map<String,Object>> realTime(@RequestBody WorkpieceIndexing wp) throws ParseException  {
		Map<String , Object> map = new HashMap<String , Object>();
		
		//start
        long queryStartTime = System.nanoTime();
        
		List<ArrayMultiLinesVisualization> data = new ArrayList<ArrayMultiLinesVisualization>();
		
		String machineName = wp.getMachine().split("_")[1];
		
		String startDate = wp.getStartTime();// MyConverter.getDate(0);
		String stopDate =  wp.getStopTime();// MyConverter.getDate(1);
		
		Product lslUsl = new Product();
		lslUsl.setLsl(wp.getLsl());
		lslUsl.setUsl(wp.getUsl());
				
		if(wp.getProcesses().size() > 0){
			for(int i=0 ; i < wp.getProcesses().size() ; i++ ) {
				List<ArrayMultiLinesVisualization> workpieceVisuals = new ArrayList<ArrayMultiLinesVisualization>();
				String key= wp.getLine()+"+"+wp.getProduct()+"+"+machineName+"+"+wp.getProcesses().get(i);
				System.out.println(key+"+"+startDate + " ##### "+ key+"+"+stopDate);
				workpieceVisuals = service.findWorkpiecePhoenixIndex(key+"+"+startDate, key+"+"+stopDate, lslUsl);
				data.addAll(workpieceVisuals);
			}
		}else {
			String key= wp.getLine()+"+"+wp.getProduct()+"+"+machineName+"+"+wp.getProcesses().get(0);
			System.out.println(key+"+"+startDate + " ##### "+ key+"+"+stopDate);
			data = service.findWorkpiecePhoenixIndex(key+"+"+startDate, key+"+"+stopDate, lslUsl);
		}
		
		//end
   	 	long queryEndTime = System.nanoTime();
        //time elapsed
   	 
        float queryTime = queryEndTime - queryStartTime;

        System.out.println("Query  time in seconds: " + (queryTime / 1000000) / 1000);
        
        map.put("query_time_second", Double.parseDouble(new DecimalFormat("##.##").format((queryTime / 1000000) / 1000)));
		
		
        // analyzing start
        long analyzingStartTime = System.nanoTime();
        
		/**
		 * Find SingleData
		 */
		List<Double> dataSetReadDatas = new ArrayList<Double>();
		List<Double> avgReadDatas = new ArrayList<Double>();
		List<Double> xRchartGroup = new ArrayList<Double>();
		
        double maxUsl =0;
        double minUsl =0;
        double maxLsl =0;
        double minLsl =0;
		
		SingleDataMultiLinesVisualization singleData = new SingleDataMultiLinesVisualization(); 
		
		for (ArrayMultiLinesVisualization workpiece : data) {
			
			 /***
             * Mean read data of each workpiece
             */
            System.out.println("getReadData : "+ workpiece.getReadData());
            if (!workpiece.getReadData().trim().equalsIgnoreCase("[]")) {
          	  if(!workpiece.getReadData().equals("null")){
          		   
          		  	String readData = workpiece.getReadData().replace("]", "");
                      double[] readDataArr = Stream.of(readData.replace("[", "").split(","))
                              .mapToDouble(Double::parseDouble)
                              .toArray();
                      double sum = 0;
                      double maxRD = 0;
                      double minRD = 0;
                      for(int rd=0; rd < readDataArr.length; rd++){
                          sum += readDataArr[rd];
                          xRchartGroup.add(readDataArr[rd]); 
                          dataSetReadDatas.add(readDataArr[rd]);
                      }
                      
                      if(readDataArr.length > 0 ) {
                    	  xRchartGroup.add( Collections.max(xRchartGroup) - Collections.min(xRchartGroup)); 
                    	  avgReadDatas.add(sum / readDataArr.length );
                      }else {
                    	  avgReadDatas.add(sum);
                      }
                      
          	  }
            }
            /***
             * End Mean read data 
             */
            
              if ( workpiece.getUsl() > maxUsl) {
            	  maxUsl = workpiece.getUsl();
              }
              if ( workpiece.getUsl() < minUsl) {
            	  minUsl = workpiece.getUsl();
              }
              if ( workpiece.getLsl() > maxLsl) {
            	  maxLsl = workpiece.getLsl();
              }
              if ( workpiece.getLsl() < minLsl) {
            	  minLsl = workpiece.getLsl();
              }
              
              
			
		}
		
		if(dataSetReadDatas.size() > 0) {
			singleData.setMaxProductData(Collections.max(dataSetReadDatas));
			singleData.setMinProductData(Collections.min(dataSetReadDatas));
		}
		
		double[] nums ={singleData.getMinProductData(), singleData.getMaxProductData(), maxLsl, minLsl, maxUsl, minUsl};
		Arrays.sort(nums); if (nums[0] < singleData.getMinBar()) {
		singleData.setMinBar(nums[0]); } if (nums[nums.length - 1] >
		singleData.getMaxBar()) { singleData.setMaxBar(nums[nums.length - 1]); }
		
		
		List<LocalDate> getDatesInPeriod = MyConverter.getDatesInPeriod(
				new Date(MyConverter.convertDateToMilliseconds(startDate, "yyyy-MM-dd")) , 
				new Date(MyConverter.convertDateToMilliseconds(stopDate, "yyyy-MM-dd"))  );
		getDatesInPeriod.add(MyConverter.toLocalDate(new Date(MyConverter.convertDateToMilliseconds(stopDate, "yyyy-MM-dd"))));
		
		long maxOK = 0;
        long maxDS = 0;
        List<Long> maxOkLst = new ArrayList<Long>();
        List<Long> maxDsLst = new ArrayList<Long>();
		for( LocalDate workDate : getDatesInPeriod){
//			System.out.println("workDate : " + workDate + " ------ " + workpiece.getProductDate() );
			long maxOkIn = 0;
	        long maxDsIn = 0;
			for (ArrayMultiLinesVisualization workpiece : data) {
				System.out.println("workDate : " + workDate + " ------ " + workpiece.getProductDate() );
				if(workpiece.getProductDate().equalsIgnoreCase(workDate+"")) {
					 try {
			      		  if (Long.parseLong(workpiece.getOkProduct()) > maxOkIn) {
			      			maxOkIn = Long.parseLong(workpiece.getOkProduct());
			               }
				     }catch(Exception e) {}
				     try {
				          if (Long.parseLong(workpiece.getDailySeq()) > maxDsIn) {
				        	  maxDsIn = Long.parseLong(workpiece.getDailySeq());
				          }
				     }catch(Exception e) { }
				}
			}
			maxOkLst.add(maxOkIn);
			maxDsLst.add(maxDsIn);
		}
		
		//System.out.println("maxDS : " + maxDsLst);
		
		maxOK =  maxOkLst.stream().mapToLong(Long::longValue).sum();
		maxDS = maxDsLst.stream().mapToLong(Long::longValue).sum();
		
		singleData.setTotalProduct(maxDS);
		singleData.setOkProduct(maxOK);
		singleData.setNgProduct(maxDS - maxOK);
		
		
		// Cp & Cpk
		if(dataSetReadDatas.size() > 0) {
			 double[] dataSetReadData = new double[dataSetReadDatas.size()]; 
		     for (int r = 0; r < dataSetReadDatas.size(); r++) {
		        	dataSetReadData[r] = dataSetReadDatas.get(r);
		     }
		     
		    double x1[] = dataSetReadData;
		    double target1 = maxDS;
			double usl1 =  maxUsl;
			double lsl1 =  maxLsl;
			
			double mean = Stats.meanOf(x1);
			double sigma = StatisticalCalculation.calStandardDeviation(x1);
			double sigma2 = StatisticalCalculation.computeSigma2(x1, target1);
			double[] processCapabilities = StatisticalCalculation.computeCp(lsl1, target1, usl1, mean, sigma, sigma2);
			
			double cp = StatisticalCalculation.calCp(dataSetReadData, usl1, lsl1);
			double cpk = StatisticalCalculation.calCpk(lsl1, usl1, maxDS, cp);
			
			
			if(processCapabilities[8] == 0) {
				singleData.setCp(1.67);
				singleData.setCpk(1.67);
			}else {
				singleData.setCp( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[0]) || Double.isNaN(processCapabilities[0]) ) ? 0 : processCapabilities[0])) );
				singleData.setCpk( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[4]) || Double.isNaN(processCapabilities[4]) ) ? 0 : processCapabilities[4])) );
			}
			
			singleData.setCp(cp);
			singleData.setCpk(cpk);
			
		}
		
		
		
		//end
   	 	long analyzingEndTime = System.nanoTime();
        //time elapsed
   	 
   	    float analyzingTime = analyzingEndTime - analyzingStartTime;

        System.out.println("analyzing time in seconds: " + (analyzingTime / 1000000) / 1000);
        
        map.put("analyzing_time_second", Double.parseDouble(new DecimalFormat("##.##").format((analyzingTime / 1000000) / 1000)));
		
		
        if(data.size() != 0){
            map.put("code",200);
            map.put("message","RESULT FOUND");
            map.put("data",data);
            map.put("single_data",singleData);
        }else{
            map.put("code",404);
            map.put("message","RESULT NOT FOUND");
        }
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
    }

}
