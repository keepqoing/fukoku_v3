package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.NonActiveStateFilter;
import kr.co.fukoku.model.DefectiveProduct;

import kr.co.fukoku.model.response.Table;
import kr.co.fukoku.repository.DefectiveProductRepository;
import kr.co.fukoku.service.DefectiveProductService;
import kr.co.fukoku.utils.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/v3/api/fukoku/defective-product")
public class DefectiveProductV2RestController {

	@Autowired
	private DefectiveProductService defectiveProductService;

	@Autowired
	private DefectiveProductRepository defectiveProductRepository;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "line", dataType = "string", paramType = "query"),
			@ApiImplicitParam(name = "machine", dataType = "string", paramType = "query"),
			@ApiImplicitParam(name = "productionDate", dataType = "string", paramType = "query"),
			@ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
			@ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
	})
	@RequestMapping(method = RequestMethod.GET)
	public ResponseList<DefectiveProduct> getAllDefectiveProduct(@ApiIgnore NonActiveStateFilter filter, @ApiIgnore Pagination pagination) {
		ResponseList<DefectiveProduct> response = new ResponseList<>();
		List<DefectiveProduct> nonActiveStateList = defectiveProductService.getAllDefectiveProduct(filter, pagination);
		if (nonActiveStateList.size() != 0) {
			response.setCode(StatusCode.FOUND);
			response.setData(nonActiveStateList);
			response.setPagination(pagination);
		} else {
			response.setCode(StatusCode.NOT_FOUND);
		}
		return response;
	}


	@RequestMapping(value="/number-line/{productionDate}", method = RequestMethod.GET)
	public ResponseList<Counting> getNumberAlarmByLine(@PathVariable("productionDate") String productionDate){
		if(productionDate.equals("0"))
			productionDate = "";
		ResponseList<Counting> response = new ResponseList<>();
		List<Counting> countingList = defectiveProductService.getNumberByLine(productionDate);
		if (countingList.size() != 0) {
			response.setCode(StatusCode.FOUND);
			response.setData(countingList);
		} else {
			response.setCode(StatusCode.NOT_FOUND);
		}
		return response;
	}

	@RequestMapping(value="/number-machine/{line}/{productionDate}", method = RequestMethod.GET)
	public ResponseList<Counting> getNumberAlarmByMachine(@PathVariable("line") String line, @PathVariable("productionDate") String productionDate){
		if(productionDate.equals("0"))
			productionDate = "";
		ResponseList<Counting> response = new ResponseList<>();
		List<Counting> countingList = defectiveProductService.getNumberByMachine(line, productionDate);
		if (countingList.size() != 0) {
			response.setCode(StatusCode.FOUND);
			response.setData(countingList);
		} else {
			response.setCode(StatusCode.NOT_FOUND);
		}
		return response;
	}

	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public ResponseEntity<InputStreamResource> downloadAll() throws IOException {
		DefectiveProduct d = new DefectiveProduct();
		List<Map<String, Object>>  f =(List<Map<String, Object>> ) defectiveProductRepository.downloadAll(d);


		ByteArrayInputStream in = ExcelGeneratorDynamic.customersToExcel(f, Table.DEFECTIVE_PRODUCT_COLUMN);
		// return IOUtils.toByteArray(in);

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=defective-product.xlsx");

		return ResponseEntity
				.ok()
				.headers(headers)
				.body(new InputStreamResource(in));
	}


}
