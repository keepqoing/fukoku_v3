package kr.co.fukoku.service;

import java.util.Map;

import kr.co.fukoku.model.form.wp.WorkpieceIndexing;

public interface WorkpieceSpcPcService {

	Map<String , Object> workpieceControlChartAndProcessCapability(WorkpieceIndexing wp);
	
}
