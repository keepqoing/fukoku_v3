package kr.co.fukoku.utils;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import kr.co.fukoku.model.Factory;
import kr.co.fukoku.model.form.FactoryFrm;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ApachePOIExcelRead {

	public static ArrayList<FactoryFrm> readExcel(MultipartFile excelfile) {
		 ArrayList<FactoryFrm> lstData = new ArrayList<FactoryFrm>();
		try {
			Workbook workbook = null;
			if (excelfile.getOriginalFilename().endsWith("xlsx")) {
				workbook = new XSSFWorkbook(excelfile.getInputStream());
			} else if (excelfile.getOriginalFilename().endsWith("xls")) {
				workbook = new HSSFWorkbook(excelfile.getInputStream());
			} else {
				// response
			}
			Sheet worksheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = worksheet.iterator();
			Row headerRow= iterator.next();
			while (iterator.hasNext()) {
				Row nextRow = iterator.next();
				Iterator<Cell> cellIterator = nextRow.cellIterator();
				FactoryFrm f = new FactoryFrm();

				while (cellIterator.hasNext()) {
					Cell nextCell = cellIterator.next();
					int columnIndex = nextCell.getColumnIndex();

					switch (columnIndex) {
					case 1:
						//System.out.println("name ====>   " +nextCell.getNumericCellValue());
						if (nextCell.getCellTypeEnum() == CellType.STRING) {
							f.setSeq(Long.parseLong(nextCell.getStringCellValue()));
						} else if (nextCell.getCellTypeEnum() == CellType.NUMERIC) {
							f.setSeq((long)nextCell.getNumericCellValue());
						}
						break;
					case 2:
						//System.out.print("name ====>   " + nextCell.getStringCellValue());
						f.setName(nextCell.getStringCellValue());
						break;
					case 3:
						f.setAddress(nextCell.getStringCellValue());
						break;
					case 4:
						f.setStartDate(nextCell.getStringCellValue());
						break;
					case 5:
						f.setEndDate(nextCell.getStringCellValue());
						break;
					case 6:
						f.setRemark(nextCell.getStringCellValue());
						break;
					}
				}
				lstData.add(f);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstData;

	}

	
	
	
	public static void main(String args[]) {
		try {

			FileInputStream excelFile = new FileInputStream(new File("C:\\Users\\tola\\Downloads\\z0Ls3mAE.xlsx"));
			Workbook workbook = new XSSFWorkbook(excelFile);
			Sheet datatypeSheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = datatypeSheet.iterator();

			List<Factory> data = new ArrayList<Factory>();

			while (iterator.hasNext()) {

				Row currentRow = iterator.next();
				Iterator<Cell> cellIterator = currentRow.iterator();

				while (cellIterator.hasNext()) {

					// Row nextRow = iterator.next();

					Cell currentCell = cellIterator.next();
					// getCellTypeEnum shown as deprecated for version 3.15
					// getCellTypeEnum ill be renamed to getCellType starting from version 4.0
					if (currentCell.getCellTypeEnum() == CellType.STRING) {
						System.out.println(currentCell.getStringCellValue() + "++");

					} else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {

						System.out.println((long)currentCell.getNumericCellValue()+"--");

					}

				}
				System.out.println();

			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
