package kr.co.fukoku.repository;

import kr.co.fukoku.model.AbnormalMgt;
import kr.co.fukoku.model.form.AbnormalMgtFrm;
import kr.co.fukoku.repository.sql.AbnormalMgtSQLBuilder;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AbnormalMgtRepository {
    @SelectProvider(type = AbnormalMgtSQLBuilder.class, method = "find")
    List<AbnormalMgt> findAll(@Param("f") AbnormalMgtFrm frm);

    @SelectProvider(type = AbnormalMgtSQLBuilder.class, method = "find")
    List<Map<String, Object>> findMap(@Param("f") AbnormalMgtFrm frm);

    @Select("SELECT * FROM abnormal_mgt WHERE name=#{name} ")
    AbnormalMgt findOne(@Param("name") String name);

    @Insert("INSERT INTO abnormal_mgt ("
            + " name, ref_factory , ref_department, lines, data "
            + ") VALUES ("
            + "	#{f.name}, "
            + "	#{f.ref_factory}, "
            + " #{f.ref_department}, "
            + " #{f.lines}, "
            + " #{f.data}"
            + ");")
    boolean save(@Param("f") AbnormalMgtFrm frm);

    @Insert("<script>insert into abnormal_mgt ("
            + " name, ref_factory , ref_department, lines, data "
            + ") VALUES "
            + " <foreach collection='lst' item='f' separator=','>("
            + "	#{f.name}, "
            + "	#{f.ref_factory}, "
            + " #{f.ref_department}, "
            + " #{f.lines}, "
            + " #{f.data}"
            + " )"
            + "</foreach></script>")
    boolean saveLst(@Param("lst") List<AbnormalMgtFrm>  lst);
//
//    @Update("UPDATE department SET"
//            + "	seq=#{f.seq}, "
//            + " name=#{f.name},"
//            + " code=#{f.code} ,"
//            + " parent=#{f.parent},"
//            + " remark=#{f.remark} "
//            + "		 WHERE id=#{f.id}")
//    boolean update(@Param("f") DepartmentFrm frm);
}
