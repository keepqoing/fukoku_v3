package kr.co.fukoku.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.ProcessChainElement;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.MStateMonitoringRepository;
import kr.co.fukoku.repository.ProcessMachine3Repository;
import kr.co.fukoku.service.MStateMonitoringService;

@Service
public class MStateMonitoringServiceImpl implements  MStateMonitoringService {
	
	@Autowired
	private MStateMonitoringRepository repoMstate;
	
	

	@Override
	public List<kr.co.fukoku.model.Process> findAllProcess() {
		// TODO Auto-generated method stub
		return repoMstate.findAllProcess();
	}

	

	@Override
	public List<Line> findAll(LineFrm f) {
		// TODO Auto-generated method stub
		List<Line> lines = repoMstate.findAll(f);
		
//		for(int i=0;i<lines.size();i++) {
//			for(int j=0;j<lines.get(i).getProcessChain().getProcessChainElement().size();j++) {
//				
//			}
//		}
		
		return lines;
	}

	@Override
	public List<Line> findLineByFactoryId(long id, String status) {
		// TODO Auto-generated method stub
		return repoMstate.findLineByFactoryId(id,status);
	}

	@Override
	public List<Line> findAllByLineNameAndProductStatus(LineFrm f) {
		// TODO Auto-generated method stub
		return repoMstate.findAllByLineNameAndProductStatus(f);
	}
	
	
	
	
}
