package kr.co.fukoku.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.LineFrm;

public interface ProcessMachine3Service {
	
	List<Line> findAll(LineFrm f);
	List<Line> findLineByFactoryId( long id,String status);
	long countStage();
	
	List<Line> findAllByLineNameAndProductStatus(LineFrm f);

}
