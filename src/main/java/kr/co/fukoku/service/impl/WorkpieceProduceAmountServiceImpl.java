package kr.co.fukoku.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.filters.WorkpieceFilter;
import kr.co.fukoku.repository_sql_db2.WorkpieceProduceAmountRepository;
import kr.co.fukoku.service.WorkpieceProduceAmountService;

@Service
public class WorkpieceProduceAmountServiceImpl implements WorkpieceProduceAmountService{
	
	@Autowired
	private WorkpieceProduceAmountRepository repo;

	@Override
	public ArrayList<Map<String, Object>> getMaxDsAndTargetByModelFromLastMachine(WorkpieceFilter workpieceFilter) {
		// TODO Auto-generated method stub
		return repo.getMaxDsAndTargetByModelFromLastMachine(workpieceFilter);
	}

	@Override
	public ArrayList<Map<String, Object>> getWorkPlanGroupByModel(WorkpieceFilter workpieceFilter) {
		// TODO Auto-generated method stub
		return repo.getWorkPlanGroupByModel(workpieceFilter);
	}

	@Override
	public List<Map<String, Object>> findTargetAndProducedProduct(WorkpieceFilter filter) {
		// TODO Auto-generated method stub
		return repo.findTargetAndProducedProduct(filter);
	}

}
