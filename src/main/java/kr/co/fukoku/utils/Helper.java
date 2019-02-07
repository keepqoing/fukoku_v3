package kr.co.fukoku.utils;

import org.apache.commons.codec.binary.Base64;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class Helper {


    public String increaseFiveDay(String startDateTime) throws ParseException{
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar=Calendar.getInstance();
        calendar.setTime(sdf.parse(startDateTime));
        calendar.add(Calendar.DATE,5);
        SimpleDateFormat sdf2= new SimpleDateFormat("yyyy-MM-dd");
        String finalPlusAday=sdf2.format(calendar.getTime());

        return  finalPlusAday;
    }
    public String decreaseOneDay(String startDateTime) throws ParseException{
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar=Calendar.getInstance();
        calendar.setTime(sdf.parse(startDateTime));
        calendar.add(Calendar.DATE,-1);
        SimpleDateFormat sdf2= new SimpleDateFormat("yyyy-MM-dd");
        String finalMinusOneday=sdf2.format(calendar.getTime());

        return  finalMinusOneday;
    }
    public static String getCurrentTimeStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        Date now = new Date();
        String strDate = sdf.format(now);
        return strDate;
    }

    public static String convertStringDateToEpoch(String time, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        try {
            date = sdf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Long timeInMillis = date.getTime();
        return timeInMillis.toString();
    }

    public static String convertEpochToStringDate(String epochString) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long epoch = Long.parseLong(epochString);
        Date date = new Date(epoch);
        return df.format(date);
    }

    public static String convertEpochToStringDateWithFormat(String epochString, String format) {
        DateFormat df = new SimpleDateFormat(format);
        long epoch = Long.parseLong(epochString);
        Date date = new Date(epoch);
        return df.format(date);
    }

    public static Long getTimeRange(String startTime, String endTime){
        if(endTime.startsWith("00:")) endTime = "24:"+endTime.substring(3);
        if(startTime.startsWith("00:")) startTime = "24:"+startTime.substring(3);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date date = null;
        Date date1 = null;
        try {
            date = sdf.parse(startTime);
            date1 = sdf.parse(endTime);
            System.out.println();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Long timeInMillis = date.getTime();
        Long timeInMillis1 = date1.getTime();
        return Math.abs(((timeInMillis - timeInMillis1)/60)/1000);
    }

    public static Date convertStringToDate(String date, String format){
        DateFormat df = new SimpleDateFormat(format);
        Date startDate;
        try {
            startDate = df.parse(date);
            return startDate;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Long getDateRangeInSecond(String startTime, String endTime){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        Date date1 = null;
        try {
            date = sdf.parse(startTime);
            date1 = sdf.parse(endTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Long timeInMillis = date.getTime();
        Long timeInMillis1 = date1.getTime();
        return Math.abs((timeInMillis - timeInMillis1)/1000);
    }

    /**
     *
     * First day = start time - 24 hours
     * Second day = end time - 00:00 or Second day = end time
     *
     * @param startTime of first day
     * @param endTime of second day
     * @return
     */
    public static Long getTimeRangeWithNextDay(String startTime, String endTime){
        if(endTime.startsWith("00:")) endTime = "24:"+endTime.substring(3);
        if(startTime.startsWith("00:")) startTime = "24:"+startTime.substring(3);
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date date = null;
        Date date1 = null;
        Date date2 = null;
        Date date3 = null;
        try {
            date = sdf.parse(startTime);
            date1 = sdf.parse(endTime);
            date2 = sdf.parse("00:00");
            date3 = sdf.parse("24:00");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Long timeInMillis = date.getTime();
        Long timeInMillis1 = date1.getTime();
        Long timeInMillis2 = date2.getTime();
        Long timeInMillis3 = date3.getTime();
        Long firstday =  Math.abs(((timeInMillis - timeInMillis3)/60)/1000);
        Long seconday =  Math.abs(((timeInMillis1 - timeInMillis2)/60)/1000);
        return firstday + seconday;
    }

    /**
     * Formula to find minute from many day
     *
     * |Sigma(A - B)| should be use absolute because we dont want to get negative value
     *
     * A : 24 hours
     * B : can be start time, end time, or 0
     *     because we have to find total per one day by (24hours - working hour)
     *     then sum all each work times together to get the total time
     *
     * @param startTime
     * @param endTime
     * @param startDay
     * @param endDay
     * @return
     */
    public static Long getTimeRangeWithManyDays(String startTime, String endTime, String startDay, String endDay){
        Long totalMinute = 0L;
        String[] days = {"월일","화일","수일","목일","금일","토일","일일"};
        int startIndex = Arrays.asList(days).indexOf(startDay);
        int endIndex = Arrays.asList(days).indexOf(endDay);
        for(int i=startIndex;i<=endIndex;i++){
            if(i==startIndex)
                totalMinute += getTimeRange("24:00", startTime);
            else if(i==endIndex)
                totalMinute += getTimeRange("24:00", endTime);
            else
                totalMinute += getTimeRange("24:00", "00:00");
        }
        return Math.abs(totalMinute);
    }

    public static String[] getMonths(String startDate, String endDate){
        String[] sd = startDate.split("-");
        String[] ed = endDate.split("-");
        int a = Integer.parseInt(sd[1]);
        int a1 = Integer.parseInt(ed[1]);
        int r = Math.abs(a - a1)+1;
        String[] months = new String[r];
        Map<String, Object> map = getStringMonth();
        for(int i=0;i<r;i++){
            months[i] = map.get(i+a+"").toString();
        }
        return months;
    }

    public static Map<String, Object> getStringMonth(){
        Map<String, Object> map = new HashMap<>();
        map.put("1", "January");
        map.put("2", "February");
        map.put("3", "March");
        map.put("4", "April");
        map.put("5", "May");
        map.put("6", "June");
        map.put("7", "July");
        map.put("8", "August");
        map.put("9", "September");
        map.put("10", "October");
        map.put("11", "November");
        map.put("12", "December");
        return map;
    }

    public static Map<String, Integer> getStringDay(){
        Map<String, Integer> map = new HashMap<>();
        map.put("월일", 1);
        map.put("화일", 2);
        map.put("수일", 3);
        map.put("목일", 4);
        map.put("금일", 5);
        map.put("토일", 6);
        map.put("일일", 7);
        return map;
    }

    public static String passwordEncoding(String password){
        byte[] encodedBytes = Base64.encodeBase64(password.getBytes());
        return new String(encodedBytes);
    }

    public static String passwordDecoding(String password){
        byte[] decodedBytes = Base64.decodeBase64(password);
        return new String(decodedBytes);
    }

    public static int getDateRange(String startDate, String endDate){
        SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date1 = myFormat.parse(startDate);
            Date date2 = myFormat.parse(endDate);
            long diff = date2.getTime() - date1.getTime();
            int day = (int) (TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS) + 1);
            return day;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return 0;
    }
    public static Double getDateInMinute(String startTime, String endTime){
        Double timeInMillis =Double.valueOf(startTime);
        Double timeInMillis1 = Double.valueOf(endTime);
        return Math.abs((timeInMillis - timeInMillis1)/(60*60*1000));
    }

    public static List<String> getValueOfDateRange(String startDate, String endDate, String format){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
        LocalDate fromDate = LocalDate.parse(startDate,formatter);
        LocalDate toDate = LocalDate.parse(endDate,formatter);
        //List<LocalDate> dates = new ArrayList<LocalDate>();
        LocalDate current = fromDate;
        //current = current.plusDays(1); // If you don't want to include the start date
        toDate = toDate.plusDays(1); // If you want to include the end date
        List<String> stringDate = new ArrayList<>();
        while (current.isBefore(toDate)) {
            //dates.add(current);
            stringDate.add(String.valueOf(current));
            current = current.plusDays(1);
        }
        return stringDate;
    }

    public static String getYesterday(String currentDate, String format) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        String date = "";
        try {
            Date myDate = dateFormat.parse(currentDate);
            Calendar cal1 = Calendar.getInstance();
            cal1.setTime(myDate);
            cal1.add(Calendar.DAY_OF_YEAR, -1);
            Date previousDate = cal1.getTime();
            date = dateFormat.format(previousDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println("Yesterday "+date);
        return date;
    }
    public static String getNextday(String currentDate, String format) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        String date = "";
        try {
            Date myDate = dateFormat.parse(currentDate);
            Calendar cal1 = Calendar.getInstance();
            cal1.setTime(myDate);
            cal1.add(Calendar.DAY_OF_YEAR, +1);
            Date previousDate = cal1.getTime();
            date = dateFormat.format(previousDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static boolean checkingTimeExistInOperatingTime(String startTIme, String endTime, String currentTime){
        try {
            Date time1 = new SimpleDateFormat("HH:mm").parse(startTIme);
            Calendar calendar1 = Calendar.getInstance();
            calendar1.setTime(time1);

            Date time2 = new SimpleDateFormat("HH:mm").parse(endTime);
            Calendar calendar2 = Calendar.getInstance();
            calendar2.setTime(time2);

            Date d = new SimpleDateFormat("HH:mm").parse(currentTime);
            Calendar calendar3 = Calendar.getInstance();
            calendar3.setTime(d);

            if(time1.after(time2)){
                //System.out.println("add endTime 1 day");
                calendar2.add(Calendar.DATE,1);
                if(time1.after(d)){
                    //System.out.println("add current 1 day");
                    calendar3.add(Calendar.DATE,1);
                }
            }
            //System.out.println(calendar1.getTime()+"\t"+calendar2.getTime()+"\t"+calendar3.getTime());
            Date x = calendar3.getTime();
            if (x.after(calendar1.getTime()) && x.before(calendar2.getTime())) {
                //checkes whether the current time is between startTime and endTime.
                return true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static String  getHalfHourBeforeCurrentTime(String currentTime, String format){
        try {
            Calendar cal =  Calendar.getInstance();
            SimpleDateFormat df = new SimpleDateFormat(format);
            Date date = df.parse(currentTime);
            cal.setTime(date);
            cal.add(Calendar.MINUTE, -30);
            //System.out.println(df.format(cal.getTime()));
            return df.format(cal.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return "00:00";
    }

    //if time less than 8am get previous day
    public static String getExactProductDate(String currentTime,String comparingTime,String format){
        Date time1 = null;
        Date time2 = null;
        String dateReturn="";
        try {
            time1 = new SimpleDateFormat(format).parse(currentTime);
            /*Calendar calendar1 = Calendar.getInstance();
            calendar1.setTime(time1);*/

            time2 = new SimpleDateFormat(format).parse(comparingTime);
            /*Calendar calendar2 = Calendar.getInstance();
            calendar2.setTime(time2);*/
            System.out.println(time1 +"\t"+time2);

            if(time1.before(time2) || time1.equals(time2)){
                dateReturn = getYesterday(currentTime,format);
            }else {
                dateReturn = currentTime;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println(dateReturn);
        return dateReturn;
    }

    public static String getCurrentDate(){
        LocalDateTime now = LocalDateTime.now();
        String m;
        String d;
        if(now.getMonthValue()<=9)
            m = "0"+now.getMonthValue();
        else
            m = now.getMonthValue() + "";
        if(now.getDayOfMonth()<=9)
            d = "0"+now.getDayOfMonth();
        else
            d = now.getDayOfMonth() + "";
        return now.getYear() + "-" + m + "-" + d;
    }


    public static String secondsToString(int pTime) {
        return String.format("%02d:%02d", pTime / 60, pTime % 60);
    }

    public static String minutesToString(int pTime) {
        return String.format("%02d:%02d", pTime, pTime % 60);
    }

    public static String minutesDoubleToString(double pTime) {
        return String.format("%02d:%02d", pTime, pTime % 60);
    }

    public static void main(String[] args){
        /*Integer i = convertStringToDate("2018-02-23","yyyy-MM-dd").getMonth();
        i += 1;
        System.out.println(getStringMonth().get(i.toString()));*/

        //System.out.println(secondsToString(65));
        //System.out.println(getDateRange("2018-02-01","2018-02-10"));
        // 1519877328000
        //System.out.println(convertEpochToStringDateWithFormat("2018-03-01T13:10:15.275","yyyy-MM-dd HH:mm:ss.SSS"));
        //System.out.println(getTimeRangeWithNextDay("21:07","23:07"));
        /*getYesterday("2018-05-10 15:00:00","yyyy-MM-dd HH:mm:ss");
        getHalfHourBeforeCurrentTime("2018-05-10 15:00:00","yyyy-MM-dd HH:mm:ss");*/
        //getExactProductDate("2018-05-10 08:00","2018-05-10 08:00","yyyy-MM-dd HH:mm");
        //getNextday("2018-05-24","yyyy-MM-dd");
        //System.out.println(getDateRangeInSecond("2018-01-02 22:14:25.555","2018-01-02 22:14:26.555"));

        /*DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
        LocalDateTime now = LocalDateTime.now();
        System.out.println(getHalfHourBeforeCurrentTime(dtf.format(now), "HH:mm"));


        System.out.println(convertStringDateToEpoch("2018-06-12T20:45:00.511","yyyy-MM-dd'T'HH:mm:ss.SSS"));*/
        System.out.println(Helper.getCurrentDate());
    }


    public static String changeDateFormat(String  dateTime, String fromFormat, String toFormat)  {
        //SimpleDateFormat frmFrmat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        //SimpleDateFormat toFrmat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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


    public static String changeNumberOfDay(String date, int numOfDayToChange, String dateFormat) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        SimpleDateFormat toSdfEndDate = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse( date));
        calendar.add(Calendar.DATE, numOfDayToChange);
        //System.out.println("======> endDate: "+ toSdfEndDate.format(calendar.getTime()) );
        return toSdfEndDate.format(calendar.getTime());
    }

}
