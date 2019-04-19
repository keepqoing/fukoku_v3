package kr.co.fukoku.service;

import java.text.ParseException;
import java.util.List;

import kr.co.fukoku.model.Product;
import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.model.visualization.ArrayMultiLinesVisualization;

public interface WorkpieceHBaseRealTimeService {
	
	public List<ArrayMultiLinesVisualization> findWorkpiecePhoenixIndex(String startLpmprd, String stopLpmprd,Product product) throws ParseException;

}
