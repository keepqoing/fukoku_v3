package kr.co.fukoku.repository;

import kr.co.fukoku.model.form.AbnormalFrm;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbnormalRepository {

    @Insert("<script>insert into abnormal ("
            + " factory, department, management_name, line, type, step, code, category_name, sub_category_code "
            + ") VALUES "
            + " <foreach collection='lst' item='f' separator=','>("
            + "	#{f.factory}, "
            + "	#{f.department}, "
            + " #{f.management_name}, "
            + " #{f.line}, "
            + " #{f.type}, "
            + " #{f.step}, "
            + " #{f.code}, "
            + " #{f.category_name}, "
            + " #{f.sub_category_code} "
            + " )"
            + "</foreach></script>")
    boolean saveLst(@Param("lst") List<AbnormalFrm> lst);
}
