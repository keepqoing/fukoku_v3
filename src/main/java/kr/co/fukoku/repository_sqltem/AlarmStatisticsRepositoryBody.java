package kr.co.fukoku.repository_sqltem;


import kr.co.fukoku.filters.AlarmHistoryFilter;
import kr.co.fukoku.filters.AlarmStatisticsFilter;
import kr.co.fukoku.model.*;
import kr.co.fukoku.utils.Counting;
import kr.co.fukoku.utils.Helper;
import kr.co.fukoku.utils.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


@Repository
public class AlarmStatisticsRepositoryBody implements AlarmStatisticsRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Counting> findNumberByFactory() {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("factory_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.COUNT_NUMNBER_BY_FACTORY.toString(),
                rowMapper);
    }

    @Override
    public List<Counting> findNumberByLine(String factoryName) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("line_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.COUNT_NUMBER_BY_LINE.toString(),
                new Object[]{factoryName}, rowMapper);
    }

    @Override
    public List<Counting> findNumberByMachine(String line) {
        RowMapper<Counting> rowMapper = (rs, rowNum) -> {
            Counting counting = new Counting(
                    rs.getString("machine_name"),
                    rs.getInt("counting")
            );
            return counting;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.COUNT_NUMBER_BY_MACHINE.toString(),
                new Object[]{line}, rowMapper);
    }

    @Override
    public List<Line> findAllLinesByFactory(String factoryName, String startYear, String endYear) {
        RowMapper<Line> rowMapper = (rs, rowNum) -> {
            Line ln = new Line();
            ln.setName(rs.getString("name"));
            return ln;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL_LINE.toString(),
                new Object[]{factoryName, startYear, endYear}, rowMapper);
    }

    @Override
    public List<Machine> findAllMachinesByLine(String line, String startYear, String endYear) {
        RowMapper<Machine> rowMapper = (rs, rowNum) -> {
            Machine m = new Machine();
            m.setName(rs.getString("ref_machine"));
            return m;
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL_MACHINE.toString(),
                new Object[]{line, startYear, endYear}, rowMapper);
    }

    @Override
    public String callAutoCountingAlarm() {

        String result = jdbcTemplate.queryForObject(SQLStatement.AlarmStatisticsSQL.AUTO_COUNTING_ALARM.toString(),String.class);
        return result;
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatistic(String factory, String line, String machine, String year) {
        RowMapper<MainAlarmStatistics> rowMapper = (rs, rowNum) -> {
            return getObject(rs, false);
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL_MAIN_ALARM_STATISTICS.toString(),
                new Object[]{factory, line, machine, year}, rowMapper);
    }


    // Create class object which gets data from DB
    public MainAlarmStatistics getObject(ResultSet rs, boolean sum) throws SQLException {
        MainAlarmStatistics m = new MainAlarmStatistics();

        m.setFactory(rs.getString("factory"));
        m.setLine(rs.getString("line"));
        m.setMachine(rs.getString("machine"));
        m.setAlarm(rs.getString("alarm"));
        if(!sum) {
            m.setProduct(rs.getString("product"));
        }
        m.setA_year(rs.getString("a_year"));

        m.setTotal_alarm_year(rs.getString("total_alarm_year"));
        m.setTotal_product_year(rs.getString("total_product_year"));
        m.setTotal_m1(rs.getString("total_m1"));
        m.setTotal_m2(rs.getString("total_m2"));
        m.setTotal_m3(rs.getString("total_m3"));
        m.setTotal_m4(rs.getString("total_m4"));
        m.setTotal_m5(rs.getString("total_m5"));
        m.setTotal_m6(rs.getString("total_m6"));
        m.setTotal_m7(rs.getString("total_m7"));
        m.setTotal_m8(rs.getString("total_m8"));
        m.setTotal_m9(rs.getString("total_m9"));
        m.setTotal_m10(rs.getString("total_m10"));
        m.setTotal_m11(rs.getString("total_m11"));
        m.setTotal_m12(rs.getString("total_m12"));

        m.setM0101(rs.getString("m0101"));
        m.setM0102(rs.getString("m0102"));
        m.setM0103(rs.getString("m0103"));
        m.setM0104(rs.getString("m0104"));
        m.setM0105(rs.getString("m0105"));
        m.setM0106(rs.getString("m0106"));
        m.setM0107(rs.getString("m0107"));
        m.setM0108(rs.getString("m0108"));
        m.setM0109(rs.getString("m0109"));
        m.setM0110(rs.getString("m0110"));
        m.setM0111(rs.getString("m0111"));
        m.setM0112(rs.getString("m0112"));
        m.setM0113(rs.getString("m0113"));
        m.setM0114(rs.getString("m0114"));
        m.setM0115(rs.getString("m0115"));
        m.setM0116(rs.getString("m0116"));
        m.setM0117(rs.getString("m0117"));
        m.setM0118(rs.getString("m0118"));
        m.setM0119(rs.getString("m0119"));
        m.setM0120(rs.getString("m0120"));
        m.setM0121(rs.getString("m0121"));
        m.setM0122(rs.getString("m0122"));
        m.setM0123(rs.getString("m0123"));
        m.setM0124(rs.getString("m0124"));
        m.setM0125(rs.getString("m0125"));
        m.setM0126(rs.getString("m0126"));
        m.setM0127(rs.getString("m0127"));
        m.setM0128(rs.getString("m0128"));
        m.setM0129(rs.getString("m0129"));
        m.setM0130(rs.getString("m0130"));
        m.setM0131(rs.getString("m0131"));

        m.setM0201(rs.getString("m0201"));
        m.setM0202(rs.getString("m0202"));
        m.setM0203(rs.getString("m0203"));
        m.setM0204(rs.getString("m0204"));
        m.setM0205(rs.getString("m0205"));
        m.setM0206(rs.getString("m0206"));
        m.setM0207(rs.getString("m0207"));
        m.setM0208(rs.getString("m0208"));
        m.setM0209(rs.getString("m0209"));
        m.setM0210(rs.getString("m0210"));
        m.setM0211(rs.getString("m0211"));
        m.setM0212(rs.getString("m0212"));
        m.setM0213(rs.getString("m0213"));
        m.setM0214(rs.getString("m0214"));
        m.setM0215(rs.getString("m0215"));
        m.setM0216(rs.getString("m0216"));
        m.setM0217(rs.getString("m0217"));
        m.setM0218(rs.getString("m0218"));
        m.setM0219(rs.getString("m0219"));
        m.setM0220(rs.getString("m0220"));
        m.setM0221(rs.getString("m0221"));
        m.setM0222(rs.getString("m0222"));
        m.setM0223(rs.getString("m0223"));
        m.setM0224(rs.getString("m0224"));
        m.setM0225(rs.getString("m0225"));
        m.setM0226(rs.getString("m0226"));
        m.setM0227(rs.getString("m0227"));
        m.setM0228(rs.getString("m0228"));
        m.setM0229(rs.getString("m0229"));
        m.setM0230(rs.getString("m0230"));
        m.setM0231(rs.getString("m0231"));

        m.setM0301(rs.getString("m0301"));
        m.setM0302(rs.getString("m0302"));
        m.setM0303(rs.getString("m0303"));
        m.setM0304(rs.getString("m0304"));
        m.setM0305(rs.getString("m0305"));
        m.setM0306(rs.getString("m0306"));
        m.setM0307(rs.getString("m0307"));
        m.setM0308(rs.getString("m0308"));
        m.setM0309(rs.getString("m0309"));
        m.setM0310(rs.getString("m0310"));
        m.setM0311(rs.getString("m0311"));
        m.setM0312(rs.getString("m0312"));
        m.setM0313(rs.getString("m0313"));
        m.setM0314(rs.getString("m0314"));
        m.setM0315(rs.getString("m0315"));
        m.setM0316(rs.getString("m0316"));
        m.setM0317(rs.getString("m0317"));
        m.setM0318(rs.getString("m0318"));
        m.setM0319(rs.getString("m0319"));
        m.setM0320(rs.getString("m0320"));
        m.setM0321(rs.getString("m0321"));
        m.setM0322(rs.getString("m0322"));
        m.setM0323(rs.getString("m0323"));
        m.setM0324(rs.getString("m0324"));
        m.setM0325(rs.getString("m0325"));
        m.setM0326(rs.getString("m0326"));
        m.setM0327(rs.getString("m0327"));
        m.setM0328(rs.getString("m0328"));
        m.setM0329(rs.getString("m0329"));
        m.setM0330(rs.getString("m0330"));
        m.setM0331(rs.getString("m0331"));

        m.setM0401(rs.getString("m0401"));
        m.setM0402(rs.getString("m0402"));
        m.setM0403(rs.getString("m0403"));
        m.setM0404(rs.getString("m0404"));
        m.setM0405(rs.getString("m0405"));
        m.setM0406(rs.getString("m0406"));
        m.setM0407(rs.getString("m0407"));
        m.setM0408(rs.getString("m0408"));
        m.setM0409(rs.getString("m0409"));
        m.setM0410(rs.getString("m0410"));
        m.setM0411(rs.getString("m0411"));
        m.setM0412(rs.getString("m0412"));
        m.setM0413(rs.getString("m0413"));
        m.setM0414(rs.getString("m0414"));
        m.setM0415(rs.getString("m0415"));
        m.setM0416(rs.getString("m0416"));
        m.setM0417(rs.getString("m0417"));
        m.setM0418(rs.getString("m0418"));
        m.setM0419(rs.getString("m0419"));
        m.setM0420(rs.getString("m0420"));
        m.setM0421(rs.getString("m0421"));
        m.setM0422(rs.getString("m0422"));
        m.setM0423(rs.getString("m0423"));
        m.setM0424(rs.getString("m0424"));
        m.setM0425(rs.getString("m0425"));
        m.setM0426(rs.getString("m0426"));
        m.setM0427(rs.getString("m0427"));
        m.setM0428(rs.getString("m0428"));
        m.setM0429(rs.getString("m0429"));
        m.setM0430(rs.getString("m0430"));
        m.setM0431(rs.getString("m0431"));

        m.setM0501(rs.getString("m0501"));
        m.setM0502(rs.getString("m0502"));
        m.setM0503(rs.getString("m0503"));
        m.setM0504(rs.getString("m0504"));
        m.setM0505(rs.getString("m0505"));
        m.setM0506(rs.getString("m0506"));
        m.setM0507(rs.getString("m0507"));
        m.setM0508(rs.getString("m0508"));
        m.setM0509(rs.getString("m0509"));
        m.setM0510(rs.getString("m0510"));
        m.setM0511(rs.getString("m0511"));
        m.setM0512(rs.getString("m0512"));
        m.setM0513(rs.getString("m0513"));
        m.setM0514(rs.getString("m0514"));
        m.setM0515(rs.getString("m0515"));
        m.setM0516(rs.getString("m0516"));
        m.setM0517(rs.getString("m0517"));
        m.setM0518(rs.getString("m0518"));
        m.setM0519(rs.getString("m0519"));
        m.setM0520(rs.getString("m0520"));
        m.setM0521(rs.getString("m0521"));
        m.setM0522(rs.getString("m0522"));
        m.setM0523(rs.getString("m0523"));
        m.setM0524(rs.getString("m0524"));
        m.setM0525(rs.getString("m0525"));
        m.setM0526(rs.getString("m0526"));
        m.setM0527(rs.getString("m0527"));
        m.setM0528(rs.getString("m0528"));
        m.setM0529(rs.getString("m0529"));
        m.setM0530(rs.getString("m0530"));
        m.setM0531(rs.getString("m0531"));

        m.setM0601(rs.getString("m0601"));
        m.setM0602(rs.getString("m0602"));
        m.setM0603(rs.getString("m0603"));
        m.setM0604(rs.getString("m0604"));
        m.setM0605(rs.getString("m0605"));
        m.setM0606(rs.getString("m0606"));
        m.setM0607(rs.getString("m0607"));
        m.setM0608(rs.getString("m0608"));
        m.setM0609(rs.getString("m0609"));
        m.setM0610(rs.getString("m0610"));
        m.setM0611(rs.getString("m0611"));
        m.setM0612(rs.getString("m0612"));
        m.setM0613(rs.getString("m0613"));
        m.setM0614(rs.getString("m0614"));
        m.setM0615(rs.getString("m0615"));
        m.setM0616(rs.getString("m0616"));
        m.setM0617(rs.getString("m0617"));
        m.setM0618(rs.getString("m0618"));
        m.setM0619(rs.getString("m0619"));
        m.setM0620(rs.getString("m0620"));
        m.setM0621(rs.getString("m0621"));
        m.setM0622(rs.getString("m0622"));
        m.setM0623(rs.getString("m0623"));
        m.setM0624(rs.getString("m0624"));
        m.setM0625(rs.getString("m0625"));
        m.setM0626(rs.getString("m0626"));
        m.setM0627(rs.getString("m0627"));
        m.setM0628(rs.getString("m0628"));
        m.setM0629(rs.getString("m0629"));
        m.setM0630(rs.getString("m0630"));
        m.setM0631(rs.getString("m0631"));

        m.setM0701(rs.getString("m0701"));
        m.setM0702(rs.getString("m0702"));
        m.setM0703(rs.getString("m0703"));
        m.setM0704(rs.getString("m0704"));
        m.setM0705(rs.getString("m0705"));
        m.setM0706(rs.getString("m0706"));
        m.setM0707(rs.getString("m0707"));
        m.setM0708(rs.getString("m0708"));
        m.setM0709(rs.getString("m0709"));
        m.setM0710(rs.getString("m0710"));
        m.setM0711(rs.getString("m0711"));
        m.setM0712(rs.getString("m0712"));
        m.setM0713(rs.getString("m0713"));
        m.setM0714(rs.getString("m0714"));
        m.setM0715(rs.getString("m0715"));
        m.setM0716(rs.getString("m0716"));
        m.setM0717(rs.getString("m0717"));
        m.setM0718(rs.getString("m0718"));
        m.setM0719(rs.getString("m0719"));
        m.setM0720(rs.getString("m0720"));
        m.setM0721(rs.getString("m0721"));
        m.setM0722(rs.getString("m0722"));
        m.setM0723(rs.getString("m0723"));
        m.setM0724(rs.getString("m0724"));
        m.setM0725(rs.getString("m0725"));
        m.setM0726(rs.getString("m0726"));
        m.setM0727(rs.getString("m0727"));
        m.setM0728(rs.getString("m0728"));
        m.setM0729(rs.getString("m0729"));
        m.setM0730(rs.getString("m0730"));
        m.setM0731(rs.getString("m0731"));

        m.setM0801(rs.getString("m0801"));
        m.setM0802(rs.getString("m0802"));
        m.setM0803(rs.getString("m0803"));
        m.setM0804(rs.getString("m0804"));
        m.setM0805(rs.getString("m0805"));
        m.setM0806(rs.getString("m0806"));
        m.setM0807(rs.getString("m0807"));
        m.setM0808(rs.getString("m0808"));
        m.setM0809(rs.getString("m0809"));
        m.setM0810(rs.getString("m0810"));
        m.setM0811(rs.getString("m0811"));
        m.setM0812(rs.getString("m0812"));
        m.setM0813(rs.getString("m0813"));
        m.setM0814(rs.getString("m0814"));
        m.setM0815(rs.getString("m0815"));
        m.setM0816(rs.getString("m0816"));
        m.setM0817(rs.getString("m0817"));
        m.setM0818(rs.getString("m0818"));
        m.setM0819(rs.getString("m0819"));
        m.setM0820(rs.getString("m0820"));
        m.setM0821(rs.getString("m0821"));
        m.setM0822(rs.getString("m0822"));
        m.setM0823(rs.getString("m0823"));
        m.setM0824(rs.getString("m0824"));
        m.setM0825(rs.getString("m0825"));
        m.setM0826(rs.getString("m0826"));
        m.setM0827(rs.getString("m0827"));
        m.setM0828(rs.getString("m0828"));
        m.setM0829(rs.getString("m0829"));
        m.setM0830(rs.getString("m0830"));
        m.setM0831(rs.getString("m0831"));

        m.setM0901(rs.getString("m0901"));
        m.setM0902(rs.getString("m0902"));
        m.setM0903(rs.getString("m0903"));
        m.setM0904(rs.getString("m0904"));
        m.setM0905(rs.getString("m0905"));
        m.setM0906(rs.getString("m0906"));
        m.setM0907(rs.getString("m0907"));
        m.setM0908(rs.getString("m0908"));
        m.setM0909(rs.getString("m0909"));
        m.setM0910(rs.getString("m0910"));
        m.setM0911(rs.getString("m0911"));
        m.setM0912(rs.getString("m0912"));
        m.setM0913(rs.getString("m0913"));
        m.setM0914(rs.getString("m0914"));
        m.setM0915(rs.getString("m0915"));
        m.setM0916(rs.getString("m0916"));
        m.setM0917(rs.getString("m0917"));
        m.setM0918(rs.getString("m0918"));
        m.setM0919(rs.getString("m0919"));
        m.setM0920(rs.getString("m0920"));
        m.setM0921(rs.getString("m0921"));
        m.setM0922(rs.getString("m0922"));
        m.setM0923(rs.getString("m0923"));
        m.setM0924(rs.getString("m0924"));
        m.setM0925(rs.getString("m0925"));
        m.setM0926(rs.getString("m0926"));
        m.setM0927(rs.getString("m0927"));
        m.setM0928(rs.getString("m0928"));
        m.setM0929(rs.getString("m0929"));
        m.setM0930(rs.getString("m0930"));
        m.setM0931(rs.getString("m0931"));

        m.setM1001(rs.getString("m1001"));
        m.setM1002(rs.getString("m1002"));
        m.setM1003(rs.getString("m1003"));
        m.setM1004(rs.getString("m1004"));
        m.setM1005(rs.getString("m1005"));
        m.setM1006(rs.getString("m1006"));
        m.setM1007(rs.getString("m1007"));
        m.setM1008(rs.getString("m1008"));
        m.setM1009(rs.getString("m1009"));
        m.setM1010(rs.getString("m1010"));
        m.setM1011(rs.getString("m1011"));
        m.setM1012(rs.getString("m1012"));
        m.setM1013(rs.getString("m1013"));
        m.setM1014(rs.getString("m1014"));
        m.setM1015(rs.getString("m1015"));
        m.setM1016(rs.getString("m1016"));
        m.setM1017(rs.getString("m1017"));
        m.setM1018(rs.getString("m1018"));
        m.setM1019(rs.getString("m1019"));
        m.setM1020(rs.getString("m1020"));
        m.setM1021(rs.getString("m1021"));
        m.setM1022(rs.getString("m1022"));
        m.setM1023(rs.getString("m1023"));
        m.setM1024(rs.getString("m1024"));
        m.setM1025(rs.getString("m1025"));
        m.setM1026(rs.getString("m1026"));
        m.setM1027(rs.getString("m1027"));
        m.setM1028(rs.getString("m1028"));
        m.setM1029(rs.getString("m1029"));
        m.setM1030(rs.getString("m1030"));
        m.setM1031(rs.getString("m1031"));

        m.setM1101(rs.getString("m1101"));
        m.setM1102(rs.getString("m1102"));
        m.setM1103(rs.getString("m1103"));
        m.setM1104(rs.getString("m1104"));
        m.setM1105(rs.getString("m1105"));
        m.setM1106(rs.getString("m1106"));
        m.setM1107(rs.getString("m1107"));
        m.setM1108(rs.getString("m1108"));
        m.setM1109(rs.getString("m1109"));
        m.setM1110(rs.getString("m1110"));
        m.setM1111(rs.getString("m1111"));
        m.setM1112(rs.getString("m1112"));
        m.setM1113(rs.getString("m1113"));
        m.setM1114(rs.getString("m1114"));
        m.setM1115(rs.getString("m1115"));
        m.setM1116(rs.getString("m1116"));
        m.setM1117(rs.getString("m1117"));
        m.setM1118(rs.getString("m1118"));
        m.setM1119(rs.getString("m1119"));
        m.setM1120(rs.getString("m1120"));
        m.setM1121(rs.getString("m1121"));
        m.setM1122(rs.getString("m1122"));
        m.setM1123(rs.getString("m1123"));
        m.setM1124(rs.getString("m1124"));
        m.setM1125(rs.getString("m1125"));
        m.setM1126(rs.getString("m1126"));
        m.setM1127(rs.getString("m1127"));
        m.setM1128(rs.getString("m1128"));
        m.setM1129(rs.getString("m1129"));
        m.setM1130(rs.getString("m1130"));
        m.setM1131(rs.getString("m1131"));

        m.setM1201(rs.getString("m1201"));
        m.setM1202(rs.getString("m1202"));
        m.setM1203(rs.getString("m1203"));
        m.setM1204(rs.getString("m1204"));
        m.setM1205(rs.getString("m1205"));
        m.setM1206(rs.getString("m1206"));
        m.setM1207(rs.getString("m1207"));
        m.setM1208(rs.getString("m1208"));
        m.setM1209(rs.getString("m1209"));
        m.setM1210(rs.getString("m1210"));
        m.setM1211(rs.getString("m1211"));
        m.setM1212(rs.getString("m1212"));
        m.setM1213(rs.getString("m1213"));
        m.setM1214(rs.getString("m1214"));
        m.setM1215(rs.getString("m1215"));
        m.setM1216(rs.getString("m1216"));
        m.setM1217(rs.getString("m1217"));
        m.setM1218(rs.getString("m1218"));
        m.setM1219(rs.getString("m1219"));
        m.setM1220(rs.getString("m1220"));
        m.setM1221(rs.getString("m1221"));
        m.setM1222(rs.getString("m1222"));
        m.setM1223(rs.getString("m1223"));
        m.setM1224(rs.getString("m1224"));
        m.setM1225(rs.getString("m1225"));
        m.setM1226(rs.getString("m1226"));
        m.setM1227(rs.getString("m1227"));
        m.setM1228(rs.getString("m1228"));
        m.setM1229(rs.getString("m1229"));
        m.setM1230(rs.getString("m1230"));
        m.setM1231(rs.getString("m1231"));

        return m;
    }

    @Override
    public List<AlarmHistory> findAllAlarmHistory(AlarmHistoryFilter alarmHistoryFilter, Pagination pagination) {
        pagination.setTotalCount(countHistory(alarmHistoryFilter));

        RowMapper<AlarmHistory> rowMapper = (rs, rowNum) -> {
            AlarmHistory alarmHistory = new AlarmHistory();
            alarmHistory.setId(rs.getInt("id"));
            alarmHistory.setLine(rs.getString("ref_line"));
            alarmHistory.setMachine(rs.getString("ref_machine"));
            alarmHistory.setProduct(rs.getString("ref_product"));
            alarmHistory.setMstate(findString(rs.getString("machine_state")));
            alarmHistory.setWorkDate(rs.getString("work_date"));
            alarmHistory.setStartTime(rs.getString("start_time").replace("T"," "));
            alarmHistory.setEndTime(rs.getString("end_time").replace("T", " "));
            alarmHistory.setDuration(Helper.secondsToString(Integer.parseInt(Helper.getDateRangeInSecond(rs.getString("start_time").replace("T", " "), rs.getString("end_time").replace("T", " ")).toString())));
            alarmHistory.setAlarmCode(rs.getString("alarm_code"));
            alarmHistory.setAlarmName(rs.getString("alarm_name"));
            alarmHistory.setAlarmId(rs.getString("alarm_id"));

            return alarmHistory;
        };
        System.out.println(alarmHistoryFilter.toString());

        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALARM_HISTORY.toString(), new Object[]{
                alarmHistoryFilter.getLine(),
                alarmHistoryFilter.getAlarmName() ,
                alarmHistoryFilter.getProductionDate(),
                pagination.getLimit(),
                pagination.getOffset()
        }, rowMapper);
    }

    @Override
    public String callAutoCountingAlarmDuration() {
        String result = jdbcTemplate.queryForObject(SQLStatement.AlarmStatisticsSQL.AUTO_COUNTING_ALARM_DURATION.toString(),String.class);
        return result;
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatisticDuration(String factory, String line, String machine, String year) {
        RowMapper<MainAlarmStatistics> rowMapper = (rs, rowNum) -> {
            return getObject(rs, false);
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL_MAIN_ALARM_STATISTICS_DURATION.toString(),
                new Object[]{factory, line, machine, year}, rowMapper);
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatisticSum(String factory, String line, String machine, String year) {
        RowMapper<MainAlarmStatistics> rowMapper = (rs, rowNum) -> {
            return getObject(rs, true);
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL_MAIN_ALARM_STATISTICS_SUM.toString(),
                new Object[]{factory, line, machine, year}, rowMapper);
    }

    @Override
    public List<MainAlarmStatistics> getMainAlarmStatisticDurationSum(String factory, String line, String machine, String year) {
        RowMapper<MainAlarmStatistics> rowMapper = (rs, rowNum) -> {
            return getObject(rs, true);
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.FIND_ALL_MAIN_ALARM_STATISTICS_DURATION_SUM.toString(),
                new Object[]{factory, line, machine, year}, rowMapper);
    }

    @Override
    public List<MainAlarmStatistics> graphAlarmCountingByYear(String p_year) {
        RowMapper<MainAlarmStatistics> rowMapper = (rs, rowNum) -> {
            return getObject(rs, true);
        };
        return jdbcTemplate.query(SQLStatement.AlarmStatisticsSQL.ALARM_GRAPH_BY_YEAR.toString(),
                new Object[]{p_year}, rowMapper);
    }

    private Long countHistory(AlarmHistoryFilter alarmHistoryFilter) {
        return jdbcTemplate.queryForObject(SQLStatement.AlarmStatisticsSQL.
                COUNT_ALARM_HISTORY.toString(), new Object[]{
                alarmHistoryFilter.getLine(),
                alarmHistoryFilter.getAlarmName() ,
                alarmHistoryFilter.getProductionDate()
        }, Long.class);

    }


    private Long count(AlarmStatisticsFilter alarmStatisticsFilter) {
        return jdbcTemplate.queryForObject(SQLStatement.AlarmStatisticsSQL.COUNT.toString(), new Object[]{"%" + alarmStatisticsFilter.getLine() + "%", "%" + alarmStatisticsFilter.getMachine() + "%",
                alarmStatisticsFilter.getStartYear(),  alarmStatisticsFilter.getEndYear()}, Long.class);

    }

    private String findString(String str){
        String s = str.toLowerCase();
        if(s.contains("stop"))
            return "STOP";
        else if(s.contains("wait"))
            return "WAIT";
        else if(s.contains("manual"))
            return "MANUAL";
        else if(s.contains("auto"))
            return "AUTO";
        else
            return str;
    }
}
