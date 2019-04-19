package kr.co.fukoku.service;

import java.util.Map;

import kr.co.fukoku.model.form.wp.WorkpieceIndexing;


public interface WorkpieceProcessCycleTimeService {

	Map<String , Object> workpieceProcessCycleTimes(WorkpieceIndexing wp);
	
}
