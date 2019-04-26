package kr.co.fukoku.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Workpiece;
import kr.co.fukoku.repository_hbase.WorkpieceHBaseRealTimeRepository;
import kr.co.fukoku.service.WorkpieceHbaesPhoenixIndexService;

@Service
public class WorkpieceHbaesPhoenixIndexServiceImpl implements WorkpieceHbaesPhoenixIndexService {

	@Autowired
	private WorkpieceHBaseRealTimeRepository repo;
	
	@Override
	public List<Workpiece> findWorkpieceHbaseIndex(String startLpmprd, String stopLpmprd, long offset) {
		// TODO Auto-generated method stub
		List<Workpiece> ws = repo.findWorkpieceHbaseIndex(startLpmprd, stopLpmprd, offset);
		for(Workpiece w : ws) {
			try {
				w.setDailyNg( ( Long.parseLong(w.getDailySeq()) - Long.parseLong(w.getDailyOk()) )+"");
			}catch(Exception e) {
				w.setDailyNg("0");
			}
			
		}
		return ws;
	}

	@Override
	public long countWorkpiece(String startLpmprd, String stopLpmprd) {
		// TODO Auto-generated method stub
		return repo.countWorkpiece(startLpmprd, stopLpmprd);
	}

}
