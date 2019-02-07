package kr.co.fukoku.repository_sqltem;

import java.sql.SQLException;
import java.util.List;

import kr.co.fukoku.model.Issue;
import kr.co.fukoku.model.response.Pagination;

public interface IssueRepository {
    List<Issue> findAll(Pagination pagination) throws SQLException;
    Issue findOne(int id) throws SQLException;
    boolean save(Issue issue) throws SQLException;
    boolean update(Issue issue) throws SQLException;
    boolean updateStatus(Issue issue) throws SQLException;
    boolean delete(int id) throws SQLException;
}
