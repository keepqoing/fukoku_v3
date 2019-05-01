package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.filters.FaultStateFilter;
import kr.co.fukoku.model.FaultLink;
import kr.co.fukoku.model.FaultNode;
import kr.co.fukoku.model.FaultState;
import kr.co.fukoku.service.FaultAprioriService;
import kr.co.fukoku.utils.Apriori;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/api/fukoku/fault-apriori")
public class FaultAprioriRestController {

    @Autowired
    private FaultAprioriService faultAprioriService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "sDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "eDate", dataType = "string", paramType = "query"),
    })
    @RequestMapping(method = RequestMethod.GET)

    public ResponseList<FaultState> getAllFaultStates(@ApiIgnore FaultStateFilter filter) {
        Apriori ap = new Apriori();
        ResponseList<FaultState> response = new ResponseList<>();
        List<FaultState> errorStateList = faultAprioriService.getAllFaultStates(filter);
        int i = 0;

        ArrayList<List<String>> transactionItems = new ArrayList<List<String>>();

        ArrayList<List<String>> nodeItems = new ArrayList<List<String>>();
        ArrayList<String> nodeLine = new ArrayList<String>();
        ArrayList<String> nodeMachine = new ArrayList<String>();
        ArrayList<String> nodeItem = new ArrayList<String>();
        ArrayList<String> nodeSubItem = new ArrayList<String>();
        ArrayList<String> nodeError = new ArrayList<String>();
        ArrayList<String> nodeTreatment = new ArrayList<String>();

        for(FaultState F : errorStateList){
            List<String> transactionItem = new ArrayList<String>();
            transactionItem.add(F.getLine());
            transactionItem.add(F.getMachine());
            transactionItem.add(F.getItem());
            transactionItem.add(F.getSubItem());
            transactionItem.add(F.getError());
            transactionItem.add(F.getTreatment());

            nodeLine.add(F.getLine());
            nodeMachine.add(F.getMachine());
            nodeItem.add(F.getItem());
            nodeSubItem.add(F.getSubItem());
            nodeError.add(F.getError());
            nodeTreatment.add(F.getTreatment());

            for(String s : transactionItem){
                System.out.print(s + " ");
            }
            System.out.println();
            transactionItems.add(transactionItem);
        }

        nodeItems.add(nodeLine);
        nodeItems.add(nodeMachine);
        nodeItems.add(nodeItem);
        nodeItems.add(nodeSubItem);
        nodeItems.add(nodeError);
        nodeItems.add(nodeTreatment);

        List<FaultNode> resultNode = ap.getNodes(nodeItems);
        List<FaultLink> resultLink = ap.getAssociation(transactionItems);


        response.setLink(resultLink);
        response.setNode(resultNode);

        for(FaultLink l : resultLink){
            System.out.print(l.getSource());
            System.out.print(" ");
            System.out.print(l.getTarget());
            System.out.print(" ");
            System.out.print(l.getValue());
            System.out.println();
        }

        if (errorStateList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(errorStateList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

}
