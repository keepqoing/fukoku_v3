package kr.co.fukoku.utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class MyConverter {
	
	public static long getCurrentTime() {
    	Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    	return timestamp.getTime();
    }
    
	public static long convertDateToMilliseconds(String dateTime, String format /* yyyy-MM-dd HH:mm:ss.SSS */) {
    	SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(dateTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date.getTime();
    }
    
	public static String convertMillisecondsToDate(long milliSeconds, String format /* yyyy-MM-dd HH:mm:ss.SSS */) {
    	String x = String.valueOf(milliSeconds);
        DateFormat formatter = new SimpleDateFormat(format);
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(Long.parseLong(x));
        return formatter.format(calendar.getTime());
    }
    
    public static String changeDateFormat(String  dateTime, String fromFormat, String toFormat)  {
        SimpleDateFormat frmFrmat = new SimpleDateFormat(fromFormat);
        SimpleDateFormat toFrmat = new SimpleDateFormat(toFormat);
        Date date = null;
        String date1 = "";
        try {
            date = frmFrmat.parse(dateTime);
            date1 = toFrmat.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date1;
    }
    
    public static List<String> dateList(int year , int month) {
    	List<String> dateList = new ArrayList<String>();
        
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        int maxDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        //System.out.println(df.format(cal.getTime()));
        dateList.add(df.format(cal.getTime()));
        for (int i = 1; i < maxDay; i++) {
            cal.set(Calendar.DAY_OF_MONTH, i + 1);
            //System.out.println( df.format(cal.getTime()));
            dateList.add(df.format(cal.getTime()));
        }
        return dateList;
    }
    
    public static void  main(String args[]) {
    	//2018-05-02 00:00:00.000
    	System.out.println(convertDateToMilliseconds("2018-10-01T16:30:00.000", "yyyy-MM-dd'T'HH:mm:ss.SSS"));
    	System.out.println(convertDateToMilliseconds("2018-10-05T16:30:00.000", "yyyy-MM-dd'T'HH:mm:ss.SSS"));
    	System.out.println(convertMillisecondsToDate(1517438799162L, "yyyy-MM-dd HH:mm:ss.SSS"));
    	
    	System.out.println(getDate(-1));
    	
    	//dateList();
    	
//    	try {
//			logFile("test", "test");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    	
//    	for(int month=0;month<3;month++) {
//    		dateList(2019,month);
//    	}
    	
    	
    }
    
    public static void logFile(String text,  String fileName)
            throws IOException {
//        FileOutputStream outputStream = new FileOutputStream(fileName);
//        //byte[] strToBytes = text.getBytes();
//        //.MyConverter//outputStream.write(strToBytes);
//        outputStream.write(text.getBytes(), 0, text.length());
//        outputStream.close();
//        
//        try {
//        	System.out.print(Paths.get("test.txt"));
//            Files.write("test.txt", text.getBytes(), StandardOpenOption.APPEND);
//        }catch (IOException e) {
//            //exception handling left as an exercise for the reader
//        }
    }
    
    public static int getCurrentMachineTime(){
        int time = 0;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        Date currentDate = new Date();
        //System.out.println("current time "+formatter.format(currentDate).substring(11, 13));
        time = Integer.parseInt(formatter.format(currentDate).substring(11, 13));
        return time;
    }
    
    /***
     * 1 : get tomorrow date
     * 0 : get current date
     * -1 : get yesterday date
     * @return
     */
    public static String getDate(int dayNum) {
		final Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, dayNum);
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		//System.out.print(dateFormat.format(cal.getTime()));
		return dateFormat.format(cal.getTime());
	}
    
    public static List<LocalDate> getDatesInPeriod(Date startDate, Date endDate) {
	    List<LocalDate> dates = new ArrayList<>();
	    LocalDate start = toLocalDate(startDate);
	    LocalDate end = toLocalDate(endDate);
	    while (!start.equals(end)) {
	      dates.add(start);
	      start = start.plusDays(1);
	    }
	    return dates;
	  }

	  public static LocalDate toLocalDate(Date date) {
	    Date lDate = new Date(date.getTime());
	    return lDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	  }

	  public static double formatter(double value) {
		  return  Double.parseDouble(new DecimalFormat("##.###").format((Double.isInfinite(value) || Double.isNaN(value) ) ? 0 : value))  ;
	  }
	 

}
