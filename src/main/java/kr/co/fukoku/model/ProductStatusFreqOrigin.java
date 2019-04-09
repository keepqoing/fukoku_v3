package kr.co.fukoku.model;

public class ProductStatusFreqOrigin {
    private String line;
    private String machine;
    private String date;
    private int totalProduct;
    private int totalGoodProduct;
    private int totalNGProduct;
    private int totalDefectiveProduct;

    public ProductStatusFreqOrigin(){}

    public ProductStatusFreqOrigin(String line, String machine, String date, int totalProduct, int totalGoodProduct, int totalNGProduct, int totalDefectiveProduct) {
        this.line = line;
        this.machine = machine;
        this.date = date;
        this.totalProduct = totalProduct;
        this.totalGoodProduct = totalGoodProduct;
        this.totalNGProduct = totalNGProduct;
        this.totalDefectiveProduct = totalDefectiveProduct;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getTotalProduct() {
        return totalProduct;
    }

    public void setTotalProduct(int totalProduct) {
        this.totalProduct = totalProduct;
    }

    public int getTotalGoodProduct() {
        return totalGoodProduct;
    }

    public void setTotalGoodProduct(int totalGoodProduct) {
        this.totalGoodProduct = totalGoodProduct;
    }

    public int getTotalNGProduct() {
        return totalNGProduct;
    }

    public void setTotalNGProduct(int totalNGProduct) {
        this.totalNGProduct = totalNGProduct;
    }

    public int getTotalDefectiveProduct() {
        return totalDefectiveProduct;
    }

    public void setTotalDefectiveProduct(int totalDefectiveProduct) {
        this.totalDefectiveProduct = totalDefectiveProduct;
    }

    @Override
    public String toString() {
        return "ProductQTYOrigin{" +
                "line='" + line + '\'' +
                ", machine='" + machine + '\'' +
                ", date='" + date + '\'' +
                ", totalProduct=" + totalProduct +
                ", totalGoodProduct=" + totalGoodProduct +
                ", totalNGProduct=" + totalNGProduct +
                ", totalDefectiveProduct=" + totalDefectiveProduct +
                '}';
    }
}
