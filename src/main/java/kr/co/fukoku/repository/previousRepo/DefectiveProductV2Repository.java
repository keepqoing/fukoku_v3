package kr.co.fukoku.repository.previousRepo;

import kr.co.fukoku.utils.Counting;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public interface DefectiveProductV2Repository {

	@Select("SELECT * FROM fukoku_v2.defective_product_list_v2 order by date")
	List<Map<String, Object>> findAll();


	@Select("SELECT name _name, (SELECT COUNT(1) FROM fukoku_v2.defective_product_list_v2 " +
	" WHERE line = name AND date LIKE '%#{productionDate}%")
	List<Counting> getNumberByLine(@Param("productionDate") String productionDate);


	@Select("SELECT acronym mapping_name, (SELECT COUNT(1) FROM fukoku_v2.viewDefectiveProductListV2 " +
			" WHERE mapping_name = LMD.acronym AND date LIKE '%#{productionDate}%') AS counting "+
	" FROM machine LMD "+
	" WHERE SUBSTR(acronym,1,2) = #{line} ")

	List<Counting> getNumberByMachine(String line, String productionDate);
}
