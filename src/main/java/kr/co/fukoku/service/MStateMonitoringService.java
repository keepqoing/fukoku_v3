package kr.co.fukoku.service;

import java.util.List;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.ProcessChainElement;
import kr.co.fukoku.model.form.LineFrm;


public interface MStateMonitoringService {
	
	List<kr.co.fukoku.model.Process> findAllProcess( );
	
	List<Line> findAll(LineFrm f);
	List<Line> findLineByFactoryId( long id,String status);
	List<Line> findAllByLineNameAndProductStatus(LineFrm f);

	
}
