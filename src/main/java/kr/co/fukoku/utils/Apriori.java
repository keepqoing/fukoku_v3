package kr.co.fukoku.utils;

import kr.co.fukoku.model.FaultLink;
import kr.co.fukoku.model.FaultNode;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Apriori {
    static boolean endTag = false;
    static Map<Integer, Integer> dCountMap = new HashMap<Integer, Integer>(); // k-1 frequent table set
    static Map<Integer, Integer> dkCountMap = new HashMap<Integer, Integer>();// k frequent table set
    static List<List<String>> record;// data record table
    final static double MIN_SUPPORT = 0.01;// minimum support
    final static double MIN_CONF = 0.2;// minimum confidence
    static int lable = 1;// flag
    static List<Double> confCount = new ArrayList<Double>();
    static List<List<String>> confItemset = new ArrayList<List<String>>();
    static List<FaultLink> resultLink = new ArrayList<FaultLink>();
    static List<FaultNode> resultNode = new ArrayList<FaultNode>();
    static int cccount = 0;

    public Apriori() {
    }

    private static int findSourceTargetNumber(String item) {
        for (int i = 0; i < resultNode.size(); i++)
            if (item.equals(resultNode.get(i).getName()))
                return i;

        return -1;
    }

    private static boolean haveThisItem2(FaultNode node, List<FaultNode> list) {
        for (int i = 0; i < list.size(); i++)
            if (node.getId().equals(list.get(i).getId()) && node.getName().equals(list.get(i).getName()))
                return true;
        return false;
    }

    private static boolean haveThisItem3(FaultLink link) {
        String a = "";
        String b = "";
        for (int i = 0; i < resultNode.size(); i++){
            if(link.getSource() == i)
                a = resultNode.get(i).getId();
            else if(link.getTarget() == i)
                b = resultNode.get(i).getId();
        }

        if((a.equals("라인") && b.equals("설비")) ||
                (a.equals("설비") && b.equals("항목")) ||
                (a.equals("항목") && b.equals("세부항목")) ||
                (a.equals("세부항목") && b.equals("고장")) ||
                (a.equals("고장") && b.equals("조치")))
            return true;

        else if((a.equals("설비") && b.equals("라인")) ||
                (a.equals("항목") && b.equals("설비")) ||
                (a.equals("세부항목") && b.equals("항목")) ||
                (a.equals("고장") && b.equals("세부항목")) ||
                (a.equals("조치") && b.equals("고장"))){
            int c = link.getSource();
            int d = link.getTarget();
            link.setSource(d);
            link.setTarget(c);
            return true;
        }
        return false;
    }


    public List<FaultNode> getNodes(ArrayList<List<String>> nodeItems) {
        for (int i = 0; i < nodeItems.size(); i++) {
            int j = 0;

            for(j=0;j<nodeItems.get(i).size();j++) {
                FaultNode node = new FaultNode();
                switch (i) {
                    case 0:
                        node.setId("라인");
                        break;
                    case 1:
                        node.setId("설비");
                        break;
                    case 2:
                        node.setId("항목");
                        break;
                    case 3:
                        node.setId("세부항목");
                        break;
                    case 4:
                        node.setId("고장");
                        break;
                    case 5:
                        node.setId("조치");
                        break;
                }

                node.setName(nodeItems.get(i).get(j));

                if(haveThisItem2(node,resultNode) == false)
                    resultNode.add(node);
            }
        }

        return resultNode;
    }


    public List<FaultLink> getAssociation(ArrayList<List<String>> transactionItems) {
        record = transactionItems;
        List<List<String>> cItemset = findFirstCandidate();// 첫 번째 후보 아이템 집합 C1 생성
        List<List<String>> lItemset = getSupportedItemset(cItemset);// minSup을 만족하는 후보 아이템 집합

        while (endTag != true) { // 집합 내에 있는 아이템의 갯수가 0보다 큰 동안 반복
            List<List<String>> ckItemset = getNextCandidate(lItemset);// 다음 후보 아이템 집합 Ck 생성
            List<List<String>> lkItemset = getSupportedItemset(ckItemset);// minSup을 만족하는 후보 아이템 집합
            getConfidencedItemset(lkItemset, lItemset, dkCountMap, dCountMap);// confidence 계산, cItemset은 minConf를 만족
            if (confItemset.size() != 0 && confItemset.get(0).size() == 4) {// cItemset의 크기가 0이 아니면
                printConfItemset(confItemset);// cItemset 출력
                return resultLink;
            }


            confItemset.clear();// cItemset 비우기
            cItemset = ckItemset;// 데이터를 저장하고 루프의 다음 반복을 준비
            lItemset = lkItemset;
            dCountMap.clear();
            dCountMap.putAll(dkCountMap);
            ;
        }

        return resultLink;
    }

    // 후보 아이템 집합 C1을 만드는 함수
    // C1을 생성한 다음 단일 아이템이 minSupport를 만족하는지를 확인하기 위해 데이터 집합을 살펴보고
    // 요구조건을 만족하는 아이템 집합은 L1이 된다.
    // L1을 다시 결합하면 C2가 되고ㅡ 요구조건으로 걸러진 C2는 L2가 된다.
    private static List<List<String>> findFirstCandidate() {
        List<List<String>> tableList = new ArrayList<List<String>>();
        List<String> lineList = new ArrayList<String>();

        int size = 0;
        for (int i = 0; i < record.size(); i++) { // 레코드 길이만큼 반복
            for (int j = 0; j < record.get(i).size(); j++) { // i번 째 레코드 안의 transaction items의 길이만큼 반복
                if (lineList.isEmpty()) {
                    lineList.add(record.get(i).get(j));
                } else {
                    boolean haveThisItem = false;
                    size = lineList.size();
                    for (int k = 0; k < size; k++) {
                        if (lineList.get(k).equals(record.get(i).get(j))) {
                            haveThisItem = true;
                            break;
                        }
                    }
                    if (haveThisItem == false)
                        lineList.add(record.get(i).get(j));
                }
            }
        }
        for (int i = 0; i < lineList.size(); i++) {
            List<String> helpList = new ArrayList<String>();
            helpList.add(lineList.get(i));
            tableList.add(helpList);
        }
        return tableList;
    }

    /**
     * @param cItemset D는 dataset (transaction list)
     *                 Ck는 후보 집합 리스트
     *                 minSupport는 최소 지지도
     *                 C1으로부터 L1을 생성한다.
     *                 cItemset에 설정된 minSup 찾기
     */
    private static List<List<String>> getSupportedItemset(
            List<List<String>> cItemset) {
        // TODO Auto-generated method stub
        boolean end = true;
        List<List<String>> supportedItemset = new ArrayList<List<String>>();
        int k = 0;
        for (int i = 0; i < cItemset.size(); i++) {
            int count = countFrequent(cItemset.get(i));//统计记录数
            if (count >= MIN_SUPPORT * (record.size() - 1)) {// count值大于支持度与记录数的乘积，即满足支持度要求
                if (cItemset.get(0).size() == 1)
                    dCountMap.put(k++, count);
                else
                    dkCountMap.put(k++, count);
                supportedItemset.add(cItemset.get(i));
                end = false;
            }
        }
        endTag = end;
        return supportedItemset;
    }


    /**
     * @param confItemset2 조건을 만족하는 frequent set를 출력한다.
     */
    private static void printConfItemset(List<List<String>> confItemset2) {
        System.out.print("*********pattern mining resultLink***********\n");


        for (int i = 0; i < confItemset2.size(); i++) {


            if (confItemset2.get(i).size() == 4) {

                int j = 0;
                FaultLink link = new FaultLink();
                System.out.print(Integer.toString(cccount++) + " ");



                link.setSource(findSourceTargetNumber(confItemset2.get(i).get(j)));
                System.out.print(confItemset2.get(i).get(j++) + " ");
                System.out.print("-->");
                link.setTarget(findSourceTargetNumber(confItemset2.get(i).get(j)));
                System.out.print(confItemset2.get(i).get(j++));
                link.setSupport(confItemset2.get(i).get(j));
                System.out.print(" support：" + confItemset2.get(i).get(j++));
                link.setValue(Double.parseDouble(confItemset2.get(i).get(j)));
                link.setValue(1);

                System.out.print(" confidence：" + confItemset2.get(i).get(j++) + "\n");

                if(haveThisItem3(link) == true)
                    resultLink.add(link);
            }


        }

    }

    /**
     * @param lkItemset
     * @param lItemset
     * @param dkCountMap2
     * @param dCountMap2  lkItemset, lItemset, dkCountMap2, dCountMap2를 기반으로 confidence를 만족하는 set을 찾는다..
     */
    private static List<List<String>> getConfidencedItemset(
            List<List<String>> lkItemset, List<List<String>> lItemset,
            Map<Integer, Integer> dkCountMap2, Map<Integer, Integer> dCountMap2) {
        for (int i = 0; i < lkItemset.size(); i++) {
            getConfItem(lkItemset.get(i), lItemset, dkCountMap2.get(i),
                    dCountMap2);

        }
        return null;
    }

    /**
     * @param list
     * @param lItemset
     * @param count
     * @param dCountMap2 집합 목록이 minConf 을 충족하는지 확인
     *                   만족되면 전역 변수 confItemset에 set를 추가
     *                   만족하지 않으면 null 반환
     */
    private static List<String> getConfItem(List<String> list,
                                            List<List<String>> lItemset, Integer count,
                                            Map<Integer, Integer> dCountMap2) {
        for (int i = 0; i < list.size(); i++) {
            List<String> testList = new ArrayList<String>();
            for (int j = 0; j < list.size(); j++)
                if (i != j)
                    testList.add(list.get(j));
            int index = findConf(testList, lItemset);//查找testList中的内容在lItemset的位置
            Double conf = count * 1.0 / dCountMap2.get(index);
            if (conf > MIN_CONF) {//满足自信度要求
                testList.add(list.get(i));
                Double relativeSupport = count * 1.0 / (record.size() - 1);
                testList.add(relativeSupport.toString());
                testList.add(conf.toString());
                confItemset.add(testList);//添加到满足自信度的集合中
            }
        }
        return null;
    }

    /**
     * @param testList
     * @param lItemset lItemset에서 testList 내용의 위치 찾기
     */
    private static int findConf(List<String> testList,
                                List<List<String>> lItemset) {
        for (int i = 0; i < lItemset.size(); i++) {
            boolean notHaveTag = false;
            for (int j = 0; j < testList.size(); j++) {
                if (haveThisItem(testList.get(j), lItemset.get(i)) == false) {
                    notHaveTag = true;
                    break;
                }
            }
            if (notHaveTag == false)
                return i;
        }
        return -1;
    }

    /**
     * @param string
     * @param list   문자열이 목록에 포함되어 있는지 확인
     * @return boolean
     */
    private static boolean haveThisItem(String string, List<String> list) {
        for (int i = 0; i < list.size(); i++)
            if (string.equals(list.get(i)))
                return true;
        return false;
    }


    /**
     * @param list 통계 데이터베이스 레코드 레코드의 목록에있는 콜렉션 수
     */
    private static int countFrequent(List<String> list) {
        int count = 0;
        for (int i = 1; i < record.size(); i++) {
            boolean notHavaThisList = false;
            for (int k = 0; k < list.size(); k++) {
                boolean thisRecordHave = false;
                for (int j = 0; j < record.get(i).size(); j++) {
                    if (list.get(k).equals(record.get(i).get(j)))
                        thisRecordHave = true;
                }
                if (!thisRecordHave) {// 扫描一遍记录表的一行，发现list.get(i)不在记录表的第j行中，即list不可能在j行中
                    notHavaThisList = true;
                    break;
                }
            }
            if (notHavaThisList == false)
                count++;
        }
        return count;
    }

    /**
     * @param cItemset
     * @return nextItemset
     * 다음 단계의 후보 집합 군은 cItemset에 따라 구해지고, 얻어진 후보 집합 군의 각 집합의 요소 수는 cItemset의 집합의 요소보다 크다
     */
    private static List<List<String>> getNextCandidate(
            List<List<String>> cItemset) {
        List<List<String>> nextItemset = new ArrayList<List<String>>();
        for (int i = 0; i < cItemset.size(); i++) {
            List<String> tempList = new ArrayList<String>();
            for (int k = 0; k < cItemset.get(i).size(); k++)
                tempList.add(cItemset.get(i).get(k));
            for (int h = i + 1; h < cItemset.size(); h++) {
                for (int j = 0; j < cItemset.get(h).size(); j++) {
                    tempList.add(cItemset.get(h).get(j));
                    if (isSubsetInC(tempList, cItemset)) {// tempList的子集全部在cItemset中
                        List<String> copyValueHelpList = new ArrayList<String>();
                        for (int p = 0; p < tempList.size(); p++)
                            copyValueHelpList.add(tempList.get(p));
                        if (isHave(copyValueHelpList, nextItemset))//nextItemset还没有copyValueHelpList这个集合
                            nextItemset.add(copyValueHelpList);
                    }
                    tempList.remove(tempList.size() - 1);
                }
            }
        }

        return nextItemset;
    }

    /**
     * @param copyValueHelpList
     * @param nextItemset
     * @return boolean
     * <p>
     * nextItemset에 copyValueHelpList가 있는지 확인
     */
    private static boolean isHave(List<String> copyValueHelpList,
                                  List<List<String>> nextItemset) {
        for (int i = 0; i < nextItemset.size(); i++)
            if (copyValueHelpList.equals(nextItemset.get(i)))
                return false;
        return true;
    }

    /**
     * @param tempList
     * @param cItemset
     * @return tempList가 cItemset의 서브 세트인지 확인
     */
    private static boolean isSubsetInC(List<String> tempList,
                                       List<List<String>> cItemset) {
        boolean haveTag = false;
        for (int i = 0; i < tempList.size(); i++) {// k集合tempList的子集是否都在k-1级频繁级中
            List<String> testList = new ArrayList<String>();
            for (int j = 0; j < tempList.size(); j++)
                if (i != j)
                    testList.add(tempList.get(j));
            for (int k = 0; k < cItemset.size(); k++) {
                if (testList.equals(cItemset.get(k))) {// 子集存在于k-1频繁集中
                    haveTag = true;
                    break;
                }
            }
            if (haveTag == false)// 其中一个子集不在k-1频繁集中
                return false;
        }

        return haveTag;
    }


}
