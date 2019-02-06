package kr.co.fukoku.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.fukoku.model.Issue;
import kr.co.fukoku.model.response.Pagination;
import kr.co.fukoku.repository_sqltem.IssueRepository;
import kr.co.fukoku.service.IssueService;
import kr.co.fukoku.utils.Helper;

import java.sql.SQLException;
import java.util.List;

@Service
public class IssueServiceBody implements IssueService{
    @Autowired
    private IssueRepository issueRepository;

    @Override
    public List<Issue> getAllIssues(Pagination pagination) throws Exception  {
        try {
            return issueRepository.findAll(pagination);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public Issue getIssue(int id) throws Exception  {
        try {
            return issueRepository.findOne(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean addIssue(Issue issue) throws Exception  {
        try {
            issue.setCreatedDate(Helper.getCurrentTimeStamp());
            issue.setStatus("PROCESSING");
            return issueRepository.save(issue);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean updateIssue(Issue issue) throws Exception  {
        try {
            return issueRepository.update(issue);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean updateStatus(Issue issue)throws Exception  {
        try {
            return issueRepository.updateStatus(issue);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }

    @Override
    public boolean deleteIssue(int id) throws Exception {
        try {
            return issueRepository.delete(id);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception();
        }
    }
}