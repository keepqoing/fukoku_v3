package kr.co.fukoku.repository_sql_db2;

import kr.co.fukoku.configuration.mapper.SqlDbV2Mapper;
import kr.co.fukoku.configuration.mapper.SqlMapper;
import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.LineProductMachineProcesses;
import kr.co.fukoku.model.Machine;
import kr.co.fukoku.model.Product;
import kr.co.fukoku.repository_sql_db2.sql.LineMachineProcessProductSQLBuilder;

import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@SqlDbV2Mapper
public interface LineMachineProcessProductRepository {
	
	
	@SelectProvider(type = LineMachineProcessProductSQLBuilder.class, method = "findLine")
	@Results(value={
			@Result(property = "id" , column = "id"),
            @Result(property = "name" , column = "_name"),
	})
	List<Line> findLineByLineName(@Param("name") String lineName);
	
	@Select("SELECT LMD.display_name, LMD.mapping_name, L._name,  M._name AS m_name " +
            "                FROM _lines L " +
            "                INNER JOIN lines_machines_detail LMD ON LOWER(L._name) = LOWER(SUBSTR(LMD.mapping_name, 1, 2)) " +
            "                INNER JOIN machines M ON LOWER(SUBSTR(LMD.join_name,4, LENGTH(LMD.join_name))) = M.mapping_name " +
            "                WHERE LOWER(L._name) = LOWER(#{lineName}) ORDER BY LMD._order;")
	
	@Results(value = {
            @Result(property = "name" , column = "display_name"),
            @Result(property = "mappingName" , column = "mapping_name")
    })
	List<Machine> findMachineByLineName(@Param("lineName") String lineName);
	
	
	@Select(" SELECT \n" +
            "             DISTINCT P.id, P._name, P.ref_machine, P.ref_line, M._name AS machine_name\n" +
            "FROM processes P\n" +
            "INNER JOIN lines_machines_detail LD ON LD.display_name = P.ref_machine\n" +
            "INNER JOIN machines M ON M.id = LD.ref_machine_id\n" +
            "WHERE \n" +
            "             P.ref_line = #{lineName} AND\n" +
         //   "             M._name = #{machineName} AND \n" +
            "             P.ref_machine = #{machineName}")
    @Results(value = {
            @Result(property = "id" , column = "id"),
            @Result(property = "name" , column = "_name"),
    })
	List<kr.co.fukoku.model.Process> findProcessByLineNameAndMachineName(@Param("lineName") String lineName, @Param("machineName") String machineName);
	
	@Select(" SELECT " +
            //"   id, " +
            " DISTINCT _name " +
          //  " ref_line " +
            " FROM " +
            "   products" +
            " WHERE " +
            "    ref_line=#{line}")
    @Results({
            @Result(property = "name" , column = "_name"),
    })
    List<Product> findProductsByLine(@Param("line") String line);
	
	
	
	
	
	
	/**
	 * For 30 minutes analysis
	 */
	
	@Select(" SELECT * FROM  _lines")
	@Results(value={
			@Result(property = "id" , column = "id"),
            @Result(property = "name" , column = "_name"),
            @Result(property="products", column="_name",
				many = @Many(select  = "findProductsByLine")
            ),
            @Result(property="machines", column="_name",
				many = @Many(select  = "findAllMachineByLineNameWithSubProcesses")
            )
	})
	List<LineProductMachineProcesses> findAllLineProductMachineProcesses();
	
	@Select("SELECT LMD.display_name, LMD.mapping_name, L._name,  M._name AS m_name , SUBSTRING_INDEX(LMD.mapping_name,'_',-1)   as machine_name, LMD.mapping_name as line_machine" +
            "                FROM _lines L " +
            "                INNER JOIN lines_machines_detail LMD ON LOWER(L._name) = LOWER(SUBSTR(LMD.mapping_name, 1, 2)) " +
            "                INNER JOIN machines M ON LOWER(SUBSTR(LMD.join_name,4, LENGTH(LMD.join_name))) = M.mapping_name " +
            "                WHERE LOWER(L._name) = LOWER(#{lineName}) ORDER BY LMD._order;")
	
	@Results(value = {
            @Result(property = "name" , column = "display_name"),
            @Result(property = "lineMachine" , column = "line_machine"),
            @Result(property = "machineName" , column = "machine_name"),
            @Result(property="processes", column="line_name=L._name, machine_name=m_name,line_machine=line_machine,display_name=display_name",
				many = @Many(select  = "findAllProcessByLineNameAndMachineName")
            ),
    })
	List<Machine> findAllMachineByLineNameWithSubProcesses(@Param("lineName") String lineName);
	
	@Select(" SELECT \n" +
            "             DISTINCT P.id, P._name, P.ref_machine, P.ref_line, M._name AS machine_name\n" +
            "FROM processes P\n" +
            "INNER JOIN lines_machines_detail LD ON LD.display_name = P.ref_machine\n" +
            "INNER JOIN machines M ON M.id = LD.ref_machine_id\n" +
            "WHERE \n" +
            "             P.ref_line = #{line_name} AND\n" +
            "             M._name = #{machine_name} AND \n" +
            "             P.ref_machine = #{display_name} group by _name")
    @Results(value = {
            @Result(property = "id" , column = "id"),
            @Result(property = "name" , column = "_name"),
    })
	List<kr.co.fukoku.model.Process> findAllProcessByLineNameAndMachineName(Map<Object, String> params);
	
	@Select("SELECT\n" +
            "\t  COALESCE(lsl, 0)  as lsl , COALESCE(usl, 0)  as usl   \n" +
            "FROM\n" +
            "\tproducts\n" +
            "WHERE\n" +
            "\t_name = #{model} AND process= #{process} AND\n" +
            "  ref_line = #{line} \n" +
            " LIMIT 1" )
	Product findUslLsl(@Param("model") String product,@Param("process") String process,@Param("line") String lineName);
	
	/**
	 * End  For 30 minutes analysis
	 */

}
