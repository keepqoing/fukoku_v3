package kr.co.fukoku.filters;


public class NGProductFilter {
    private String line;
    private String machine;
    private String status;
    private String productionDate;

    public NGProductFilter(){
        line = "";
        machine = "";
        status = "";
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(String productionDate) {
        this.productionDate = productionDate;
    }
}
