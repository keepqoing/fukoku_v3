package kr.co.fukoku.utils;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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

public class ReadExcelDynamic {

	public static JSONArray  readExcel(MultipartFile excelfile, String []COLUMN) {
		JSONArray arrObj = new JSONArray();
		try {
			Workbook workbook = new XSSFWorkbook(excelfile.getInputStream());
			Sheet datatypeSheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = datatypeSheet.iterator();
			List<Factory> data = new ArrayList<Factory>();
			Row headerRow= iterator.next();
			
			while (iterator.hasNext()) {

				Row currentRow = iterator.next();
				Iterator<Cell> cellIterator = currentRow.iterator();
				
				JSONObject obj = new JSONObject();
				
				while (cellIterator.hasNext()) {

					Cell currentCell = cellIterator.next();
					// getCellTypeEnum shown as deprecated for version 3.15
					// getCellTypeEnum ill be renamed to getCellType starting from version 4.0
					
					int columnIndex = currentCell.getColumnIndex();
					System.out.println("columnIndex ==> "+columnIndex);
					System.out.println("COLUMN ==> "+COLUMN[columnIndex]);
					if (currentCell.getCellTypeEnum() == CellType.STRING) {
						//System.out.println(currentCell.getStringCellValue() + "++");
						obj.put(COLUMN[columnIndex], currentCell.getStringCellValue());
					} else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
						//System.out.println((long)currentCell.getNumericCellValue()+"--");
						obj.put(COLUMN[columnIndex], currentCell.getNumericCellValue());
					}

				}
				System.out.println();
				arrObj.put(obj);
				System.out.println(arrObj);

			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return arrObj;

	}

	
	
	
	public static void main(String args[]) throws JSONException {
		 
//		JSONArray arr = new JSONArray();
//		
//		
//		 JSONObject obj = new JSONObject();
//
//	      obj.put("name", "foo");
//	      obj.put("num", new Integer(100));
//	      obj.put("balance", new Double(1000.21));
//	      obj.put("is_vip", new Boolean(true));
//	      arr.put(obj);
//	      
//	      JSONObject obj1 = new JSONObject();
//
//	      obj1.put("name", "foo");
//	      obj1.put("num", new Integer(100));
//	      obj1.put("balance", new Double(1000.21));
//	      obj1.put("is_vip", new Boolean(true));
//
//	      arr.put(obj1);
//	      
//	      System.out.println(arr);
		
		String[] COLUMN = {"id", "seq", "name", "address", "start_date","end_date","remark"  };
		
		ArrayList<String> lst = new ArrayList<String>();
		try {
			FileInputStream excelFile = new FileInputStream(new File("C:\\Users\\tola\\Downloads\\1G9ima8q.xlsx"));
			Workbook workbook = new XSSFWorkbook(excelFile);
			Sheet datatypeSheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = datatypeSheet.iterator();
			List<Factory> data = new ArrayList<Factory>();
			Row headerRow= iterator.next();
			JSONArray arrObj = new JSONArray();
			while (iterator.hasNext()) {

				Row currentRow = iterator.next();
				Iterator<Cell> cellIterator = currentRow.iterator();
				
				JSONObject obj = new JSONObject();
				
				while (cellIterator.hasNext()) {

					Cell currentCell = cellIterator.next();
					// getCellTypeEnum shown as deprecated for version 3.15
					// getCellTypeEnum ill be renamed to getCellType starting from version 4.0
					
					int columnIndex = currentCell.getColumnIndex();
					System.out.println("columnIndex ==> "+columnIndex);
					System.out.println("COLUMN ==> "+COLUMN[columnIndex]);
					if (currentCell.getCellTypeEnum() == CellType.STRING) {
						System.out.println(currentCell.getStringCellValue() + "++");
						obj.put(COLUMN[columnIndex], currentCell.getStringCellValue());
					} else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
						System.out.println((long)currentCell.getNumericCellValue()+"--");
						obj.put(COLUMN[columnIndex], currentCell.getNumericCellValue());
					}

				}
				System.out.println();
				arrObj.put(obj);
				System.out.println(arrObj);
				
				for(int a = 0; a < arrObj.length() ; a++) {
					System.out.println(arrObj.getJSONObject(a).get("name"));
				}

			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
