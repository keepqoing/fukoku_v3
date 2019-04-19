package kr.co.fukoku.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.fukoku.filters.WorkpieceFilter;

public interface WorkpieceProduceAmountService {
	
	 ArrayList<Map<String,Object>> getMaxDsAndTargetByModelFromLastMachine(WorkpieceFilter workpieceFilter);
	 ArrayList<Map<String, Object>> getWorkPlanGroupByModel(WorkpieceFilter workpieceFilter);
	 List<Map<String,Object>> findTargetAndProducedProduct(WorkpieceFilter filter);

}
