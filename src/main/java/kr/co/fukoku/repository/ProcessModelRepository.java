package kr.co.fukoku.repository;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.ProcessChainElementModelFrm;
import kr.co.fukoku.model.form.ProcessMachineModelFrm;
import kr.co.fukoku.model.form.ProcessModel;
import kr.co.fukoku.model.form.ProcessProductFrm;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessModelRepository {

    // Insert into proccess_chain table and get the last_insert_id for next table's (process_chain_element) foreign key
    @Insert("INSERT INTO process_chain ("
            + "	seq, name, ref_line"
            + ") VALUES ("
            + "	#{f.seq}, #{f.name}, #{f.ref_line} "
            + ")")
   // @Options(useGeneratedKeys = true, keyProperty = "id")
    @Options(useGeneratedKeys = true, keyProperty = "ID", keyColumn = "ID")
//    @SelectKey(before = false, keyProperty = "ID", statement = "SELECT LAST_INSERT_ID()", resultType = int.class)
    int save(@Param("f") ProcessModel f);

    @Select("SELECT LAST_INSERT_ID()")
    int getLastID();


    // Insert into process_chain_element table and get the last_insert_id for next table's (process_machine) foreign key
    @Insert("INSERT INTO process_product ("
            + "	ref_product, ref_process_chain_id, status"
            + ") VALUES ("
            + "	#{f.ref_product}, #{f.ref_process_chain_id}, #{f.status} "
            + ");")
    int saveProcessProduct(@Param("f") ProcessProductFrm f);



    // Insert into process_chain_element table and get the last_insert_id for next table's (process_machine) foreign key
    @Insert("INSERT INTO process_chain_element ("
            + "	stage, name, ref_process_chain_id"
            + ") VALUES ("
            + "	#{f.stage}, #{f.name}, #{f.ref_process_chain_id} "
            + ");")
    int saveProcessChainElement(@Param("f") ProcessChainElementModelFrm f);

    @Select("SELECT LAST_INSERT_ID()")
    int getLastPCEID();


    // Insert into process_machine table
    @Insert("INSERT INTO process_machine ("
            + " seq, ref_process, ref_machine, ref_process_chain_element, next_sequence"
            + ") VALUES ("
            + "	#{f.seq}, "
            + " #{f.refProcess}, "
            + " #{f.refMachine}, "
            + " #{f.refProcessChainElement}, "
            + " #{f.next_sequence}"
            + ");")
    int saveProcessMachine(@Param("f") ProcessMachineModelFrm f);


    //============ Reading data
    // 1.1 - Select all rows from process_chain table
    @Select("SELECT * FROM process_chain")
    List<ProcessModel> findAllProcessModels();

    // 1.2 - Select row from process_chain table by LINE
    @Select("CALL proc_process_model(#{lines});")
    List<ProcessModel> findProcessModelsByLines(@Param("lines") String lines);


    // 1.3 - Select all Process Product
    @Select("SELECT * FROM process_product WHERE ref_process_chain_id = #{pcID}")
    List<ProcessProductFrm> findAllProcessProducts(@Param("pcID") long pcID);

    // 2 - Select all rows from process_chain_element table
    @Select("SELECT * FROM process_chain_element WHERE ref_process_chain_id = #{pcID}")
    List<ProcessChainElementModelFrm> findAllProcessChainElements(@Param("pcID") long pcID);

    // 3 - Select all rows from process_chain table
    @Select("SELECT * FROM process_machine WHERE ref_process_chain_element = #{pceID}")
    @Results(value={
            @Result(property="refProcess",column="ref_process"),
            @Result(property="refMachine",column="ref_machine"),
            @Result(property="refProcessChainElement",column="ref_process_chain_element"),
            @Result(property="next_sequence",column="next_sequence")

    })
    List<ProcessMachineModelFrm> findAllProcessMachines(@Param("pceID") long pceID);


    // Truncate Process Model
    @Select("CALL proc_truncate_process_model();")
    int truncateProcessModel();


    // ============== Helping Functions
    @Select("SELECT DISTINCT ref_line FROM process_chain")
    @Results(value={
            @Result(property="name",column="ref_line")
    })
    List<Line> findAllLineInProcessModel();



}
