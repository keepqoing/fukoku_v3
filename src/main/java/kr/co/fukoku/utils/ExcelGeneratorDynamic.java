package kr.co.fukoku.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellAddress;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.XSSFDataValidation;
import org.apache.poi.xssf.usermodel.XSSFDataValidationConstraint;
import org.apache.poi.xssf.usermodel.XSSFDataValidationHelper;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.apache.poi.hssf.usermodel.DVConstraint;
import org.apache.poi.hssf.usermodel.HSSFDataValidation;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataValidation;
import org.apache.poi.ss.usermodel.DataValidationConstraint;
import org.apache.poi.ss.usermodel.DataValidationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

public class ExcelGeneratorDynamic {

	public static ByteArrayInputStream customersToExcel(List<Map<String, Object>> data, String[] COLUMN)
			throws IOException {

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet("data");

			Font headerFont = workbook.createFont();
			headerFont.setBold(true);
			headerFont.setColor(IndexedColors.BLUE.getIndex());

			CellStyle headerCellStyle = workbook.createCellStyle();
			headerCellStyle.setFont(headerFont);

			// Row for Header
			Row headerRow = sheet.createRow(0);

			System.out.println("========================");
			// System.out.println("NUM ====> "+ COLUMN.length);

			for (int col = 0; col < COLUMN.length; col++) {
				System.out.println("COL :" + COLUMN[col]);
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(COLUMN[col]);
				cell.setCellStyle(headerCellStyle);

			}


			int rowIdx = 1;
			for (int i = 0; i < data.size(); i++) {
				Row row = sheet.createRow(rowIdx++);
				for (int j = 0; j < COLUMN.length; j++) {
					System.out.println(data.get(i).get(COLUMN[j]) + "");
					row.createCell(j).setCellValue(data.get(i).get(COLUMN[j]) + "");
				}
			}

			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		}
	}
	
	public static ByteArrayInputStream dataToExcelDropList(List<Map<String, Object>> data, String[] COLUMN, String[] dropList, int colIndexDropList)
			throws IOException {

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			XSSFSheet sheet = (XSSFSheet) workbook.createSheet("data");

			Font headerFont = workbook.createFont();
			headerFont.setBold(true);
			headerFont.setColor(IndexedColors.BLUE.getIndex());

			CellStyle headerCellStyle = workbook.createCellStyle();
			headerCellStyle.setFont(headerFont);

			// Row for Header
			Row headerRow = sheet.createRow(0);

			System.out.println("========================");
			// System.out.println("NUM ====> "+ COLUMN.length);

			for (int col = 0; col < COLUMN.length; col++) {
				System.out.println("COL :" + COLUMN[col]);
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(COLUMN[col]);
				cell.setCellStyle(headerCellStyle);

			}

			/**
			 * Create droplist
			 */
			XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper(sheet);
			XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint)
			dvHelper.createExplicitListConstraint(dropList);
			/**
			 * End
			 */

			int rowIdx = 1;
			for (int i = 0; i < data.size(); i++) {
				Row row = sheet.createRow(rowIdx++);
				for (int j = 0; j < COLUMN.length; j++) {
					System.out.println(data.get(i).get(COLUMN[j]) + "");
					row.createCell(j).setCellValue(data.get(i).get(COLUMN[j]) + "");
				}
				
				CellRangeAddressList addressList = new CellRangeAddressList(i+1, i+1, colIndexDropList, colIndexDropList);
				XSSFDataValidation validation = (XSSFDataValidation)dvHelper.createValidation(dvConstraint, addressList);
				validation.setShowErrorBox(true);
				validation.setSuppressDropDownArrow(true);   
				validation.setShowPromptBox(true);
				sheet.addValidationData(validation);
				
				
			}

			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		}
	}

	public static void main(String args[]) throws FileNotFoundException {
		
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("Data Validation");
		
		String[] st = new String[3];
		st[0] =  "1";
		st[1] =  "2";
		st[2] =  "3";
		
		XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper(sheet);
		XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint)
		dvHelper.createExplicitListConstraint(st);
		
		CellRangeAddressList addressList = new CellRangeAddressList(0, 0, 0, 0);
		XSSFDataValidation validation = (XSSFDataValidation)dvHelper.createValidation(dvConstraint, addressList);
		validation.setShowErrorBox(true);
		validation.setSuppressDropDownArrow(true);   
		validation.setShowPromptBox(true);
		sheet.addValidationData(validation);
		
		sheet.createRow(0).createCell(0).setCellValue("1");
		
		FileOutputStream fileOut = new FileOutputStream("XLValidationFrmCells.csv");
		try {
			workbook.write(fileOut);
			fileOut.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/*
	 * public static void main(String args[]) throws IOException {
	 * 
	 * //Workbook workbook = new HSSFWorkbook(); Workbook workbook = new
	 * XSSFWorkbook();
	 * 
	 * Sheet sheet = workbook.createSheet("Sheet1");
	 * 
	 * sheet.createRow(0).createCell(1).setCellValue("col2Head");
	 * 
	 * 
	 * //data validation in column B, except first row: DataValidationHelper
	 * dvHelper = sheet.getDataValidationHelper(); DataValidationConstraint
	 * dvConstraint = dvHelper.createExplicitListConstraint(new String[]{"X", "Y"})
	 * ; int lastRow = workbook.getSpreadsheetVersion().getLastRowIndex();
	 * CellRangeAddressList addressList = new CellRangeAddressList(1, lastRow, 1,
	 * 1); //B2:B1048576 DataValidation validation =
	 * dvHelper.createValidation(dvConstraint, addressList);
	 * sheet.addValidationData(validation); // data validation for B2:B1048576
	 * 
	 * FileOutputStream out = null; if (workbook instanceof HSSFWorkbook) { out =
	 * new FileOutputStream("CreateExcelDataValidationListsWholeColumn.xls"); } else
	 * if (workbook instanceof XSSFWorkbook) { out = new
	 * FileOutputStream("CreateExcelDataValidationListsWholeColumn.xlsx"); }
	 * workbook.write(out); workbook.close(); out.close();
	 * 
	 * }
	 */

}
