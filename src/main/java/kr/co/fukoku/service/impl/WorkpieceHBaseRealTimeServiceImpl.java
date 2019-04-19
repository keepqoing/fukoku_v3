package kr.co.fukoku.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.visualization.ArrayMultiLinesVisualization;
import kr.co.fukoku.model.visualization.SingleDataMultiLinesVisualization;
import kr.co.fukoku.service.WorkpieceHBaseRealTimeService;
import kr.co.fukoku.utils.MyConverter;

@Service
public class WorkpieceHBaseRealTimeServiceImpl implements WorkpieceHBaseRealTimeService {

	@Autowired
	private kr.co.fukoku.repository_hbase.WorkpieceHBaseRealTimeRepository repo;

	@Override
	public List<ArrayMultiLinesVisualization> findWorkpiecePhoenixIndex(String startLpmprd, String stopLpmprd, Product product)
			throws ParseException {
		// TODO Auto-generated method stub
		List<Workpiece> workpieces = repo.findWorkpiecePhoenixIndex(startLpmprd, stopLpmprd);

		List<ArrayMultiLinesVisualization> workpieceVisuals = new ArrayList<ArrayMultiLinesVisualization>();

		if (workpieces.size() > 0) {
			long usl = 0;
			long lsl = 0;
			try {
			     usl = product.getUsl();
				 lsl = product.getLsl();
			}catch(Exception e) {
				usl = 300;
				lsl = 0;
			}
			
			

			int seq = 0;

			for (int i = 0; i < workpieces.size(); i++) {

				ArrayMultiLinesVisualization workpieceVisual = new ArrayMultiLinesVisualization();
				
				// lpmprd
				System.out.println(workpieces.get(i).getRowKey());
				String rowKey[] = workpieces.get(i).getRowKey().split("\\+"); 
				
				workpieces.get(i).setLineName(rowKey[0]);
				workpieces.get(i).setModel(rowKey[1]);
				workpieces.get(i).setMachineName(rowKey[2]);
				workpieces.get(i).setProcessName(rowKey[3]);
				workpieces.get(i).setProductDate(rowKey[4]);
				
				Long millis = MyConverter.convertDateToMilliseconds(
						workpieces.get(i).getProductStartTime() == null ? "0" : workpieces.get(i).getProductStartTime(),
						"yyyy-MM-dd'T'HH:mm:ss.SSS");

				if (!workpieces.get(i).getReadData().equalsIgnoreCase("null")
						&& !workpieces.get(i).getReadPoints().equalsIgnoreCase("null")) {

					String rd = workpieces.get(i).getReadData().replace("]", "");
					double[] rdArr = Stream.of(rd.replace("[", "").split(",")).mapToDouble(Double::parseDouble)
							.toArray();

					String rp = workpieces.get(i).getReadPoints().replace("]", "");
					long[] rpArr = Stream.of(rp.replace("[", "").split(",")).mapToLong(Long::parseLong).toArray();

					if (rdArr.length > 0 || rpArr.length > 0) {
						
						
						
						/*
						Object[][] productVal = new Object[rdArr.length][11];
						Object[][] uslVal = new Object[rdArr.length][11];
						Object[][] lslVal = new Object[rdArr.length][11];
						Long startTime = MyConverter
								.convertDateToMilliseconds(
										workpieces.get(i).getProductDetailStartTime() == null ? "0"
												: workpieces.get(i).getProductDetailStartTime(),
										"yyyy-MM-dd'T'HH:mm:ss.SSS");
						int inSeq = 1;
						int minOfRPorRD = 0;
						if (rpArr.length < rdArr.length) {
							minOfRPorRD = rpArr.length;
						} else if (rdArr.length < rpArr.length) {
							minOfRPorRD = rdArr.length;
						} else {
							minOfRPorRD = rdArr.length;
						}
						for (int r = 0; r < minOfRPorRD; r++) {

							long rpTime = startTime += rpArr[r];

							productVal[r][0] = rpTime;
							productVal[r][1] = rdArr[r];
							productVal[r][2] = workpieces.get(i).getProcessName();
							productVal[r][3] = workpieces.get(i).getModel();
							productVal[r][4] = seq;
							productVal[r][5] = usl;
							productVal[r][6] = lsl;
							productVal[r][7] = rpTime;
							productVal[r][8] = inSeq;
							productVal[r][9] = rdArr[r];
							productVal[r][10] = workpieces.get(i).getProductDetailQuality();

							uslVal[r][0] = rpTime;
							uslVal[r][1] = usl;
							uslVal[r][2] = workpieces.get(i).getProcessName();
							uslVal[r][3] = workpieces.get(i).getModel();
							uslVal[r][4] = seq;
							uslVal[r][5] = usl;
							uslVal[r][6] = lsl;
							uslVal[r][7] = rpTime;
							uslVal[r][8] = inSeq;
							uslVal[r][9] = rdArr[r];
							uslVal[r][10] = workpieces.get(i).getProductDetailQuality();

							lslVal[r][0] = rpTime;
							lslVal[r][1] = lsl;
							lslVal[r][2] = workpieces.get(i).getProcessName();
							lslVal[r][3] = workpieces.get(i).getModel();
							lslVal[r][4] = seq;
							lslVal[r][5] = usl;
							lslVal[r][6] = lsl;
							lslVal[r][7] = rpTime;
							lslVal[r][8] = inSeq;
							lslVal[r][9] = rdArr[r];
							lslVal[r][10] = workpieces.get(i).getProductDetailQuality();

							inSeq++;
						}
						*/
						
						Object[][] productVal = new Object[1][11];
						Object[][] uslVal = new Object[1][11];
						Object[][] lslVal = new Object[1][11];
						
						long startTime = MyConverter
								.convertDateToMilliseconds(
										workpieces.get(i).getProductDetailStartTime() == null ? "0"
												: workpieces.get(i).getProductDetailStartTime(),
										"yyyy-MM-dd'T'HH:mm:ss.SSS");
						long rpTime = 0;
						double avg = 0;
						for (int r = 0; r < rdArr.length ; r++) {
							if(rpTime == 0) {
								rpTime = startTime += rpArr[r];
							}
							avg += rdArr[r];
						}
						if(rdArr.length > 0) {
							avg = avg / rdArr.length; 
						}
						

						productVal[0][0] = rpTime;
						productVal[0][1] = avg;
						productVal[0][2] = workpieces.get(i).getProcessName();
						productVal[0][3] = workpieces.get(i).getModel();
						productVal[0][4] = seq;
						productVal[0][5] = usl;
						productVal[0][6] = lsl;
						productVal[0][7] = rpTime;
						productVal[0][8] = seq;
						productVal[0][9] = workpieces.get(i).getProductDetailQuality();

						uslVal[0][0] = rpTime;
						uslVal[0][1] = usl;
						uslVal[0][2] = workpieces.get(i).getProcessName();
						uslVal[0][3] = workpieces.get(i).getModel();
						uslVal[0][4] = seq;
						uslVal[0][5] = usl;
						uslVal[0][6] = lsl;
						uslVal[0][7] = rpTime;
						uslVal[0][8] = seq;
						uslVal[0][9] = workpieces.get(i).getProductDetailQuality();

						lslVal[0][0] = rpTime;
						lslVal[0][1] = lsl;
						lslVal[0][2] = workpieces.get(i).getProcessName();
						lslVal[0][3] = workpieces.get(i).getModel();
						lslVal[0][4] = seq;
						lslVal[0][5] = usl;
						lslVal[0][6] = lsl;
						lslVal[0][7] = rpTime;
						lslVal[0][8] = seq;
						lslVal[0][9] = workpieces.get(i).getProductDetailQuality();
						
						

						workpieceVisual.setProductValues(productVal);
						workpieceVisual.setLslValues(lslVal);
						workpieceVisual.setUslValues(uslVal);
					}

				} else {

					Object[][] productVal = new Object[1][11];
					Object[][] uslVal = new Object[1][11];
					Object[][] lslVal = new Object[1][11];

					productVal[0][0] = millis;
					productVal[0][1] = 0;
					productVal[0][2] = workpieces.get(i).getProcessName();
					productVal[0][3] = workpieces.get(i).getModel();
					productVal[0][4] = seq;
					productVal[0][5] = usl;
					productVal[0][6] = lsl;
					productVal[0][7] = millis;
					productVal[0][8] = seq;
					productVal[0][9] = workpieces.get(i).getProductDetailQuality();

					uslVal[0][0] = millis;
					uslVal[0][1] = usl;
					uslVal[0][2] = workpieces.get(i).getProcessName();
					uslVal[0][3] = workpieces.get(i).getModel();
					uslVal[0][4] = seq;
					uslVal[0][5] = usl;
					uslVal[0][6] = lsl;
					uslVal[0][7] = millis;
					uslVal[0][8] = seq;
					uslVal[0][9] = workpieces.get(i).getProductDetailQuality();

					lslVal[0][0] = millis;
					lslVal[0][1] = lsl;
					lslVal[0][2] = workpieces.get(i).getProcessName();
					lslVal[0][3] = workpieces.get(i).getModel();
					lslVal[0][4] = seq;
					lslVal[0][5] = usl;
					lslVal[0][6] = lsl;
					lslVal[0][7] = millis;
					lslVal[0][8] = seq;
					lslVal[0][9] = workpieces.get(i).getProductDetailQuality();

					workpieceVisual.setProductValues(productVal);
					workpieceVisual.setLslValues(lslVal);
					workpieceVisual.setUslValues(uslVal);
				}
				
				
				workpieceVisual.setProductDate(workpieces.get(i).getProductDate());
				workpieceVisual.setProcessName(workpieces.get(i).getProcessName());
				workpieceVisual.setLsl(lsl);
				workpieceVisual.setUsl(usl);
				workpieceVisual.setDailySeq(workpieces.get(i).getDailySeq());	
				workpieceVisual.setOkProduct(workpieces.get(i).getDailyOk());
				workpieceVisual.setNgProduct(workpieces.get(i).getDailyNg());
				workpieceVisual.setReadData(workpieces.get(i).getReadData());
				workpieceVisual.setReadPoints(workpieces.get(i).getReadPoints());
				workpieceVisual.setProductStartTime(workpieces.get(i).getProductStartTime());
				workpieceVisual.setProductEndTime(workpieces.get(i).getProductEndTime());
				workpieceVisual.setProductDetailQuality(workpieces.get(i).getProductDetailQuality());
				
				workpieceVisuals.add(workpieceVisual);

			} // End workpieces loop

			
			
			
			 
			 

		}

		return workpieceVisuals;
	}

}
