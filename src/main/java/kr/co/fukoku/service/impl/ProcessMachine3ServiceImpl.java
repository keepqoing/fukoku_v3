package kr.co.fukoku.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.LineFrm;
import kr.co.fukoku.repository.ProcessMachine3Repository;
import kr.co.fukoku.service.ProcessMachine3Service;

@Service
public class ProcessMachine3ServiceImpl implements ProcessMachine3Service{
	
	@Autowired
	private ProcessMachine3Repository repo;

	@Override
	public List<Line> findAll(LineFrm f) {
		// TODO Auto-generated method stub
		List<Line> lines = repo.findAll(f);
		
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
		return repo.findLineByFactoryId(id,status);
	}

	@Override
	public long countStage() {
		// TODO Auto-generated method stub
		return repo.countStage();
	}

}
