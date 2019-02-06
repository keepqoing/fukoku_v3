package kr.co.fukoku.repository_sqltem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.co.fukoku.model.Issue;
import kr.co.fukoku.model.response.Pagination;

import java.sql.SQLException;
import java.util.List;

@Repository
public class IssueRepositoryBody implements IssueRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Issue> findAll(Pagination pagination) throws SQLException {
        RowMapper<Issue> rowMapper = (rs, rowNum) -> {
            Issue issue = new Issue(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("content"),
                    rs.getString("created_date"),
                    rs.getString("reporter"),
                    rs.getString("status")
            );
            return issue;
        };
        return jdbcTemplate.query(SQLStatement.IssueSQL.FIND_ALL.toString(), new Object[]{pagination.getLimit(), pagination.getOffset()}, rowMapper);
    }

    @Override
    public Issue findOne(int id) throws SQLException {
        try {
            RowMapper<Issue> rowMapper = (rs, rowNum) -> {
                Issue issue = new Issue(
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("content"),
                        rs.getString("created_date"),
                        rs.getString("reporter"),
                        rs.getString("status")
                );
                return issue;
            };
            return jdbcTemplate.queryForObject(SQLStatement.IssueSQL.FIND_BY_ID.toString(), new Object[]{id}, rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean save(Issue issue) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.IssueSQL.ADD.toString(), new Object[]{
                issue.getTitle(),
                issue.getContent(),
                issue.getCreatedDate(),
                issue.getReporter(),
                issue.getStatus()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean update(Issue issue) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.IssueSQL.UPDATE.toString(), new Object[]{
                issue.getTitle(),
                issue.getContent(),
                issue.getReporter(),
                issue.getId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean updateStatus(Issue issue) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.IssueSQL.UPDATE_STATUS.toString(), new Object[]{
                issue.getStatus(),
                issue.getId()
        });
        if (result == 1) {
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) throws SQLException {
        int result = jdbcTemplate.update(SQLStatement.IssueSQL.DELETE.toString(), new Object[]{id});
        if (result == 1) return true;
        return false;
    }
}