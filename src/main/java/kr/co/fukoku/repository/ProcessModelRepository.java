package kr.co.fukoku.repository;

import kr.co.fukoku.model.Line;
import kr.co.fukoku.model.form.*;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessModelRepository {

    @Select("SELECT id from process_chain WHERE ref_line = #{p_line}")
    int getProcessChainIdByLine(@Param("p_line") String p_line);

    @Select("CALL proc_insert_process_chain("
            + "	#{f.seq}, #{f.name}, #{f.ref_line} "
            + ")")
    int getLastID(@Param("f") ProcessChain f);


    @Select("CALL proc_insert_process_chain_product( "
        + "	#{f.ref_product}, #{f.ref_process_chain_id}, #{f.status} "
        + ");")
    int saveProcessProduct(@Param("f") ProcessProductFrm f);


    @Select("CALL proc_insert_process_chain_element("
            + "	#{f.stage}, #{f.name}, #{f.ref_process_chain_id} "
            + ");")
    int getLastPCEID(@Param("f") ProcessChainElementModelFrm f);

    @Select("CALL proc_insert_process_chain_machine ("
            + "	#{f.seq}, "
            + " #{f.refProcess}, "
            + " #{f.refMachine}, "
            + " #{f.refProcessChainElement}, "
            + " #{f.next_sequence}"
            + ");")
    int saveProcessMachine(@Param("f") ProcessMachineModelFrm f);


    //============ Reading data
    // 1.1 - Select all rows from process_chain table
    @Select("SELECT distinct ref_line FROM process_chain")
    List<ProcessModel> findAllProcessModels();

    // note - find line by distinct value
    @Select("SELECT distinct ref_line FROM process_chain where ref_line = #{p_line}")
    List<ProcessModel> findAllProcessModelsInLine(String p_line);

    // 1.2 - Select row from process_chain table by LINE
    @Select("CALL proc_process_model(#{lines});")
    List<ProcessChain> findProcessModelsByLines(@Param("lines") String lines);


    // 1.3 - Select all Process Product
    @Select("SELECT * FROM process_chain_product WHERE ref_process_chain_id = #{pcID}")
    List<ProcessProductFrm> findAllProcessProducts(@Param("pcID") long pcID);

    // 2 - Select all rows from process_chain_element table
    @Select("SELECT * FROM process_chain_element WHERE ref_process_chain_id = #{pcID}")
    List<ProcessChainElementModelFrm> findAllProcessChainElements(@Param("pcID") long pcID);

    // 3 - Select all rows from process_chain table
    @Select("SELECT * FROM process_chain_machine WHERE ref_process_chain_element = #{pceID}")
    @Results(value={
            @Result(property="refProcess",column="ref_process"),
            @Result(property="refMachine",column="ref_machine"),
            @Result(property="refProcessChainElement",column="ref_process_chain_element"),
            @Result(property="next_sequence",column="next_sequence")

    })
    List<ProcessMachineModelFrm> findAllProcessMachines(@Param("pceID") long pceID);


    // 3 - Select all rows from process_chain table -- for Process Var
    @Select("CALL proc_product_process_var(#{pcmID});")

    List<ProductProcessVarFrm> findAllProductProcessVar(@Param("pcmID") long pcmID);



    // Truncate Process Model
    @Select("CALL proc_truncate_process_model_new(#{p_lines});")
    int truncateProcessModel(@Param("p_lines") String p_lines);


    // ============== Helping Functions
    @Select("SELECT DISTINCT ref_line FROM process_chain")
    @Results(value={
            @Result(property="name",column="ref_line")
    })
    List<Line> findAllLineInProcessModel();
}
