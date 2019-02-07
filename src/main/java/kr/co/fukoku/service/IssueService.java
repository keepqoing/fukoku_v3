package kr.co.fukoku.service;


import java.util.List;

import kr.co.fukoku.model.Issue;
import kr.co.fukoku.model.response.Pagination;

public interface IssueService {
    List<Issue> getAllIssues(Pagination pagination)throws Exception;
    Issue getIssue(int id)throws Exception;
    boolean addIssue(Issue issue) throws Exception;
    boolean updateIssue(Issue issue) throws Exception;
    boolean updateStatus(Issue issue) throws Exception;
    boolean deleteIssue(int id) throws Exception;
}
