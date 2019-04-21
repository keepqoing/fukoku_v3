package kr.co.fukoku.service;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.LineProductMachineProcesses;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Product;



public interface LineMachineProcessProductService {

	List<Line> findLineByLineName(String lineName);
	List<Machine> findMachineByLineName(String lineName);
	List<kr.co.fukoku.model.Process> findProcessByLineNameAndMachineName(String lineName, @Param("machineName") String machineName);
	List<Product> findProductsByLine(String line);
	List<LineProductMachineProcesses> findAllLineProductMachineProcesses();
	Product findUslLsl(String product, String process, String lineName);
	
	
}
