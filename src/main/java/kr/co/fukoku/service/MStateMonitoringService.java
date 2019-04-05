package kr.co.fukoku.service;

import java.util.List;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.ProcessChainElement;
import kr.co.fukoku.model.form.LineFrm;


public interface MStateMonitoringService {
	
	
	
	List<Line> findAllLines();
	List<kr.co.fukoku.model.Process> findAllProcesses();

	
}
