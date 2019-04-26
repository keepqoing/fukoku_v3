package kr.co.fukoku.service;

import java.util.List;

import kr.co.fukoku.model.Workpiece;

public interface WorkpieceHbaesPhoenixIndexService {

	public List<Workpiece> findWorkpieceHbaseIndex(String startLpmprd, String stopLpmprd , long offset);
	public long countWorkpiece(String startLpmprd, String stopLpmprd);
	
	
}
