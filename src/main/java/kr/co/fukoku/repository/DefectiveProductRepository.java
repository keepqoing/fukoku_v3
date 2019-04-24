package kr.co.fukoku.repository;

import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.model.form.FactoryFrm;
import kr.co.fukoku.repository.sql.DefectiveProductSQLBuilder;
import kr.co.fukoku.repository.sql.FactorySQLBuilder;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface DefectiveProductRepository {

	@SelectProvider(type = DefectiveProductSQLBuilder.class, method = "find")
	@Results(value={
			@Result(property="id", column="id" ),
			@Result(property="date", column="date"),
			@Result(property="line", column="line"),
			@Result(property="productName", column="product_name"),
			@Result(property="productName", column="product_name"),
			@Result(property="amount", column="amount"),
			@Result(property="type", column="type"),
			@Result(property="machine", column="machine"),
			@Result(property="assemblyState", column="assembly_state"),
			@Result(property="detail", column="detail"),
			@Result(property="important", column="important"),
			@Result(property="relatedFile", column="related_file")
	})
	List<Map<String, Object>> downloadAll(@Param("f") DefectiveProduct frm);
}
