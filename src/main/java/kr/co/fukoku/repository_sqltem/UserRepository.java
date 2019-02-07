package kr.co.fukoku.repository_sqltem;

import java.sql.SQLException;
import java.util.List;

import kr.co.fukoku.model.User;
import kr.co.fukoku.model.form.UserFilter;
import kr.co.fukoku.model.response.Pagination;

public interface UserRepository {
    List<User> findAll(UserFilter userFilter, Pagination pagination)throws SQLException;
    User findOne(int id)throws SQLException;
    boolean save(User user)throws SQLException;
    boolean update(User user)throws SQLException;
    boolean updatePassword(User user)throws SQLException;
    boolean delete(int id)throws SQLException;
}
