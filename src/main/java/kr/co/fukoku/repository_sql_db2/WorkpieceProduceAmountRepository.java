package kr.co.fukoku.repository_sql_db2;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import kr.co.fukoku.configuration.mapper.SqlDbV2Mapper;
import kr.co.fukoku.filters.WorkpieceFilter;
import kr.co.fukoku.repository_sql_db2.sql.WorkpieceSQLBuilderMariaDB;

@SqlDbV2Mapper
public interface WorkpieceProduceAmountRepository {

	@SelectProvider(type = WorkpieceSQLBuilderMariaDB.class, method = "getMaxDsAndTargetByModelFromLastMachine")
	ArrayList<Map<String, Object>> getMaxDsAndTargetByModelFromLastMachine(@Param("f") WorkpieceFilter workpieceFilter);

	@SelectProvider(type = WorkpieceSQLBuilderMariaDB.class, method = "getWorkPlanGroupByModel")
	ArrayList<Map<String, Object>> getWorkPlanGroupByModel(@Param("f") WorkpieceFilter workpieceFilter);
	
	@SelectProvider(type = WorkpieceSQLBuilderMariaDB.class , method="findTargetAndProducedProduct")
    List<Map<String,Object>> findTargetAndProducedProduct(@Param("f") WorkpieceFilter filter);

}
