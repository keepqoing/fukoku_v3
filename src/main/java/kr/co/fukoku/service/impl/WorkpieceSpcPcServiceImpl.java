package kr.co.fukoku.service.impl;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.math.Stats;

import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.form.wp.WorkpieceIndexing;
import kr.co.fukoku.model.visualization.ArraySpcPcVisualization;
import kr.co.fukoku.model.visualization.SingleDataMultiLinesVisualization;
import kr.co.fukoku.model.visualization.SpcLine;
import kr.co.fukoku.repository_hbase.WorkpieceHBaseRealTimeRepository;
import kr.co.fukoku.service.WorkpieceSpcPcService;
import kr.co.fukoku.utils.MyConverter;
import kr.co.fukoku.utils.StatisticalCalculation;

@Service
public class WorkpieceSpcPcServiceImpl implements WorkpieceSpcPcService{
	
	@Autowired
	private WorkpieceHBaseRealTimeRepository repo;
	
	

	@Override
	public Map<String, Object> workpieceControlChartAndProcessCapability(WorkpieceIndexing wp) {
		Map<String , Object> map = new HashMap<String , Object>();
		
		try {
			
		/***************************************************
		 *  Start Query
		 ***************************************************/
		
		//start
        long queryStartTime = System.nanoTime();
        
        String machineName = wp.getMachine().split("_")[1];
		
		String startDate = wp.getStartTime();// MyConverter.getDate(0);
		String stopDate =  wp.getStopTime();// MyConverter.getDate(1);
		
		List<Workpiece> workpieces = new ArrayList<Workpiece>();
		
		String processName = "";
		
		if(wp.getProcesses().size() > 0){
			for(int i=0 ; i < wp.getProcesses().size() ; i++ ) {
				String key= wp.getLine()+"+"+wp.getProduct()+"+"+machineName+"+"+wp.getProcesses().get(i);
				List<Workpiece> inWorkpieces = new ArrayList<Workpiece>();
				inWorkpieces = repo.findWorkpiecePhoenixIndex(key+"+"+startDate, key+"+"+stopDate);
				workpieces.addAll(inWorkpieces);
				processName = wp.getProcesses().get(i);
			}
		}else {
			String key= wp.getLine()+"+"+wp.getProduct()+"+"+machineName+"+"+wp.getProcesses().get(0);
			System.out.println(key+"+"+startDate + " ##### "+ key+"+"+stopDate);
			workpieces = repo.findWorkpiecePhoenixIndex(key+"+"+startDate, key+"+"+stopDate);
			processName = wp.getProcesses().get(0);
		}
		
		Product lslUsl = new Product();
		lslUsl.setLsl(wp.getLsl());
		lslUsl.setUsl(wp.getUsl());
		long LSL = 0;
	    long USL =300;
		if(lslUsl != null) {
			USL = lslUsl.getUsl();
			LSL = lslUsl.getLsl();
		}
		
		//end
   	 	long queryEndTime = System.nanoTime();
        //time elapsed
        float queryTime = queryEndTime - queryStartTime;
        System.out.println("Query  time in seconds: " + (queryTime / 1000000) / 1000);
        map.put("query_time_second", Double.parseDouble(new DecimalFormat("##.##").format((queryTime / 1000000) / 1000)));
		
        /***************************************************
		 *  End Start Query
		 ***************************************************/
        
        
        /***************************************************
		 *  Start Analyzing 
		 ***************************************************/
        long analyzingStartTime = System.nanoTime();
        
        // Find duration 30 minutes
        
        List<LocalDate> getDatesInPeriod = MyConverter.getDatesInPeriod(
				new Date(MyConverter.convertDateToMilliseconds(startDate, "yyyy-MM-dd")) , 
				new Date(MyConverter.convertDateToMilliseconds(stopDate, "yyyy-MM-dd"))  );
		getDatesInPeriod.add(MyConverter.toLocalDate(new Date(MyConverter.convertDateToMilliseconds(stopDate, "yyyy-MM-dd"))));
		
		List<ArraySpcPcVisualization> spcs = new ArrayList<ArraySpcPcVisualization>();
		List<Double> fullDataSetReadDatas = new ArrayList<Double>();
		List<Double> allXbar = new ArrayList<Double>();
		List<Double> allRange = new ArrayList<Double>();
		long totalProductForAllDays = 0;
		long totalOkProductForAllDays = 0;
		
		for( LocalDate workDate : getDatesInPeriod){
			
			long maxOkForOneDay = 0;
            long maxDsForOneDay = 0;
			
			String startTime = "";
	        String stopTime = "";
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
	        Calendar calendar = Calendar.getInstance();

	        calendar.setTime(sdf.parse(workDate + "T08:00:00.000"));
	        //int maxDay = c.getActualMaximum(Calendar.DAY_OF_MONTH);
	        int maxDay = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
	        System.out.println("********* Next 30 minutes ********");
	        for (int co = 0; co < 52 ; co++) {
	        	//c.add(Calendar.DATE, 1);
                startTime = sdf.format(calendar.getTime());
                calendar.add(Calendar.MINUTE, 30);
                stopTime = sdf.format(calendar.getTime());
                
                // Temp Variable
                List<Double> dataSetReadDatas = new ArrayList<Double>();
                long maxOK = 0;
                long maxDS = 0;
                String processStartTime = "";
                String processEndTime = "";
                String machineStartTime="";
                String machineEndTime="";
                
                int workpieceCount30minutes = 0;
    			for (Workpiece workpiece : workpieces) {
    				
    				if (!workpiece.getProductStartTime().equalsIgnoreCase("null") || workpiece.getProductStartTime().trim().equalsIgnoreCase("")) {
    					 SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
    			         Date st = simpleDateFormat.parse(startTime);
    			         Date et = simpleDateFormat.parse(stopTime);
    			         Date wpStartTime = simpleDateFormat.parse(workpiece.getProductDetailStartTime());
    			         Date wpEndTime = simpleDateFormat.parse(workpiece.getProductDetailEndTime());
    			         
    			         if (wpStartTime.getTime() >= st.getTime() && wpEndTime.getTime() < et.getTime()) {
    			        	
    			        	 workpieceCount30minutes++;
    			        	 
    			        	 
    			        	 /***
    			               *  Read data of each workpiece
    			               */
    			              //System.out.println("getReadData : "+ workpiece.getReadData());
    			              if (!workpiece.getReadData().trim().equalsIgnoreCase("[]")) {
    			            	  if(!workpiece.getReadData().equals("null")){
    			            		  	String readData = workpiece.getReadData().replace("]", "");
    		                            double[] readDataArr = Stream.of(readData.replace("[", "").split(","))
    		                                    .mapToDouble(Double::parseDouble)
    		                                    .toArray();
    		                            double sum = 0;
    		                            for(int rd=0; rd < readDataArr.length; rd++){
    		                                dataSetReadDatas.add(readDataArr[rd]);
    		                                fullDataSetReadDatas.add(readDataArr[rd]);
    		                            }
    		                            
    			            	  }
    			              }
    			              /***
    			               * End Read data 
    			               */
    			              
    			              // For 30 minutes
    			              try {
    			        		  if (Long.parseLong(workpiece.getDailyOk()) > maxOK) {
    		                           maxOK = Long.parseLong(workpiece.getDailyOk());
    		                      }
    			        	  }catch(Exception e) {}
    			        	  try {
    		                      if (Long.parseLong(workpiece.getDailySeq()) > maxDS) {
    		                          maxDS = Long.parseLong(workpiece.getDailySeq());
    		                      }
    			        	  }catch(Exception e) { }
    			        	  
    			        	  // For One  Day
    			        	  try {
    			        		  if (Long.parseLong(workpiece.getDailyOk()) > maxOkForOneDay) {
    			        			  maxOkForOneDay = Long.parseLong(workpiece.getDailyOk());
    		                      }
    			        	  }catch(Exception e) {}
    			        	  try {
    		                      if (Long.parseLong(workpiece.getDailySeq()) > maxDsForOneDay) {
    		                    	  maxDsForOneDay = Long.parseLong(workpiece.getDailySeq());
    		                      }
    			        	  }catch(Exception e) { }
    			        	  
    			        	  
    			        	  if(processStartTime.equals("")) {
    			            	  processStartTime = workpiece.getProductDetailStartTime();
    			        	  }
    			              processEndTime = workpiece.getProductDetailStartTime();
    			              
    			              if(machineStartTime.equals("")) {
    			        		  machineStartTime = workpiece.getProductStartTime();
    			        	  } 
    			              machineEndTime = workpiece.getProductEndTime();
    			        	 
    			        	 
    			        	 // End 30 minutes data
    			         }else {
    			        	 
    			         } // End Crose time
    				
    				} // end if product start time is null
    				
    				
    			}
    			
    			System.out.println("workpieceCount30minutes : "+ workpieceCount30minutes);  
    		    if(workpieceCount30minutes != 0) {
    		    	
    		    	System.out.println("workpieceCount30minutes : "+ workpieceCount30minutes);  
    					
    		    	/****
    		         *  X-Bar & R Chart |  Cp Cpk
    		         */ 
    		    	double range = 0;
    		        double xBar = 0;
    		        double cp = 0;
    		        double cpk = 0;
    		        double std =0;
    		        
    		        double cpNew = 0;
    		        double cpkNew = 0;
    		        
    		        if(dataSetReadDatas.size() > 0) {
    		        	range = Collections.max(dataSetReadDatas) - Collections.min(dataSetReadDatas);
    		            xBar = Stats.meanOf(dataSetReadDatas);
    		            
    		            // Cp & Cpk
        		        double[] dataSetReadData = new double[dataSetReadDatas.size()]; 
        			    for (int r = 0; r < dataSetReadDatas.size(); r++) {
        			        	dataSetReadData[r] = dataSetReadDatas.get(r);
        			    }
        			    
        			    double x1[] = dataSetReadData;
        			    double target1 = maxDS;
        				double usl1 =  USL;
        				double lsl1 =  LSL;
        				
        				double mean = Stats.meanOf(x1);
        				double sigma = StatisticalCalculation.calStandardDeviation(x1);
        				double sigma2 = StatisticalCalculation.computeSigma2(x1, target1);
        				double[] processCapabilities = StatisticalCalculation.computeCp(lsl1, target1, usl1, mean, sigma, sigma2);
        				cp = processCapabilities[0];
        				cpk = processCapabilities[4];
        				std = processCapabilities[8];
        				
        				 cpNew = StatisticalCalculation.calCp(dataSetReadData, USL, LSL);
         				 cpkNew = StatisticalCalculation.calCpk(LSL, USL, MyConverter.formatter(xBar), cpNew);
        				
    		        }
    		        
    		        Object[][] rangVal = new Object[1][3];
    		        Object[][] xBarVal = new Object[1][3];
    		        Object[][] hiddenBarVal = new Object[1][3];
    		       
    		        rangVal[0][0] = MyConverter.convertDateToMilliseconds(startTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    		        rangVal[0][1] = MyConverter.formatter(range);
    		        rangVal[0][2] = MyConverter.convertDateToMilliseconds(startTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    		        
    		        xBarVal[0][0] = MyConverter.convertDateToMilliseconds(startTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    		        xBarVal[0][1] = MyConverter.formatter(xBar);
    		        xBarVal[0][2] = MyConverter.convertDateToMilliseconds(startTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    		        
    		        ArraySpcPcVisualization spc = new ArraySpcPcVisualization();
    		        spc.setRang(MyConverter.formatter(range));
    		        spc.setxBar(MyConverter.formatter(xBar));
    		      
    		        spc.setDailySeq(maxDS);
    		        spc.setOkProduct(maxOK);
    		        spc.setNgProduct(maxDS - maxOK);
    		        spc.setStartTime(MyConverter.changeDateFormat(startTime, "yyyy-MM-dd'T'HH:mm:ss.SSS", "HH:mm"));
    		        spc.setEndTime(MyConverter.changeDateFormat(stopTime, "yyyy-MM-dd'T'HH:mm:ss.SSS", "HH:mm"));
    		        spc.setProductStartTime(processStartTime);
    		        spc.setProductEndTime(processEndTime);
    		        spc.setMachineEndTime(machineEndTime);
    		        spc.setMachineStartTime(machineStartTime);
    		        spc.setxBarVal(xBarVal);
    		        spc.setRangVal(rangVal);
    		        spc.setProductDate(workDate+"");
    		        
    		        if(std == 0) {
    		        	spc.setCp(1.67);
    		        	spc.setCpk(1.67);
    				}else {
    					spc.setCp(MyConverter.formatter(cp));
    	    		    spc.setCpk(MyConverter.formatter(cpk));
    				}
    		        
    		       
    		        spc.setCp(cpNew);
    		        spc.setCpk(cpkNew);
    		        
    		        allXbar.add(range);
    		        allRange.add(xBar);
    		        
    		        
    		        
    		        
    		        spcs.add(spc);
    		        
    			}
    			
    			
	        	
	        	
	        } // end loop  30 minutes
	        
	        
	        
	        
	        totalProductForAllDays += maxDsForOneDay;
	        totalOkProductForAllDays += maxOkForOneDay;
			
		} // end loop getDatesInPeriod
		
		double[] allRangeArr = new double[allRange.size()]; 
	    for (int r = 0; r < allRange.size(); r++) {
	    	allRangeArr[r] = allRange.get(r);
	    }
	    
	    double[] allXbarArr = new double[allXbar.size()]; 
	    for (int r = 0; r < allXbar.size(); r++) {
	    	allXbarArr[r] = allXbar.get(r);
	    }
	    
	    double sigmaR = StatisticalCalculation.calStandardDeviation(allRangeArr);
	    double sigmaX = StatisticalCalculation.calStandardDeviation(allXbarArr);
		
		SpcLine spcLineXbar =new SpcLine();
		spcLineXbar.setCenterLine(MyConverter.formatter(allXbar.stream().mapToDouble(Double::doubleValue).average().orElse(0)) );
		spcLineXbar.setUsl(USL);
		spcLineXbar.setLsl(LSL);
		
		spcLineXbar.setUcl(spcLineXbar.getCenterLine() + (3. * sigmaR));
		spcLineXbar.setLcl(spcLineXbar.getCenterLine() - (3. * sigmaR));
		
		SpcLine spcLineRange =new SpcLine();
		spcLineRange.setCenterLine(MyConverter.formatter(allRange.stream().mapToDouble(Double::doubleValue).average().orElse(0)));
		spcLineRange.setUsl(USL);
		spcLineRange.setLsl(LSL);
		
		spcLineRange.setUcl(spcLineRange.getCenterLine() + (3. * sigmaR));
		spcLineRange.setLcl(spcLineRange.getCenterLine() - (3. * sigmaR));
		
		
	    
	    
		
	    
	    
		
		double allCp = 0;
        double allCpk = 0;
        SingleDataMultiLinesVisualization singleData = new SingleDataMultiLinesVisualization(); 
        
        if(fullDataSetReadDatas.size() > 0) {
        	
            // Cp & Cpk
	        double[] dataSetReadData = new double[fullDataSetReadDatas.size()]; 
		    for (int r = 0; r < fullDataSetReadDatas.size(); r++) {
		        	dataSetReadData[r] = fullDataSetReadDatas.get(r);
		    }
		    
		    double x1[] = dataSetReadData;
		    double target1 = totalProductForAllDays;
			double usl1 =  USL;
			double lsl1 =  LSL;
			
			double mean = Stats.meanOf(x1);
			double sigma = StatisticalCalculation.calStandardDeviation(x1);
			double sigma2 = StatisticalCalculation.computeSigma2(x1, target1);
			double[] processCapabilities = StatisticalCalculation.computeCp(lsl1, target1, usl1, mean, sigma, sigma2);
			allCp = processCapabilities[0];
			allCpk = processCapabilities[4];
			
			
			singleData.setTotalProduct(totalProductForAllDays);
			singleData.setOkProduct(totalOkProductForAllDays);
			singleData.setNgProduct(totalProductForAllDays - totalOkProductForAllDays);
			
			singleData.setMeanR(MyConverter.formatter(allRange.stream().mapToDouble(Double::doubleValue).average().orElse(0)));
			singleData.setMeanX(MyConverter.formatter(allXbar.stream().mapToDouble(Double::doubleValue).average().orElse(0)) );
			
			singleData.setStartTime(spcs.get(0).getProductDate() +" "+spcs.get(0).getStartTime());
			singleData.setEndTime(spcs.get(spcs.size()-1).getProductDate() +" "+spcs.get(spcs.size()-1).getEndTime());
	        
			double[] nums ={Collections.max(allRange), Collections.min(allRange) , Collections.max(allXbar), Collections.min(allXbar), Collections.max(fullDataSetReadDatas) , Collections.min(fullDataSetReadDatas) ,usl1 , lsl1 };
			Arrays.sort(nums); 
			singleData.setMinBar(nums[0]); 
			singleData.setMaxBar(nums[nums.length - 1]); 
			
		
			if(processCapabilities[8] == 0) {
				singleData.setCp(1.67);
				singleData.setCpk(1.67);
				singleData.setPp(1.67);
				singleData.setPpk(1.67);
				singleData.setStdv(0);
			}else {
				singleData.setCp( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[0]) || Double.isNaN(processCapabilities[0]) ) ? 0 : processCapabilities[0])) );
				singleData.setCpk( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[4]) || Double.isNaN(processCapabilities[4]) ) ? 0 : processCapabilities[4])) );
				singleData.setPp( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[6]) || Double.isNaN(processCapabilities[6]) ) ? 0 : processCapabilities[6])) );
				singleData.setPpk( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[7]) || Double.isNaN(processCapabilities[7]) ) ? 0 : processCapabilities[7])) );
				singleData.setStdv( Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(processCapabilities[8]) || Double.isNaN(processCapabilities[8]) ) ? 0 : processCapabilities[8])) );
			}
			
			double cpNew = StatisticalCalculation.calCp(dataSetReadData, USL, LSL);
			double cpkNew = StatisticalCalculation.calCpk(LSL, USL, totalProductForAllDays, cpNew);
			singleData.setCp(cpNew);
			singleData.setCpk(cpkNew);
			
        }
        
		
		//end
   	 	long analyzingEndTime = System.nanoTime();
        //time elapsed
   	    float analyzingTime = analyzingEndTime - analyzingStartTime;
        System.out.println("analyzing time in seconds: " + (analyzingTime / 1000000) / 1000);
        map.put("analyzing_time_second", Double.parseDouble(new DecimalFormat("##.##").format((analyzingTime / 1000000) / 1000)));
		
        /***************************************************
		 *  End Start Analyzing 
		 ***************************************************/
        if(workpieces.size() != 0){
            map.put("code",200);
            map.put("message","RESULT FOUND");
            map.put("data",spcs);
            map.put("single_data",singleData);
            map.put("range_line",spcLineXbar);
            map.put("xbar_line",spcLineRange);
            
        }else{
            map.put("code",404);
            map.put("message","RESULT NOT FOUND");
        }
		}catch(Exception e){
			e.printStackTrace();
		}
		return map;
	}

}
