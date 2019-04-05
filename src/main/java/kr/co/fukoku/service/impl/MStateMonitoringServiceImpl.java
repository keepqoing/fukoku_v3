package kr.co.fukoku.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.Process;
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
	public List<Line> findAllLines() {
		// TODO Auto-generated method stub
		return repoMstate.findAllLines();
	}



	@Override
	public List<Process> findAllProcesses() {
		// TODO Auto-generated method stub
		return repoMstate.findAllProcesses();
	}
	
	
	
	
}
