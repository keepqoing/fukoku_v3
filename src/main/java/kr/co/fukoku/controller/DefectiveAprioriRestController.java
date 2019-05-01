package kr.co.fukoku.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import kr.co.fukoku.model.DefectiveProduct;
import kr.co.fukoku.model.FaultLink;
import kr.co.fukoku.model.FaultNode;
import kr.co.fukoku.repository_sqltem.DefectiveAprioriRepository;
import kr.co.fukoku.service.DefectiveAprioriService;
import kr.co.fukoku.utils.Apriori_Defective;
import kr.co.fukoku.utils.ResponseList;
import kr.co.fukoku.utils.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/v3/api/fukoku/defective-apriori")
public class DefectiveAprioriRestController {

    @Autowired
    private DefectiveAprioriService defectiveAprioriService;

    @Autowired
    private DefectiveAprioriRepository defectiveAprioriRepository;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "sDate", dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "eDate", dataType = "string", paramType = "query"),
    })
    @RequestMapping(method = RequestMethod.GET)
    public ResponseList<DefectiveProduct> getAllDefectiveProduct() {
        Apriori_Defective ap = new Apriori_Defective();
        ResponseList<DefectiveProduct> response = new ResponseList<>();

        List<DefectiveProduct> nonActiveStateList = defectiveAprioriService.getAllDefectiveProduct();

        ArrayList<List<String>> transactionItems = new ArrayList<List<String>>();

        ArrayList<List<String>> nodeItems = new ArrayList<List<String>>();
        ArrayList<String> nodeLine = new ArrayList<String>();
        ArrayList<String> nodeDetail = new ArrayList<String>();
        ArrayList<String> nodeType = new ArrayList<String>();
        ArrayList<String> nodeMachine = new ArrayList<String>();
        ArrayList<String> nodeReason = new ArrayList<String>();
        ArrayList<String> nodeAssembly = new ArrayList<String>();

        for (DefectiveProduct D : nonActiveStateList) {
            if(D.getLine() == null)
                D.setLine("unknown라인");
            if(D.getDetail() == null)
                D.setDetail("unknown차종");
            if(D.getType() == null)
                D.setType("unknown유형");
            if(D.getMachine() == null)
                D.setMachine("unknown장소");
            if(D.getReason() == null)
                D.setReason("unknown원인");
            if(D.getAssemblyState() == null)
                D.setAssemblyState("unknown조립상태");

            List<String> transactionItem = new ArrayList<String>();
            transactionItem.add(D.getLine());
            transactionItem.add(D.getDetail());
            transactionItem.add(D.getType());
            transactionItem.add(D.getMachine());
            transactionItem.add(D.getReason());
            transactionItem.add(D.getAssemblyState());

            nodeLine.add(D.getLine());
            nodeDetail.add(D.getDetail());
            nodeType.add(D.getType());
            nodeMachine.add(D.getMachine());
            nodeReason.add(D.getReason());
            nodeAssembly.add(D.getAssemblyState());

            for (String s : transactionItem) {
                System.out.print(s + " ");
            }
            System.out.println();

            for (int k = 0; k < D.getAmount(); k++)
                transactionItems.add(transactionItem);
        }

        nodeItems.add(nodeLine);
        nodeItems.add(nodeDetail);
        nodeItems.add(nodeType);
        nodeItems.add(nodeMachine);
        nodeItems.add(nodeReason);
        nodeItems.add(nodeAssembly);

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

        if (nonActiveStateList.size() != 0) {
            response.setCode(StatusCode.FOUND);
            response.setData(nonActiveStateList);
        } else {
            response.setCode(StatusCode.NOT_FOUND);
        }
        return response;
    }

}
