package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.model.Issue;
import kr.co.fukoku.model.form.IssueForm;
import kr.co.fukoku.model.response.Pagination;
import kr.co.fukoku.model.response.Response;
import kr.co.fukoku.model.response.ResponseList;
import kr.co.fukoku.model.response.ResponseRecord;
import kr.co.fukoku.model.response.StatusCode;
import kr.co.fukoku.service.IssueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/issue")
public class IssueRestController {

    @Autowired
    private IssueService issueService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", dataType = "string", paramType = "query", defaultValue = "1"),
            @ApiImplicitParam(name = "limit", dataType = "string", paramType = "query", defaultValue = "15"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<Issue> getAllIssues(@ApiIgnore Pagination pagination) throws Exception {
        ResponseList<Issue> response = new ResponseList<>();
        List<Issue> issueList = issueService.getAllIssues(pagination);
        if(issueList.size() != 0){
            System.out.println("LLL");
            response.setCode(StatusCode.FOUND);
            response.setData(issueList);
            response.setPagination(pagination);
        }else{
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseRecord<Issue> getIssue(@PathVariable("id") int id){
        ResponseRecord<Issue> response = new ResponseRecord<>();
        try {
            Issue issue = issueService.getIssue(id);
            if(issue != null){
                response.setCode(StatusCode.SUCCESS);
                response.setData(issue);
            }else{
                response.setCode(StatusCode.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Response addissue(@Valid @RequestBody IssueForm issueForm){
        Response response = new Response();
        try{
            Issue issue = new Issue(
                    issueForm.getTitle(),
                    issueForm.getContent(),
                    issueForm.getReporter()
            );
            if(issueService.addIssue(issue)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Response deleteIssue(@PathVariable("id") int id){
        Response response = new Response();
        try{
            boolean result = issueService.deleteIssue(id);
            if(result){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Response updateIssue(@Valid @RequestBody IssueForm.IssueUpdateForm issueUpdateForm){
        Response response = new Response();
        try{
            Issue issue = new Issue(
                    issueUpdateForm.getId(),
                    issueUpdateForm.getTitle(),
                    issueUpdateForm.getContent(),
                    issueUpdateForm.getReporter()
            );
            if(issueService.updateIssue(issue)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value="/status", method = RequestMethod.PUT)
    public Response updateIssueStatus(@Valid @RequestBody IssueForm.IssueUpdateForm issueUpdateForm){
        Response response = new Response();
        try{
            Issue issue = new Issue();
            issue.setStatus(issueUpdateForm.getStatus());
            issue.setId(issueUpdateForm.getId());
            if(issueService.updateStatus(issue)){
                response.setCode(StatusCode.SUCCESS);
            }else{
                response.setCode(StatusCode.NOT_SUCCESS);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return response;
    }
}