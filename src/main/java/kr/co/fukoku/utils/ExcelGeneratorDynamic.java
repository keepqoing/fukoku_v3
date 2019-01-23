package kr.co.fukoku.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import kr.co.fukoku.model.Factory;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;


public class ExcelGeneratorDynamic {
	
	public static ByteArrayInputStream customersToExcel(List<Map<String, Object>> data, String []COLUMN) throws IOException {
		
		try(
				Workbook workbook = new XSSFWorkbook();
				ByteArrayOutputStream out = new ByteArrayOutputStream();
		){
			Sheet sheet = workbook.createSheet("data");
	 
			Font headerFont = workbook.createFont();
			headerFont.setBold(true);
			headerFont.setColor(IndexedColors.BLUE.getIndex());
	 
			CellStyle headerCellStyle = workbook.createCellStyle();
			headerCellStyle.setFont(headerFont);
	 
			// Row for Header
			Row headerRow = sheet.createRow(0);
			
			System.out.println("========================");
			//System.out.println("NUM ====> "+ COLUMN.length);
			
			for (int col = 0; col < COLUMN.length; col++) {
				System.out.println("COL :" + COLUMN[col]);
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(COLUMN[col]);
				cell.setCellStyle(headerCellStyle);
				
			}
			
			
			int rowIdx = 1;
			for(int i=0;i< data.size();i++) {
				Row row = sheet.createRow(rowIdx++);
				for(int j=0;j < COLUMN.length;j++) {
					System.out.println(data.get(i).get(COLUMN[j])+"");
					row.createCell(j).setCellValue(data.get(i).get(COLUMN[j])+"");
				}
			}
			
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		}
	}

}
