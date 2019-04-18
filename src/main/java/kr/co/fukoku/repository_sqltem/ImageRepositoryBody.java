package kr.co.fukoku.repository_sqltem;

import kr.co.fukoku.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ImageRepositoryBody implements ImageRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public boolean save(Image image) {
        int result = jdbcTemplate.update(SQLStatement.ImageSQL.ADD.toString(), new Object[]{
                image.getUrl(),
                image.getRemark(),
                image.getTranId(),
                image.getDepartment(),
                image.getTranHisId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public List<Image> findAllByTranId(int id) {
        RowMapper<Image> rowMapper = (rs, rowNum) -> {
            Image image = new Image(
                    rs.getString("url")
                    , rs.getString("remark")
                    , rs.getInt("tran_id")
                    , rs.getString("department")
            );
            return image;
        };
        return jdbcTemplate.query(SQLStatement.ImageSQL.FIND_BY_TRAN_ID.toString(), new Object[]{id}, rowMapper);
    }
}