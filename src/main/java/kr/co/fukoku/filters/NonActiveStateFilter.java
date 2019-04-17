package kr.co.fukoku.filters;

public class NonActiveStateFilter {
    private String line;
    private String machine;
    private String productionDate;

    public NonActiveStateFilter(){
        line = "";
        machine = "";
        productionDate = "";
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getMachine() {
        return machine;
    }

    public void setMachine(String machine) {
        this.machine = machine;
    }

    public String getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(String productionDate) {
        this.productionDate = productionDate;
    }
}
