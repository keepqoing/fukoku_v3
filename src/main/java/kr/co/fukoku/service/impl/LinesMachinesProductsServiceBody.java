package kr.co.fukoku.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.LineProductMachineProcesses;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.repository_sql_db2.LineMachineProcessProductRepository;
import kr.co.fukoku.service.LineMachineProcessProductService;


@Service
public class LinesMachinesProductsServiceBody implements LineMachineProcessProductService{

    @Autowired
    private LineMachineProcessProductRepository repo;

	@Override
	public List<Line> findLineByLineName(String lineName) {
		// TODO Auto-generated method stub
		return repo.findLineByLineName(lineName);
	}

	@Override
	public List<Machine> findMachineByLineName(String lineName) {
		// TODO Auto-generated method stub
		return repo.findMachineByLineName(lineName);
	}

	@Override
	public List<kr.co.fukoku.model.Process> findProcessByLineNameAndMachineName(String lineName, String machineName) {
		// TODO Auto-generated method stub
		return repo.findProcessByLineNameAndMachineName(lineName, machineName);
	}

	@Override
	public List<Product> findProductsByLine(String line) {
		// TODO Auto-generated method stub
		return repo.findProductsByLine(line);
	}

	@Override
	public List<LineProductMachineProcesses> findAllLineProductMachineProcesses() {
		// TODO Auto-generated method stub
		return repo.findAllLineProductMachineProcesses();
	}

	@Override
	public Product findUslLsl(String product, String process, String lineName) {
		// TODO Auto-generated method stub
		return repo.findUslLsl(product, process, lineName);
	}

   


}
