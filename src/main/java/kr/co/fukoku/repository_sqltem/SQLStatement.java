package kr.co.fukoku.repository_sqltem;

public class SQLStatement {
    // TODO: SQL STATEMENT FOR PRODUCT_DEFECTIVE_DETAIL
    public enum ProductDefectiveDetail {
        FIND_ALL_MACHINE("SELECT DISTINCT MAPPING_NAME from lines_machines_detail"),
        FIND_ALL_LINES("SELECT id, mapping_name FROM _lines;"),
        FIND_PRODUCT_DEFECT_BY_DATE("SELECT LINE, SUM(PRODUCT_DEFECT) as PRODUCT_DEFECT ,SUM(PRODUCT_QUANTITY) PRODUCT_QUANTITY FROM dashboard_analysis WHERE STORE_DATE BETWEEN ? AND ? GROUP BY LINE;");
        private String value;
        ProductDefectiveDetail(String value) {
            this.value = value;
        }
        public String toString() {
            return this.value;
        }
    }


    // TODO: SQL STATEMENT FOR OPERATIONTIME
    public enum OperationTimeSQL {
        FINE_UNPLAN_STOP_TIME_BY_LINE_START_END_TIME("SELECT DURATION, ACTION_TYPE, START_DATE, END_DATE FROM operating_time WHERE ACTION_TYPE = '비계획정지' AND ref_line=? AND START_DATE <= ? AND end_date >= ?;"),
        FIND_OPERATION_TIME_BY_DATE("SELECT DISTINCT OP.start_time, OP.end_time, ASS.ref_line, ASS.ref_operating_time, OP.id, ASS.cross_date, OP.DURATION, OP.start_date, OP.end_date FROM assign_working_time ASS, operating_time OP WHERE ASS.ref_operating_time = OP.id AND ASS.ref_line = ? AND ASS.cross_date BETWEEN ? AND ?;"),
        FIND_OPERATION_TIME_BY_DATE_LINE_PRO("SELECT DISTINCT ASS.ref_line, ASS.ref_operating_time, OP.id, ASS.cross_date, OP.DURATION, OP.start_date, OP.end_date FROM assign_working_time ASS, operating_time OP WHERE ASS.ref_operating_time = OP.id AND ASS.ref_line = ? AND ASS.ref_product = ? AND ASS.cross_date BETWEEN ? AND ?;"),
        FIND_DASHBOARD_HISTORY_DATA("SELECT SUM(OPERATING_TIME) OPERATING_TIME, SUM(CYCLE_TIME) CYCLE_TIME, SUM(PLAN_STOP_TIME) PLAN_STOP_TIME, SUM(UNPLAN_STOP_TIME) UNPLAN_STOP_TIME, SUM(PRODUCT_QUANTITY) PRODUCT_QUANTITY, SUM(PRODUCT_DEFECT) PRODUCT_DEFECT\n" +
                "FROM dashboard_analysis WHERE LINE = ? AND MACHINE_NAME = ? AND STORE_DATE BETWEEN ? AND ?;"),
        FIND_LINECHART_HISTORY_DATA("SELECT STORE_DATE, OPERATING_TIME, CYCLE_TIME, PLAN_STOP_TIME, UNPLAN_STOP_TIME,  PRODUCT_QUANTITY, PRODUCT_DEFECT FROM dashboard_analysis WHERE LINE = ? AND MACHINE_NAME = ? AND STORE_DATE BETWEEN ? AND ?;"),
        INSERT_DASHBOARD_HISTORY_DATA("INSERT INTO dashboard_analysis(store_date, line, machine_name,operating_time,cycle_time,plan_stop_time,unplan_stop_time,product_quantity,product_defect) \n" +
                "VALUES(?,?,?,?,?,?,?,?,?);"),
        UPDATE_DASHBOARD_HISTORY_DATA("UPDATE dashboard_analysis SET OPERATING_TIME=?, CYCLE_TIME=?, PLAN_STOP_TIME=?, UNPLAN_STOP_TIME=?, PRODUCT_QUANTITY=?, PRODUCT_DEFECT=? WHERE STORE_DATE=? AND LINE=? AND MACHINE_NAME=?;");
        private String value;

        OperationTimeSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }
    // TODO: SQL STATEMENT FOR PLANSTOPTIME
    public enum PlanStopTimeSQL {
        FIND_PlAN_STOP_TIME_START_END_DATE("SELECT DURATION, ACTION_TYPE, START_DATE, END_DATE FROM operating_time WHERE ACTION_TYPE = '계획정지' AND ref_line=? AND START_DATE <= ? AND end_date >= ?;");
        private String value;

        PlanStopTimeSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR PRODUCT
    public enum ProductSQL {
        FIND_ALL("SELECT * FROM products WHERE _name LIKE ? "),
        FIND_ALL_SELECT_BOX("SELECT id, _name FROM products GROUP BY _name;"),
        FIND_ALL_BY_LINE_SELECT_BOX("SELECT id, _name FROM products WHERE ref_line = ? GROUP BY _name;"),
        COUNT("SELECT COUNT(1) FROM products WHERE _name LIKE ?;"),
        FIND_BY_ID("SELECT *FROM products WHERE id = ?"),
        ADD("INSERT INTO products(_name, ref_line, start_date, end_date, remark, process, lsl, usl) VALUES(?, ?, ?, ?, ?, ?, ?, ?);"),
        DELETE("DELETE FROM products WHERE id = ?"),
        UPDATE("UPDATE products SET _name = ?, ref_line = ?, start_date = ?, end_date = ?, remark = ?, process = ?, lsl = ?, usl = ? WHERE id = ?;");

        private String value;

        ProductSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR COMPANY
    public enum CompanySQL{
        FIND_BY_NAME("SELECT id, _name, mapping_name, location, remark FROM companies WHERE LOWER(_name) LIKE LOWER(?);"),
        FIND_BY_ID("SELECT id, _name, mapping_name, location, remark FROM companies WHERE id = ?;"),
        ADD("INSERT INTO companies(_name, mapping_name, location, remark) VALUES(?, ?, ?, ?);"),
        DELETE("DELETE FROM companies WHERE id = ?;"),
        UPDATE("UPDATE companies SET _name = ?, mapping_name = ?, location = ?, remark = ? WHERE id = ?;");

        private String value;
        CompanySQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR FACTORY
    public enum FactorySQL{
        FIND_ALL_BY_NAME("SELECT *FROM factories WHERE _name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL("SELECT *FROM factories ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_FOR_SELECT_BOX("SELECT id, _name FROM factories;"),
        COUNT("SELECT COUNT(1) FROM factories WHERE _name LIKE ?;"),
        FIND_BY_ID("SELECT *FROM factories WHERE id = ?;"),
        ADD("INSERT INTO factories(_name, mapping_name, address, remark, product, production_start_date, production_end_date) VALUES(?, ?, ?, ?, ?, ?, ?);"),
        DELETE("DELETE FROM factories WHERE id = ?;"),
        UPDATE("UPDATE factories SET _name = ?, mapping_name = ?, address = ?, remark = ?, product = ?, production_start_date = ?, production_end_date = ?  WHERE id = ?;");

        private String value;
        FactorySQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }
    public enum GetMachineName {
        FIND_ALL_MACHINES("SELECT LMD.mapping_name FROM lines_machines_detail LMD INNER JOIN _lines L ON L.id = LMD.ref_line_id WHERE LMD.ref_line_id = ?;"),
        ADD("");
        private String value;
        GetMachineName(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }
    // TODO: SQL STATEMENT FOR LINE
    public enum LineSQL{
        FIND_ALL("SELECT *FROM _lines ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_FACTORY("SELECT *FROM _lines WHERE ref_factory = ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_FACTORY_AND_NAME("SELECT *FROM _lines WHERE ref_factory = ? AND _name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_NAME("SELECT *FROM _lines WHERE _name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_NAME_AND_MAPPING_NAME("SELECT L._name, L.mapping_name, L.id FROM _lines L;"),
        FIND_BY_ID("SELECT *FROM _lines L WHERE id = ?;"),
        COUNT("SELECT COUNT(1) FROM _lines;"),
        COUNT_BY_FACTORY("SELECT COUNT(1) FROM _lines WHERE ref_factory = ?;"),
        COUNT_BY_FACTORY_AND_NAME("SELECT COUNT(1) FROM _lines WHERE ref_factory = ? AND _name LIKE ?;"),
        COUNT_BY_NAME("SELECT COUNT(1) FROM _lines WHERE _name LIKE ?;"),
        ADD("INSERT INTO _lines(_name, mapping_name, seq, remark, ref_factory, location, production_date, product) VALUES(?, ?, ?, ?, ?, ?, ?, ?);"),
        DELETE("DELETE FROM _lines WHERE id = ?;"),
        UPDATE("UPDATE _lines SET _name = ?, mapping_name = ?, seq = ?, remark = ?, ref_factory = ?, location = ?, production_date = ?, product = ? WHERE id = ?;");

        private String value;
        LineSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR MACHINE
    public enum MachineSQL{
        //FIND_ALL("SELECT *FROM machines WHERE factory LIKE ? AND _name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL("SELECT m.* , SUBSTRING_INDEX(lm.join_name , '_', 1) as line_name FROM machines m lEFT JOIN lines_machines_detail lm ON m.id = lm.ref_machine_id  WHERE m.factory LIKE ? AND m._name LIKE ? GROUP BY m._name ORDER BY m.id DESC LIMIT ? OFFSET ?"),
        FIND_BY_ID("SELECT *FROM machines WHERE id = ?;"),
        FIND_ALL_FOR_SELECT_BOX("SELECT id, _name, mapping_name FROM machines;"),
        FIND_ALL_MACHINENAME_MAPPING_NAME("SELECT LMD.display_name, LMD.mapping_name " +
                "FROM _lines L " +
                "INNER JOIN lines_machines_detail LMD ON LOWER(L._name) = LOWER(SUBSTR(LMD.mapping_name, 1, 2)) " +
                "INNER JOIN machines M ON LOWER(SUBSTR(LMD.join_name,4, LENGTH(LMD.join_name))) = M.mapping_name " +
                "WHERE LOWER(L._name) = LOWER(?) ORDER BY LMD._order ASC;"),
        FIND_ALL_MACHINENAME_MAPPING("SELECT LMD.display_name, LMD.mapping_name " +
                "FROM _lines L " +
                "INNER JOIN lines_machines_detail LMD ON LOWER(L._name) = LOWER(SUBSTR(LMD.mapping_name, 1, 2)) " +
                "INNER JOIN machines M ON LOWER(SUBSTR(LMD.join_name,4, LENGTH(LMD.join_name))) = M.mapping_name;"),
        FIND_ALL_MACHINENAME_MAPPING_TABLE("SELECT CONCAT(L._name,\"_\",LMD.display_name) AS display_name, LMD.mapping_name " +
                "FROM _lines L " +
                "INNER JOIN lines_machines_detail LMD ON LOWER(L._name) = LOWER(SUBSTR(LMD.mapping_name, 1, 2)) " +
                "INNER JOIN machines M ON LOWER(SUBSTR(LMD.join_name,4, LENGTH(LMD.join_name))) = M.mapping_name;"),
        COUNT("SELECT COUNT(1) FROM machines WHERE factory LIKE ? AND _name LIKE ?;"),
        ADD("INSERT INTO machines(_name, ip, seq, remark, mapping_name, import_date, code, manufacturer, facility_staff, facility_contact_person, factory, station, plc_type, plc_communication_device) VALUES(?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?)"),
        DELETE("DELETE FROM machines WHERE id = ?;"),
        UPDATE("UPDATE machines SET _name = ?, ip = ?, seq = ?, remark = ?, mapping_name = ?, import_date = ?, code = ?, manufacturer = ?, facility_staff = ?, facility_contact_person = ?, factory = ?, station = ?, plc_type = ?, plc_communication_device = ? WHERE id = ?");

        private String value;
        MachineSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR DEPARTMENT
    public enum DepartmentSQL{
        FIND_ALL("SELECT D.id, D._code, D._name, D.remark, D.parent FROM department_product_categories D WHERE D.parent = 0 ORDER BY D.id DESC;"),
        FIND_ALL_NAME("SELECT D.id, D._name FROM department_product_categories D WHERE D.parent = 0 ORDER BY _order;"),
        FIND_BY_ID("SELECT D.id, D._code, D._name, D.remark, D.parent, D._order FROM department_product_categories D WHERE D.parent = 0 AND D.id = ?;"),
        ADD("INSERT INTO department_product_categories(_code, _name, remark, parent, _order, status) VALUES(?, ?, ?, 0, ?, 1)"),
        DELETE("DELETE FROM department_product_categories WHERE id = ?"),
        UPDATE("UPDATE department_product_categories SET _code = ?, _name = ?, remark = ?, _order = ? WHERE id = ?");

        private String value;
        DepartmentSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR CATEGORY ITEM
    public enum CategoryItemSQL{/*, (SELECT _name FROM department_product_categories WHERE id = D.parent LIMIT 1) AS department*/
        FIND_ALL("SELECT D.id, D._code, D._name, D.remark, D.parent, D._order, (SELECT _name FROM department_product_categories WHERE id = D.parent LIMIT 1) AS department " +
                "FROM department_product_categories D " +
                "WHERE parent != 0;"),
        FIND_ALL_BY_DEPARTMENT("SELECT D.id, D._code, D._name, D.remark, D.parent, D._order, (SELECT _name FROM department_product_categories WHERE id = D.parent LIMIT 1) AS department " +
                "FROM department_product_categories D " +
                "WHERE D.parent = ?;"),
        FIND_ALL_BY_DEPARTMENT_SELECT_BOX("SELECT D.id, D._name, D._code " +
                "FROM department_product_categories D " +
                "WHERE D.parent = ?;"),
        FIND_ALL_BY_DEPARTMENT_AND_STATUS_SELECT_BOX("SELECT D.id, D._name, D._code " +
                "FROM department_product_categories D " +
                "WHERE D.parent = ? AND D.status = ?" +
                "ORDER BY _order ASC;"),
        FIND_BY_ID("SELECT D.id, D._code, D._name, D.remark, D.parent, D._order FROM department_product_categories D WHERE D.parent != 0 AND D.id = ?;"),
        ADD("INSERT INTO department_product_categories(_code, _name, remark, parent, _order, status) VALUES(?, ?, ?, ?, ?, 1)"),
        DELETE("DELETE FROM department_product_categories WHERE id = ?"),
        UPDATE("UPDATE department_product_categories SET _code = ?, _name = ?, remark = ?, parent = ?, _order = ?, status = 1 WHERE id = ?");

        private String value;
        CategoryItemSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR ITEM
    public enum ItemSQL{
        FIND_ALL_BY_DEPARTMENT("SELECT P.id, P._code, P._name, P.remark, P.ref_dep_pro_cat, P.ref_parent, (SELECT _name FROM department_product_categories WHERE id = P.ref_parent LIMIT 1) AS department " +
                "FROM productions P " +
                "INNER JOIN department_product_categories DPC ON DPC.id = P.ref_parent " +
                "WHERE P.ref_parent = ?;"),
        FIND_ALL_ITEM_NAME("SELECT id, _name, _code FROM productions WHERE ref_dep_pro_cat = ?;"),
        FIND_ALL("SELECT P.id, P._code, P._name, P.remark, P.ref_dep_pro_cat, P.ref_parent, (SELECT _name FROM department_product_categories WHERE id = P.ref_parent LIMIT 1) AS department " +
                "FROM productions P " +
                "INNER JOIN department_product_categories DPC ON DPC.id = P.ref_parent;"),
        FIND_BY_ID("SELECT P.id, P._code, P._name, P.remark, P.ref_dep_pro_cat, P.ref_parent FROM productions P WHERE P.id = ?;"),
        ADD("INSERT INTO productions(_code, _name, remark, ref_dep_pro_cat, ref_parent) VALUES(?, ?, ?, ?, ?)"),
        DELETE("DELETE FROM productions WHERE id = ?"),
        UPDATE("UPDATE productions SET _code = ?, _name = ?, remark = ?, ref_dep_pro_cat = ?, ref_parent = ? WHERE id = ?");

        private String value;
        ItemSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }
    // =======================================================================
    // TODO: SQL STATEMENT FOR TREATMENT ACTION
    public enum TreatmentSQL{
        FIND_ALL_BY_DEPARTMENT_AND_ERROR(" SELECT A.id, A._name, A._code, A.remark, E._name AS error, EA.id AS detail_id, EA.error_id , A.ref_department AS dp_id " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON A.id = EA.action_id " +
                " INNER JOIN error E ON EA.error_id = E.id " +
                " WHERE A.ref_department = ? AND EA.error_id = ? " +
                " ORDER BY EA.id DESC " +
                " LIMIT ? " +
                " OFFSET ?; "),
        FIND_ALL_BY_DEPARTMENT(" SELECT " +
                " A.id, " +
                " A._name, " +
                " A._code, " +
                " A.remark, " +
                " E._name AS error, " +
                " EA.id AS detail_id, " +
                " EA.error_id, " +
                " A.ref_department AS dp_id " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON A.id = EA.action_id " +
                " INNER JOIN error E ON EA.error_id = E.id " +
                " WHERE A.ref_department = ? " +
                " ORDER BY EA.id DESC " +
                " LIMIT ? " +
                " OFFSET ?; "),
        FIND_ALL(" SELECT " +
                " A.id, " +
                " A._name, " +
                " A._code, " +
                " A.remark, " +
                " E._name AS error, " +
                " EA.id AS detail_id, " +
                " EA.error_id, " +
                " A.ref_department AS dp_id  " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON A.id = EA.action_id " +
                " INNER JOIN error E ON EA.error_id = E.id  " +
                " ORDER BY " +
                " EA.id DESC " +
                " LIMIT ? OFFSET ?;"),

        FIND_ALL_CODE_AND_ERROR(" SELECT " +
                " A.id, " +
                " A._name AS treatment_name, " +
                " E.id AS error_id, " +
                " E._name AS error, " +
                " EA.id AS detail_id " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON EA.action_id = A.id " +
                " INNER JOIN error E ON EA.error_id = E.id " +
                " WHERE E.id = ? " +
                " ORDER BY E.id ASC; "),

        FIND_ALL_NAME_AND_ID("SELECT id, _name FROM action WHERE ref_department = ?;"),
        FIND_BY_ERROR(" SELECT A.id, EA.id AS detail_id, " +
                " A._name, " +
                " A._code " +
                " FROM action A INNER JOIN error_action_detail EA " +
                " ON A.id = EA.action_id " +
                " WHERE EA.error_id = ?; "),

        COUNT_BY_DEPARTMENT_AND_ERROR(" SELECT COUNT(1)  " +
                "FROM error_action_detail EA  " +
                "INNER JOIN action A ON A.id = EA.action_id  " +
                "INNER JOIN department_product_categories DP ON A.ref_department = DP.id  " +
                "WHERE A.ref_department = ? AND EA.error_id = ? "),

        COUNT_BY_DEPARTMENT(" SELECT COUNT(1) " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON A.id = EA.action_id " +
                " INNER JOIN department_product_categories DP ON A.ref_department = DP.id " +
                " WHERE A.ref_department = ? "),

        COUNT(" SELECT COUNT(1) " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON A.id = EA.action_id " +
                " INNER JOIN department_product_categories DP ON A.ref_department = DP.id; "),

        FIND_ALL_BY_DEPARTMENT_SELECT_BOX("SELECT A._code, A._name FROM action A WHERE A.ref_department = ?;"),


        FIND_BY_ID(" SELECT A.id, A._name, A._code, A.remark, E._name AS error, EA.id AS detail_id, EA.error_id, A.ref_department AS dp_id " +
                " FROM error_action_detail EA " +
                " INNER JOIN action A ON A.id = EA.action_id " +
                " INNER JOIN error E ON EA.error_id = E.id " +
                " WHERE EA.id = ?; "),

        ADD("INSERT INTO action(_code, _name, remark, ref_department) VALUES(?, ?, ?, ?)"),
        DELETE("DELETE FROM action WHERE id = ?"),
        UPDATE("UPDATE action SET _code = ?, _name = ?, remark = ?, ref_department = ? WHERE id = ?");

        private String value;
        TreatmentSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR TREATMENT DETAIL
    public enum TreatmentDetailSQL{
        ADD("INSERT INTO error_action_detail(error_id, action_id) VALUES(?, ?);"),
        DELETE("DELETE FROM error_action_detail WHERE id = ? ; "),
        UPDATE("UPDATE error_action_detail SET action_id = ?, error_id = ? WHERE id = ?");

        private String value;
        TreatmentDetailSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    public enum TopTreatmentSQL {
        FIND_ALL(" SELECT " +
                " A.id, " +
                " A._code, " +
                " A._name, " +
                " A.remark, " +
                " D._name AS department " +
                " FROM action AS A INNER JOIN department_product_categories AS D ON A.ref_department = D.id " +
                " WHERE D._name LIKE ? " +
                " ORDER BY A.id DESC " +
                " LIMIT ? " +
                " OFFSET ?; "),
        COUNT(" SELECT COUNT(1) " +
                " FROM action AS A INNER JOIN department_product_categories AS D " +
                " ON A.ref_department = D.id " +
                " WHERE D._name LIKE ?; "),
        FIND_BY_ID("SELECT * FROM action WHERE id = ?;"),
        ADD("INSERT INTO action(_code, _name, remark, ref_department) VALUES(?, ?, ?, ?);"),
        UPDATE("UPDATE action SET _code = ?, _name = ?, remark = ?, ref_department = ? WHERE id = ?;"),
        DELETE("DELETE FROM action WHERE id = ?;");
        private String value;

        TopTreatmentSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // ============================================================================

    // TODO: SQL STATEMENT FOR ERROR
    public enum ErrorSQL{
        FIND_ALL_BY_DEPARTMENT_AND_CLASSIFICATION("SELECT E.id, E._name, E._code, E.remark, DP._name AS classification, EP.id AS detail_id, EP.ref_dep_pro_cat AS cf_id, E.ref_department AS dp_id " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id " +
                "WHERE E.ref_department = ? AND EP.ref_dep_pro_cat = ? " +
                "ORDER BY EP.id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_BY_DEPARTMENT("SELECT E.id, E._name, E._code, E.remark, DP._name AS classification, EP.id AS detail_id, EP.ref_dep_pro_cat AS cf_id, E.ref_department AS dp_id  " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id " +
                "WHERE E.ref_department = ? " +
                "ORDER BY EP.id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL("SELECT E.id, E._name, E._code, E.remark, DP._name AS classification, EP.id AS detail_id, EP.ref_dep_pro_cat AS cf_id, E.ref_department AS dp_id  " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id " +
                "ORDER BY EP.id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_CODE_AND_CLASSIFICATION("SELECT E.id, E._name AS error_name, DP.id AS cf_id, DP._name AS classification, EP.id AS detail_id " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON EP.ref_error = E.id " +
                "INNER JOIN department_product_categories DP ON DP.id = EP.ref_dep_pro_cat " +
                "WHERE DP.parent != 0  AND DP.id = ? " +
                "ORDER BY DP._order ASC;"),
        FIND_ALL_NAME_AND_ID("SELECT id, _name FROM error WHERE ref_department = ?;"),
        FIND_BY_CLASSIFICATION("SELECT E.id, EP.id AS detail_id, E._name, E._code " +
                " FROM error_pro_cat_detail EP " +
                " INNER JOIN error E ON EP.ref_error = E.id " +
                " WHERE EP.ref_dep_pro_cat = ?; "),
        COUNT_BY_DEPARTMENT_AND_CLASSIFICATION("SELECT COUNT(1) " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id " +
                "WHERE E.ref_department = ? AND EP.ref_dep_pro_cat = ? "),
        COUNT_BY_DEPARTMENT("SELECT COUNT(1) " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id " +
                "WHERE E.ref_department = ?"),
        COUNT("SELECT COUNT(1) " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id;"),
        FIND_BY_ID("SELECT E.id, E._name, E._code, E.remark, DP._name AS classification, EP.id AS detail_id, EP.ref_dep_pro_cat AS cf_id, E.ref_department AS dp_id " +
                "FROM error_pro_cat_detail EP " +
                "INNER JOIN error E ON E.id = EP.ref_error " +
                "INNER JOIN department_product_categories DP ON EP.ref_dep_pro_cat = DP.id " +
                "WHERE EP.id = ?"),
        ADD("INSERT INTO error(_code, _name, remark, ref_department) VALUES(?, ?, ?, ?)"),
        DELETE("DELETE FROM error WHERE id = ?"),
        UPDATE("UPDATE error SET _code = ?, _name = ?, remark = ?, ref_department = ? WHERE id = ?");

        private String value;
        ErrorSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR ERROR
    public enum ErrorDetailSQL{
        ADD("INSERT INTO error_pro_cat_detail(ref_error, ref_dep_pro_cat) VALUES(?, ?)"),
        DELETE("DELETE FROM error_pro_cat_detail WHERE id = ?"),
        UPDATE("UPDATE error_pro_cat_detail SET ref_error = ?, ref_dep_pro_cat = ? WHERE id = ?");

        private String value;
        ErrorDetailSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR CATEGORY ITEM
    public enum OperatingTimeSQL{
        FIND_ALL("SELECT *FROM operating_time WHERE ref_line LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_ACTION_TYPE("SELECT *FROM operating_time WHERE ref_line LIKE ? AND action_type LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_ACTION_TYPE_AND_WORKING_TYPE_NAME("SELECT *FROM operating_time WHERE ref_line LIKE ? AND working_type_name LIKE ? AND action_type LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_WORKING_TYPE_NAME("SELECT *FROM operating_time WHERE ref_line LIKE ? AND working_type_name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_WORKING_TIME_FOR_SELECT_BOX("SELECT *FROM operating_time WHERE status = 1 AND action_type = '정상근무';"),
        FIND_ALL_BY_TIME_RANGE("SELECT start_date, end_date, duration " +
                "FROM operating_time OT " +
                "WHERE OT.action_type = '계획정지' " +
                "AND start_date BETWEEN ? AND ? " +
                "AND start_date BETWEEN ? AND ?;"),
        FIND_BY_ID("SELECT *FROM operating_time WHERE id = ?;"),
        COUNT_ALL("SELECT COUNT(1) FROM operating_time WHERE ref_line LIKE ?;"),
        COUNT_ALL_BY_ACTION_TYPE("SELECT COUNT(1) FROM operating_time WHERE ref_line LIKE ? AND action_type = ?;"),
        COUNT_ALL_BY_ACTION_TYPE_AND_WORKING_TYPE_NAME("SELECT COUNT(1) FROM operating_time WHERE ref_line LIKE ? AND working_type_name = ? AND action_type = ?;"),
        COUNT_ALL_WORKING_TYPE_NAME("SELECT COUNT(1) FROM operating_time WHERE ref_line LIKE ? AND action_type = ?;"),
        ADD("INSERT INTO operating_time(working_code, working_type_name, work_type_name, time_tag, action_type, start_time, end_time, duration, ref_item, start_day, end_day, start_date, end_date, status, ref_line) " +
                "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, 1, ?)"),
        DELETE("DELETE FROM operating_time WHERE id = ?"),
        UPDATE("UPDATE operating_time " +
                "SET working_code = ?, working_type_name  = ?, work_type_name = ?, time_tag = ?, action_type = ?, start_time = ?, end_time = ?, duration = ?, ref_item = ?, start_day = ?, end_day = ?, start_date = ?, end_date = ?, status = 1, ref_line =? " +
                "WHERE id = ?");
        private String value;
        OperatingTimeSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR SUB PRODUCTION
    public enum SubProductionSQL{
        FIND_ALL("SELECT *FROM sub_productions ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_PRODUCTION("SELECT *FROM sub_productions WHERE ref_production LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_CODE_AND_NAME_BY_PRODUCTION("SELECT _code, _name FROM sub_productions WHERE ref_production LIKE ?;"),
        FIND_BY_ID("SELECT *FROM sub_productions WHERE id = ?;"),
        COUNT_ALL("SELECT COUNT(1) FROM sub_productions;"),
        COUNT_ALL_BY_PRODUCTION("SELECT COUNT(1) FROM sub_productions WHERE ref_production = ?;"),
        ADD("INSERT INTO sub_productions(_code, _name, remark, ref_production) VALUES(?, ?, ?, ?)"),
        DELETE("DELETE FROM sub_productions WHERE id = ?"),
        UPDATE("UPDATE sub_productions SET _code = ?, _name = ?, remark = ?, ref_production = ? WHERE id = ?");
        private String value;
        SubProductionSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR USERS
    public enum UserSQL{
        FIND_ALL("SELECT *FROM users ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_DEPARTMENT("SELECT *FROM users WHERE ref_department = ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_FILTER("SELECT *FROM users WHERE _name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_BY_DEPARTMENT_AND_FILTER("SELECT *FROM users WHERE ref_department = ? AND _name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_BY_ID("SELECT *FROM users WHERE id = ?;"),
        COUNT_ALL("SELECT COUNT(1) FROM users;"),
        COUNT_ALL_BY_DEPARTMENT("SELECT COUNT(1) FROM users WHERE ref_department = ?;"),
        COUNT_ALL_BY_FILTER("SELECT COUNT(1) FROM users WHERE _name LIKE ?;"),
        COUNT_ALL_BY_DEPARTMENT_AND_FILTER("SELECT COUNT(1) FROM users WHERE ref_department = ? AND _name LIKE ?;"),
        ADD("INSERT INTO users(e_id, _password, _name, phone, cell_phone, email, position, role, _status, ref_department, ref_line) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"),
        UPDATE("UPDATE users SET e_id = ?, _name = ?, phone = ?, cell_phone = ?, email = ?, position = ?, role = ?, _status = ?, ref_department = ?, ref_line = ? WHERE id = ?"),
        UPDATE_PASSWORD("UPDATE users SET _password = ? WHERE id = ?"),
        DELETE("DELETE FROM users WHERE id = ?;");
        private String value;
        UserSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR PROCESS
    public enum ProcessSQL{
        FIND_ALL("SELECT *FROM processes "),
        FIND_ALL_FOR_CORRELATION("SELECT _name, ref_machine, mapping_name, (SELECT COUNT(1) FROM processes WHERE ref_line = ? AND ref_machine = P.ref_machine GROUP BY ref_machine) AS count FROM processes P WHERE ref_line = ?;"),
        FIND_ALL_BY_LINE("SELECT *FROM processes WHERE ref_line = ? "),
        FIND_ALL_BY_LINE_AND_MACHINE("SELECT *FROM processes WHERE ref_line = ? AND ref_machine = ? "),
        FIND_BY_ID("SELECT *FROM processes WHERE id  = ?;"),
        COUNT_ALL("SELECT COUNT(1) FROM processes;"),
        COUNT_ALL_BY_LINE("SELECT COUNT(1) FROM processes WHERE ref_line = ?;"),
        COUNT_ALL_BY_LINE_AND_MACHINE("SELECT COUNT(1) FROM processes WHERE ref_line = ? AND ref_machine = ?;"),
        ADD("INSERT INTO processes(_name, ref_machine, ref_line, mapping_name, seq) VALUES(?, ?, ?, ?, ?);"),
        UPDATE("UPDATE processes SET _name = ?, ref_machine = ?, ref_line = ?, mapping_name = ?, seq = ? WHERE id = ?;"),
        DELETE("DELETE FROM processes WHERE id = ?;");
        private String value;
        ProcessSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }
    // TODO: SQL STATEMENT FOR QUERY TOTAL HOURS(STOP+AUTO) EACH MACHINE  BY LINE, MACHINENAME,YEAR
    public enum FailureTimeStopWait {
        FIND_MACHINE_NAME(""),
        FIND_BY_ID(""),
        FIND_FAILURE_PER_MONTH("SELECT ref_line,mstate,start_alarm_time,end_alarm_time,e_s_a_t,e_e_a_t " +
                "FROM alarm_histories " +
                "WHERE ref_line = ? AND mstate LIKE ? OR mstate LIKE ? " +
                "GROUP BY mstate ORDER BY start_alarm_time"),
        TOTAL_HOUR_PER_MONTH_BY_MACHINE("SELECT line,machine,total_auto,_date from mstate_analysis WHERE machine=? AND _date LIKE ?"),
        TOTAL_LOAD_TIME_A_MONTH("SELECT ref_line ,duration,_date,action_type " +
                "FROM operating_time ot INNER JOIN assign_working_time awt ON ot.id = awt.id " +
                "WHERE awt.ref_line =?"),
        FIND_FAILURE_PER_MONTH2("SELECT FORMAT(sum(stopauto+stopwait),3) stop_auto_wait,FORMAT(SUM(mtbftotaltime),3) mtbf,FORMAT(SUM(mttrtotaltime),3) mttr,SUM(freqmtbf) freqmtbf,FORMAT(SUM(activetime),3) activetime,date,line,machine,sum(workingtime/60) workingtime,sum(planingnonworkingtime/60) planingnonworkingtime  from machineAnalysisStatus_copy2 where line=? and machine like ? and substr(date,1,4)=?  GROUP BY MONTH(date),machine"),
        DELETE(""),
        UPDATE("");

        private String value;

        FailureTimeStopWait(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }
    // TODO: SQL STATEMENT FOR QUERY TOTAL HOURS EACH MACHINE( STOP+OFFLINE) BY MACHINE and YEAR
    public enum FailureFactoryMonitoring {

        // Select from version 3
        FIND_FACTORY_NAME("SELECT name _name FROM factory"),
        FINE_MACHINE_NAME("SELECT name _name, ref_factory_id ref_factory FROM line"),
        FIND_ALL_LINE_WITH_TOTALHOUR(""),

        COUNT_BY_NAME(""),
        ADD(""),
        DELETE(""),
        UPDATE("");

        private String value;

        FailureFactoryMonitoring(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY TOTAL HOURS EACH MACHINE( STOP+OFFLINE) BY MACHINE and YEAR
    public enum MFaultTimePerYearByMachine {
        // It is not correct
        FIND_MACHINE_NAME("SELECT DISTINCT substr(machine,4) machine FROM mstate_analysis GROUP BY machine ORDER BY machine"),
//        FIND_MACHINE_NAME_BY_LINE("select lmd.mapping_name machine from fukokulines_machines_detail lmd join _lines l ON lmd.ref_line_id=l.id where l._name=?"),
        FIND_MACHINE_NAME_BY_LINE("SELECT m.acronym machine FROM machine m WHERE LEFT(m.acronym,2) =?"),
//        FIND_MACHINE_NAME_IN_ALL_LINE("SELECT lmd.mapping_name,lmd.join_name,l._name from lines_machines_detail lmd JOIN _lines l ON lmd.ref_line_id=l.id where lmd.mapping_name like ?"),
        FIND_MACHINE_NAME_IN_ALL_LINE("SELECT acronym mapping_name, name join_name, LEFT(acronym,2) _name FROM machine WHERE LEFT(acronym, 2) LIKE ?"),

        FIND_ALL_LINE_WITH_TOTALHOUR("SELECT line, " +
                "   machine, " +
                "  substr(_date,1,7) _date " +
                "  ,FORMAT(sum(total_stop),3) total_stop, " +
                "  FORMAT(sum(total_offline),3) total_offline,FORMAT((sum(total_stop)+sum(total_offline)),3) total_stop_offline " +
                "FROM mstate_analysis " +
                "WHERE machine like ? AND substr(_date,1,4) = ? " +
                "GROUP BY machine"),
        GET_OPERATING_TIME_BY_MACHINE("CALL proc_find_opt_by_machine(?,?)"),
        STOP_AUTO_STOP_WAIT2("SELECT sum(stopauto+stopwait) stop_auto_wait,date,line,machine,sum(workingtime/60) workingtime,sum(planingnonworkingtime/60) planingnonworkingtime  FROM machineAnalysisStatus_copy2 where machine like ? and substr(date,1,4)=?  GROUP BY MONTH(date),machine"),
        STOP_AUTO_STOP_WAIT_Graph("SELECT sum(stopauto+stopwait) stop_auto_wait,date,line,machine  FROM machineAnalysisStatus_copy2 where machine like ? and substr(date,1,4)=?  GROUP BY machine"),
        COUNT_BY_NAME(""),
        GET_NON_OPERATION_TIME_BY_MACHINE("SELECT " +
                "\tFORMAT(( " +
                "\t( " +
                "\t( " +
                "\tsum( duration ) + ( SELECT sum( duration ) FROM fault_state_analysis WHERE start_time LIKE ? AND ref_machine =? AND mstate = \"STOP\" OR mstate = \"MANUAL\" )  " +
                "\t) / 3600000  " +
                "\t) / ( SELECT sum( workingtime / 60 ) - sum( planingnonworkingtime / 60 ) FROM machineAnalysisStatus_copy2 WHERE machine =? AND date LIKE ? )  " +
                "\t) * 100,3)  Non_operating_rate " +
                "FROM " +
                "\tnon_active_state_analysis  " +
                "WHERE " +
                "\tstart_time LIKE ?  " +
                "\tAND ref_machine = ? AND ref_line=? " +
                "\tAND mstate = \"STOP\"  " +
                "\tOR mstate = \"MANUAL\""),
        ADD(""),
        DELETE(""),
        UPDATE("");

        private String value;

        MFaultTimePerYearByMachine(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum MFAULTTIMEBREAKDOWNTIMEANALYSISBYLINE {
        GET_DATAFAULTTIME("SELECT " +
                "\tFORMAT(( " +
                "\t( " +
                "\t( " +
                "\tsum( duration ) + ( SELECT sum( duration ) FROM fault_state_analysis WHERE start_time LIKE ? AND ref_line = ? AND mstate = \"STOP\" OR mstate = \"MANUAL\" )  " +
                "\t) / 3600000  " +
                "\t) / ( SELECT sum( workingtime / 60 ) - sum( planingnonworkingtime / 60 ) FROM machineAnalysisStatus_copy2 WHERE line = ? AND date LIKE ? )  " +
                "\t) * 100,3)  Non_operating_rate " +
                "FROM " +
                "\tnon_active_state_analysis  " +
                "WHERE " +
                "\tstart_time LIKE ?  " +
                "\tAND ref_line = ?  " +
                "\tAND mstate = \"STOP\"  " +
                "\tOR mstate = \"MANUAL\""),
        GET_DATAFAULTIME_BY_MACHINE("SELECT " +
                "\tFORMAT(( " +
                "\t( " +
                "\t( " +
                "\tsum( duration ) + ( SELECT sum( duration ) FROM fault_state_analysis WHERE start_time LIKE ? AND ref_machine = ? AND mstate = \"STOP\" OR mstate = \"MANUAL\" )  " +
                "\t) / 3600000  " +
                "\t) / ( SELECT sum( workingtime / 60 ) - sum( planingnonworkingtime / 60 ) FROM machineAnalysisStatus_copy2 WHERE machine = ? AND date LIKE ? )  " +
                "\t) * 100,3)  Non_operating_rate " +
                "FROM " +
                "\tnon_active_state_analysis  " +
                "WHERE " +
                "\tstart_time LIKE ?  " +
                "\tAND ref_machine = ? and ref_line=? " +
                "\tAND mstate = \"STOP\"  " +
                "\tOR mstate = \"MANUAL\"");

        private String value;

        MFAULTTIMEBREAKDOWNTIMEANALYSISBYLINE(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY TOTAL HOURS EACH MACHINE( STOP+OFFLINE) BY lINE AND YEAR
    public enum MFaultTimePerYearByLine {
        FIND_BY_NAME(""),
        FIND_BY_ID(""),
        FIND_ALL_MACHINENAME_WITH_TOTALHOUR("SELECT " +
                "   line, " +
                "   machine, " +
                "  substr(_date,1,4) _date, " +
                "  FORMAT(sum(total_stop),3) total_stop, " +
                "  FORMAT(sum(total_offline),3) total_offline, " +
                "  FORMAT(sum(total_stop)+ " +
                "  sum(total_offline),3) total_stop_offline, "+
                "  FORMAT((((sum(total_stop)+sum(total_offline))/(sum(total_wait)+sum(total_auto)+sum(total_stop)+sum(total_offline)+sum(total_manual)))*100),3) percentage "+
                "FROM mstate_analysis " +
                " WHERE line = ? AND substr(_date,1,4) = ?  " +
                "GROUP BY machine/*,YEAR(_date),MONTH(_date)*/;"),
        NON_ACTIVE_BY_LINE("CALL V3_PROC_NON_ACTIVE_BY_LINE(?,?) "),
        STOP_AUTO_STOP_WAIT2("SELECT sum(stopauto+stopwait) stop_auto_wait,date,line,machine,sum(workingtime/60) workingtime,sum(planingnonworkingtime/60) planingnonworkingtime FROM machineAnalysisStatus_copy2 /*where date like'2018-02%' or date like'2018-03%'*/ where line=? and substr(date,1,4)=? GROUP BY MONTH(date),machine"),
        STOP_AUTO_STOP_WAIT_Graph("SELECT sum(stopauto+stopwait) stop_auto_wait,date,line,machine FROM machineAnalysisStatus_copy2  where line = ? and substr(date,1,4)=? GROUP BY machine ORDER BY stop_auto_wait DESC"),
        STOP_AUTO_STOP_WAIT_GRAPH_BY_MACHINE("SELECT sum(stopauto+stopwait) stop_auto_wait,date,line,machine FROM machineAnalysisStatus_copy2  where machine like ? and substr(date,1,4)=? GROUP BY machine ORDER BY stop_auto_wait DESC"),
        COUNT_BY_NAME(""),
        ADD(""),
        DELETE(""),
        UPDATE("");

        private String value;

        MFaultTimePerYearByLine(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY TOTAL HOURS EACH MACHINE( STOP+OFFLINE) BY All lINE AND YEAR
    public enum MFaultTimePerYearByAllLine {
        FIND_BY_NAME(""),
        FIND_BY_ID(""),
        FIND_ALL_MACHINENAME_WITH_TOTALHOUR("SELECT " +
                "   line, " +
                "   machine, " +
                "  substr(_date,1,4) _date, " +
                "  FORMAT(sum(total_stop),3) total_stop, " +
                "  FORMAT(sum(total_offline),3) total_offline, " +
                "  FORMAT(sum(total_stop)+ " +
                "  sum(total_offline),3) total_stop_offline, "+
                "  FORMAT((((sum(total_stop)+sum(total_offline))/(sum(total_wait)+sum(total_auto)+sum(total_stop)+sum(total_offline)+sum(total_manual)))*100),3) percentage "+
                "FROM mstate_analysis " +
                " WHERE line = ? AND substr(_date,1,4) = ?  " +
                "GROUP BY machine/*,YEAR(_date),MONTH(_date)*/;"),
        GET_NON_STOP_TIME_BY_FACTORY("CALL proc_findNonActiveStateByFactoryWithoutUnion('',?)"),
        STOP_AUTO_STOP_WAIT2("SELECT sum( stopauto + stopwait ) stop_auto_wait, date, line, machine, sum(workingtime/60) workingtime, sum(planingnonworkingtime/60) planingnonworkingtime FROM machineAnalysisStatus_copy2 /*where date like'2018-02%' or date like'2018-03%'*/ WHERE substr( date, 1, 4 ) =? GROUP BY line ORDER BY stop_auto_wait DESC"),
        STOP_AUTO_STOP_WAIT2FORTABLE("SELECT sum( stopauto + stopwait ) stop_auto_wait, date, line, machine, sum(workingtime/60) workingtime, sum(planingnonworkingtime/60) planingnonworkingtime FROM machineAnalysisStatus_copy2 /*where date like'2018-02%' or date like'2018-03%'*/ WHERE substr( date, 1, 4 ) =? GROUP BY MONTH ( date ), line"),
        STOP_AUTO_STOP_WAIT_Graph("SELECT sum(stopauto+stopwait) stop_auto_wait,date,line,machine FROM machineAnalysisStatus_copy2  where line = ? and substr(date,1,4)=? GROUP BY machine"),
        COUNT_BY_NAME(""),
        ADD(""),
        DELETE(""),
        UPDATE("");

        private String value;

        MFaultTimePerYearByAllLine(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY TOTAL HOURS EACH MACHINE( STOP+OFFLINE) BY SEPERATE MONTH
    public enum findEachMonthAsHours {
        FIND_LINE_NAME("SELECT DISTINCT name line FROM line ORDER BY seq"),
        FIND_BY_ID(""),
        FIND_ALL_fINDEACHMONTHASHOURS("SELECT " +
                "   line, " +
                "   machine, " +
                "  substr(_date,1,7) _dates, " +
                "  sum(total_wait) total_wait, " +
                "  sum(total_auto) total_auto, " +
                "  FORMAT(sum(total_stop),3) total_stop, " +
                "  FORMAT(sum(total_offline),FORMAT) total_offline, " +
                "  sum(total_manual) total_manual " +
                "FROM mstate_analysis " +
                " WHERE line= ? AND substr(_date,1,4) = ? " +
                "GROUP BY machine,YEAR(_date),MONTH(_date);"),

        COUNT_BY_NAME(""),
        ADD(""),
        DELETE(""),
        UPDATE("");

        private String value;

        findEachMonthAsHours(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY WORK TIME CALENDAR
    public enum WorkTimeCalendarSQL {
        FIND_ALL("SELECT A.id, A.total, " +
                "        A.ref_line AS line, " +
                "        A.ref_operating_time, " +
                "        A.ref_product, " +
                "        A._date, " +
                "        A.short_date, " +
                "        A.cross_date, " +
                "        A.cross_date_label, " +
                "        O.work_type_name, " +
                "        O.time_tag, " +
                "        O.start_date, " +
                "        O.end_date, " +
                "        O.start_day, " +
                "        O.end_day, " +
                "        O.start_time, " +
                "        O.end_time, " +
                "        O.duration " +
                "FROM assign_working_time A " +
                "INNER JOIN operating_time O ON O.id = A.ref_operating_time " +
                "WHERE A.ref_line = ? AND short_date = ? " +
                "ORDER BY cross_date ASC, A.ref_product ASC;"),
        FIND_BY_ID("SELECT *FROM assign_working_time WHERE id = ?;"),
        ADD("INSERT INTO assign_working_time(ref_operating_time, total, ref_line, ref_product, _date, short_date, cross_date, cross_date_label) VALUES(?, ?, ?, ?, ?, ?, ?, ?);"),
        DELETE("DELETE FROM assign_working_time WHERE id = ?;"),
        FIND_PLANNED_STOP_TIME("SELECT COUNT(1) FROM operating_time WHERE action_type = '계획정지' AND start_date <= ? AND end_date >= ? AND start_time <= ? AND end_time >= ? AND ref_line = ?"),
        UPDATE("UPDATE assign_working_time SET ref_operating_time = ?, total = ?, ref_product = ?, cross_date = ?, cross_date_label = ? WHERE id = ?;");

        private String value;

        WorkTimeCalendarSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY WORK TIME CALENDAR
    public enum PreparedMachineSQL {
        FIND_ALL("SELECT LMD.id, LMD.display_name, LMD.seq, M.code, M.import_date, M.manufacturer, M.facility_staff, M.facility_contact_person, L._name AS line, F._name AS factory " +
                "FROM machines M " +
                "INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id " +
                "INNER JOIN _lines L ON LMD.ref_line_id = L.id " +
                "INNER JOIN factories F ON L.ref_factory = F.id " +
                "WHERE F._name LIKE ? AND L._name LIKE ? "),
        COUNT("SELECT COUNT(1) " +
                "FROM machines M " +
                "INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id " +
                "INNER JOIN _lines L ON LMD.ref_line_id = L.id " +
                "INNER JOIN factories F ON L.ref_factory = F.id " +
                "WHERE F._name LIKE ? AND L._name LIKE ?;"),
        FIND_BY_ID("SELECT LMD.id, LMD.display_name, LMD.mapping_name, LMD.seq, M.id AS mid, M.import_date, M.manufacturer, M.facility_staff, M.facility_contact_person, L._name AS line, F._name AS factory " +
                "FROM machines M " +
                "INNER JOIN lines_machines_detail LMD ON LMD.ref_machine_id = M.id " +
                "INNER JOIN _lines L ON LMD.ref_line_id = L.id " +
                "INNER JOIN factories F ON L.ref_factory = F.id " +
                "WHERE LMD.id = ?;"),
        ADD("INSERT INTO lines_machines_detail(ref_line_id, ref_machine_id, mapping_name, join_name, display_name, seq) VALUES(?, ?, ?, ?, ?, ?);"),
        DELETE("DELETE FROM lines_machines_detail WHERE id = ?;"),
        UPDATE("UPDATE lines_machines_detail SET ref_line_id = ?, ref_machine_id = ?, mapping_name = ?, join_name = ?, display_name = ?, seq = ? WHERE id = ?;");

        private String value;

        PreparedMachineSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }


    // TODO: SQL STATEMENT FOR QUERY CYCLE TIME
    public enum CycleTimeSQL {
        FIND_ALL("SELECT *FROM cycle_times WHERE ref_line LIKE ? AND ref_machine LIKE ? AND ref_product LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_BY_LINE("SELECT REF_LINE, REF_PRODUCT, REF_MACHINE, CYCLE_TIME, REMARK FROM cycle_times WHERE REF_LINE = ?;"),
        FIND_BY_LINE_MACHINE("SELECT REF_LINE, REF_PRODUCT, REF_MACHINE, CYCLE_TIME, REMARK FROM cycle_times WHERE REF_LINE = ? AND REF_MACHINE=?;"),
        COUNT("SELECT COUNT(1) FROM cycle_times WHERE ref_line LIKE ? AND ref_machine LIKE ? AND ref_product LIKE ?;"),
        FIND_BY_ID("SELECT *FROM cycle_times WHERE id = ?;"),
        ADD("INSERT INTO cycle_times(ref_line, ref_product, ref_machine, cycle_time, process_cycle_time, remark) VALUES(?, ?, ?, ?, ?, ?);"),
        DELETE("DELETE FROM cycle_times WHERE id = ?;"),
        UPDATE("UPDATE cycle_times SET ref_line = ?, ref_product = ?, ref_machine = ?, cycle_time = ?, process_cycle_time = ?, remark = ? WHERE id = ?;");

        private String value;

        CycleTimeSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY WORK TIME CALENDAR
    public enum ProductStatusSQL {
        FIND_ALL_FOR_TABLE_HA("SELECT  " +
                "                     SUM(total_product) as total_product, " +
                "                     SUM(total_good_product) as total_good_product, " +
                "                     SUM(total_detective_product) AS total_defective_product, " +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product, " +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product, " +
                "                     model, " +
                "                     SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_product_cycle, " +
                "                     (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ? AND ref_machine = ?) AS leerun_cycle_time, " +
                "                     (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT._date = WA.product_date) AS working_time, " +
                "                     (SELECT SUM(duration) as break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN ? AND ? AND start_date BETWEEN ? AND ?) AS break_time, " +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_ha WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time, " +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_ha WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time, " +
                "                     product_date, " +
                "                     line_name, " +
                "                     machine_name  " +
                "                FROM workpiece_analysis_ha_30 WA  " +
                "                WHERE line_name = ? " +
                "                     AND machine_name = ?  " +
                "                     AND model LIKE ?  " +
                "                     AND product_date BETWEEN ? AND ?  " +
                "                     AND total_product != 0  " +
                "                GROUP BY product_date "+
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_FOR_TABLE_HD("SELECT  " +
                "                     SUM(total_product) as total_product, " +
                "                     SUM(total_good_product) as total_good_product, " +
                "                     SUM(total_detective_product) AS total_defective_product, " +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product, " +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product, " +
                "                     model, " +
                "                     SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_product_cycle, " +
                "                     (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ? AND ref_machine = ?) AS leerun_cycle_time, " +
                "                     (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT._date = WA.product_date) AS working_time, " +
                "                     (SELECT SUM(duration) as break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN ? AND ? AND start_date BETWEEN ? AND ?) AS break_time, " +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time, " +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time, " +
                "                     product_date, " +
                "                     line_name, " +
                "                     machine_name  " +
                "                FROM workpiece_analysis_hd_30 WA  " +
                "                WHERE line_name = ? " +
                "                     AND machine_name = ?  " +
                "                     AND model LIKE ?  " +
                "                     AND product_date BETWEEN ? AND ?  " +
                "                     AND total_product != 0  " +
                "                GROUP BY product_date "+
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_FOR_TABLE_HC("SELECT  " +
                "                     SUM(total_product) as total_product, " +
                "                     SUM(total_good_product) as total_good_product, " +
                "                     SUM(total_detective_product) AS total_defective_product, " +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product, " +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product, " +
                "                     model, " +
                "                     SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_product_cycle, " +
                "                     (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ? AND ref_machine = ?) AS leerun_cycle_time, " +
                "                     (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT._date = WA.product_date) AS working_time, " +
                "                     (SELECT SUM(duration) as break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN ? AND ? AND start_date BETWEEN ? AND ?) AS break_time, " +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hc WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time, " +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hc WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time, " +
                "                     product_date, " +
                "                     line_name, " +
                "                     machine_name  " +
                "                FROM workpiece_analysis_hc_30 WA  " +
                "                WHERE line_name = ? " +
                "                     AND machine_name = ?  " +
                "                     AND model LIKE ?  " +
                "                     AND product_date BETWEEN ? AND ?  " +
                "                     AND total_product != 0  " +
                "                GROUP BY product_date "+
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_FOR_TABLE_IB("SELECT  " +
                "                     SUM(total_product) as total_product, " +
                "                     SUM(total_good_product) as total_good_product, " +
                "                     SUM(total_detective_product) AS total_defective_product, " +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product, " +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product, " +
                "                     model, " +
                "                     SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_product_cycle, " +
                "                     (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ? AND ref_machine = ?) AS leerun_cycle_time, " +
                "                     (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT._date = WA.product_date) AS working_time, " +
                "                     (SELECT SUM(duration) as break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN ? AND ? AND start_date BETWEEN ? AND ?) AS break_time, " +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_ib WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time, " +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_ib WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time, " +
                "                     product_date, " +
                "                     line_name, " +
                "                     machine_name  " +
                "                FROM workpiece_analysis_ib_30 WA  " +
                "                WHERE line_name = ? " +
                "                     AND machine_name = ?  " +
                "                     AND model LIKE ?  " +
                "                     AND product_date BETWEEN ? AND ?  " +
                "                     AND total_product != 0  " +
                "                GROUP BY product_date "+
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_FOR_TABLE_HB("SELECT  " +
                "                     SUM(total_product) as total_product, " +
                "                     SUM(total_good_product) as total_good_product, " +
                "                     SUM(total_detective_product) AS total_defective_product, " +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product, " +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product, " +
                "                     model, " +
                "                     SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_product_cycle, " +
                "                     (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ? AND ref_machine = ?) AS leerun_cycle_time, " +
                "                     (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT._date = WA.product_date) AS working_time, " +
                "                     (SELECT SUM(duration) as break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN ? AND ? AND start_date BETWEEN ? AND ?) AS break_time, " +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hb WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time, " +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hb WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time, " +
                "                     product_date, " +
                "                     line_name, " +
                "                     machine_name  " +
                "                FROM workpiece_analysis_hb_30 WA  " +
                "                WHERE line_name = ? " +
                "                     AND machine_name = ?  " +
                "                     AND model LIKE ?  " +
                "                     AND product_date BETWEEN ? AND ?  " +
                "                     AND total_product != 0  " +
                "                GROUP BY product_date "+
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_FOR_TABLE_PD("SELECT  " +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     model,\n" +
                "                     SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_product_cycle, " +
                "                     (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ? AND ref_machine = ?) AS leerun_cycle_time,\n" +
                "                     (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT._date = WA.product_date) AS working_time,\n" +
                "                     (SELECT SUM(duration) as break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_pd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_pd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date,\n" +
                "                     line_name,\n" +
                "                     machine_name \n" +
                "                FROM workpiece_analysis_pd_30 WA \n" +
                "                WHERE line_name = ?\n" +
                "                     AND machine_name = ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date "+
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_ALL_FOR_GRAPH_HA("SELECT \n" +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_ha WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_ha WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date \n" +
                "                FROM workpiece_analysis_ha_30 WA \n" +
                "                WHERE line_name = ? \n" +
                "                     AND machine_name LIKE ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date"),
        FIND_ALL_FOR_GRAPH_HB("SELECT \n" +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hb WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hb WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date \n" +
                "                FROM workpiece_analysis_hb_30 WA \n" +
                "                WHERE line_name = ? \n" +
                "                     AND machine_name LIKE ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date"),
        FIND_ALL_FOR_GRAPH_HC("SELECT \n" +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hc WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hc WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date \n" +
                "                FROM workpiece_analysis_hc_30 WA \n" +
                "                WHERE line_name = ? \n" +
                "                     AND machine_name LIKE ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date"),
        FIND_ALL_FOR_GRAPH_HD("SELECT \n" +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date \n" +
                "                FROM workpiece_analysis_hd_30 WA \n" +
                "                WHERE line_name = ? \n" +
                "                     AND machine_name LIKE ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date"),
        FIND_ALL_FOR_GRAPH_IB("SELECT \n" +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_ib WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_ib WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date \n" +
                "                FROM workpiece_analysis_ib_30 WA \n" +
                "                WHERE line_name = ? \n" +
                "                     AND machine_name LIKE ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date"),
        FIND_ALL_FOR_GRAPH_PD("SELECT \n" +
                "                     SUM(total_product) as total_product,\n" +
                "                     SUM(total_good_product) as total_good_product,\n" +
                "                     SUM(total_detective_product) AS total_defective_product,\n" +
                "                     SUM(total_good_product)/SUM(total_product) AS percentage_good_product,\n" +
                "                     SUM(total_detective_product)/SUM(total_product) AS percentage_defective_product,\n" +
                "                     (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_pd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS running_time,\n" +
                "                     (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_pd WHERE line = ? AND machine = ? AND date = WA.product_date GROUP BY date) AS non_running_time,\n" +
                "                     product_date \n" +
                "                FROM workpiece_analysis_pd_30 WA \n" +
                "                WHERE line_name = ? \n" +
                "                     AND machine_name LIKE ? \n" +
                "                     AND model LIKE ? \n" +
                "                     AND product_date BETWEEN ? AND ? \n" +
                "                     AND total_product != 0 \n" +
                "                GROUP BY product_date"),
        FIND_ALL_PRODUCTION_BY_LINE_FOR_TABLE_IB("SELECT \n" +
                "                                SUM(total_product) AS total_product,\n" +
                "                                SUM(total_good_product) AS total_good_product,\n" +
                "                                sum(total_detective_product) AS total_defective_product,\n" +
                "                                total_detective_product/total_product AS percentage_defective_product,\n" +
                "                                model,\n" +
                "                                SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_process_cycle,\n" +
                "                                (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ?) AS leerun_cycle_time,\n" +
                "                                (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT.ref_product LIKE ? AND AWT._date BETWEEN ? AND ?) AS working_time,\n" +
                "                                (SELECT SUM(duration) AS break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN  ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                                (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_ib WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS running_time,\n" +
                "                                (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_ib WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS non_running_time,\n" +
                "                                line_name,\n" +
                "                                machine_name \n" +
                "                                FROM workpiece_analysis_ib_30 WA \n" +
                "                                WHERE line_name = ?\n" +
                "                                       AND model LIKE ?\n" +
                "                                       AND product_date BETWEEN ? AND ?\n" +
                "                                GROUP BY machine_name, model;"),
        FIND_ALL_PRODUCTION_BY_LINE_FOR_TABLE_HA("SELECT \n" +
                "                                SUM(total_product) AS total_product,\n" +
                "                                SUM(total_good_product) AS total_good_product,\n" +
                "                                sum(total_detective_product) AS total_defective_product,\n" +
                "                                total_detective_product/total_product AS percentage_defective_product,\n" +
                "                                model,\n" +
                "                                SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_process_cycle,\n" +
                "                                (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ?) AS leerun_cycle_time,\n" +
                "                                (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT.ref_product LIKE ? AND AWT._date BETWEEN ? AND ?) AS working_time,\n" +
                "                                (SELECT SUM(duration) AS break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN  ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                                (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_ha WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS running_time,\n" +
                "                                (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_ha WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS non_running_time,\n" +
                "                                line_name,\n" +
                "                                machine_name \n" +
                "                                FROM workpiece_analysis_ha_30 WA \n" +
                "                                WHERE line_name = ?\n" +
                "                                       AND model LIKE ?\n" +
                "                                       AND product_date BETWEEN ? AND ?\n" +
                "                                GROUP BY machine_name, model;"),
        FIND_ALL_PRODUCTION_BY_LINE_FOR_TABLE_HB("SELECT \n" +
                "                                SUM(total_product) AS total_product,\n" +
                "                                SUM(total_good_product) AS total_good_product,\n" +
                "                                sum(total_detective_product) AS total_defective_product,\n" +
                "                                total_detective_product/total_product AS percentage_defective_product,\n" +
                "                                model,\n" +
                "                                SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_process_cycle,\n" +
                "                                (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ?) AS leerun_cycle_time,\n" +
                "                                (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT.ref_product LIKE ? AND AWT._date BETWEEN ? AND ?) AS working_time,\n" +
                "                                (SELECT SUM(duration) AS break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN  ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                                (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hb WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS running_time,\n" +
                "                                (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hb WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS non_running_time,\n" +
                "                                line_name,\n" +
                "                                machine_name \n" +
                "                                FROM workpiece_analysis_hb_30 WA \n" +
                "                                WHERE line_name = ?\n" +
                "                                       AND model LIKE ?\n" +
                "                                       AND product_date BETWEEN ? AND ?\n" +
                "                                GROUP BY machine_name, model;"),
        FIND_ALL_PRODUCTION_BY_LINE_FOR_TABLE_HC("SELECT \n" +
                "                                SUM(total_product) AS total_product,\n" +
                "                                SUM(total_good_product) AS total_good_product,\n" +
                "                                sum(total_detective_product) AS total_defective_product,\n" +
                "                                total_detective_product/total_product AS percentage_defective_product,\n" +
                "                                model,\n" +
                "                                SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_process_cycle,\n" +
                "                                (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ?) AS leerun_cycle_time,\n" +
                "                                (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT.ref_product LIKE ? AND AWT._date BETWEEN ? AND ?) AS working_time,\n" +
                "                                (SELECT SUM(duration) AS break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN  ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                                (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hc WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS running_time,\n" +
                "                                (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hc WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS non_running_time,\n" +
                "                                line_name,\n" +
                "                                machine_name \n" +
                "                                FROM workpiece_analysis_hc_30 WA \n" +
                "                                WHERE line_name = ?\n" +
                "                                       AND model LIKE ?\n" +
                "                                       AND product_date BETWEEN ? AND ?\n" +
                "                                GROUP BY machine_name, model;"),
        FIND_ALL_PRODUCTION_BY_LINE_FOR_TABLE_HD("SELECT \n" +
                "                                SUM(total_product) AS total_product,\n" +
                "                                SUM(total_good_product) AS total_good_product,\n" +
                "                                sum(total_detective_product) AS total_defective_product,\n" +
                "                                total_detective_product/total_product AS percentage_defective_product,\n" +
                "                                model,\n" +
                "                                SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_process_cycle,\n" +
                "                                (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ?) AS leerun_cycle_time,\n" +
                "                                (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT.ref_product LIKE ? AND AWT._date BETWEEN ? AND ?) AS working_time,\n" +
                "                                (SELECT SUM(duration) AS break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN  ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                                (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_hd WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS running_time,\n" +
                "                                (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_hd WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS non_running_time,\n" +
                "                                line_name,\n" +
                "                                machine_name \n" +
                "                                FROM workpiece_analysis_hd_30 WA \n" +
                "                                WHERE line_name = ?\n" +
                "                                       AND model LIKE ?\n" +
                "                                       AND product_date BETWEEN ? AND ?\n" +
                "                                GROUP BY machine_name, model;"),
        FIND_ALL_PRODUCTION_BY_LINE_FOR_TABLE_PD("SELECT \n" +
                "                                SUM(total_product) AS total_product,\n" +
                "                                SUM(total_good_product) AS total_good_product,\n" +
                "                                sum(total_detective_product) AS total_defective_product,\n" +
                "                                total_detective_product/total_product AS percentage_defective_product,\n" +
                "                                model,\n" +
                "                                SUM(total_pure_cycle)/COUNT(freq_total_pure_cycle) AS avg_process_cycle,\n" +
                "                                (SELECT SUM(cycle_time)/COUNT(1) FROM cycle_times WHERE ref_line = ?) AS leerun_cycle_time,\n" +
                "                                (SELECT SUM(OT.duration) FROM assign_working_time AWT INNER JOIN operating_time OT ON AWT.ref_operating_time = OT.id WHERE AWT.ref_line = ? AND AWT.ref_product LIKE ? AND AWT._date BETWEEN ? AND ?) AS working_time,\n" +
                "                                (SELECT SUM(duration) AS break_time FROM operating_time OT  WHERE OT.action_type = '계획정지'  AND start_date BETWEEN  ? AND ? AND start_date BETWEEN ? AND ?) AS break_time,\n" +
                "                                (SELECT (SUM(activetime)+SUM(waitingtime))/60 FROM machine_state_analysis_pd WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS running_time,\n" +
                "                                (SELECT (SUM(stoptime)+SUM(manualtime))/60 FROM machine_state_analysis_pd WHERE line=? AND date BETWEEN  ? AND ? AND machine = WA.machine_name) AS non_running_time,\n" +
                "                                line_name,\n" +
                "                                machine_name \n" +
                "                                FROM workpiece_analysis_pd_30 WA \n" +
                "                                WHERE line_name = ?\n" +
                "                                       AND model LIKE ?\n" +
                "                                       AND product_date BETWEEN ? AND ?\n" +
                "                                GROUP BY machine_name, model;"),
        COUNT("SELECT COUNT(1) AS count " +
                "FROM workpiece_analysis WA " +
                "WHERE line_name = ? " +
                "     AND machine_name = ? " +
                "     AND model = ? " +
                "     AND product_date BETWEEN ? AND ? " +
                "GROUP BY product_date;");

        private String value;

        ProductStatusSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY CYCLE TIME
    public enum ProductFailSQL {
        FIND_ALL("SELECT *FROM product_fail WHERE fail_code LIKE ? OR fail_group LIKE ? OR fail_classification LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        FIND_ALL_FOR_SELECT_BOX("SELECT fail_code, fail_name FROM product_fail;"),
        COUNT("SELECT COUNT(1) FROM product_fail WHERE fail_code LIKE ? OR fail_group LIKE ? OR fail_classification LIKE ?;"),
        FIND_BY_ID("SELECT *FROM product_fail WHERE id = ?;"),
        ADD("INSERT INTO product_fail(fail_code, fail_group, fail_classification, fail_name) VALUES(?, ?, ?, ?)"),
        DELETE("DELETE FROM product_fail WHERE id = ?;"),
        UPDATE("UPDATE product_fail SET fail_code = ?, fail_group = ?, fail_classification = ?, fail_name = ? WHERE id = ?;");

        private String value;

        ProductFailSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR QUERY CYCLE TIME
    public enum StatisticSQL {
//        FIND_ALL_IB("SELECT \n" +
//                "\tli_ln AS line_name, \n" +
//                "\tLEFT(pi_pd,4) AS YEAR_PI_PD, \n" +
//                "\tMONTH(pi_pd) AS product_month, \n" +
//                "\tSUM(MAX_PI_DS) as total_product, \n" +
//                "\tSUM(MAX_PI_DSOK)  as good_product, \n" +
//                "\t(SUM(MAX_PI_DS) - SUM(MAX_PI_DSOK)) as defective_product\n" +
//                "FROM(\n" +
//                "\tSELECT li_ln, pi_pd, MAX(CAST(pi_ds AS INT)) AS MAX_PI_DS, MAX(CAST(pi_dsok AS INT)) AS MAX_PI_DSOK, mi_mn as machine_name\n" +
//                "\tFROM workpiece_ib\n" +
//                "\tGROUP BY pi_pd\n" +
//                ") AS A\n" +
//                "WHERE LEFT(pi_pd,4) = ?\n" +
//                "GROUP BY 1,2,3"),
        FIND_ALL_IB("SELECT \n" +
        "\tt.line_name,\n" +
        "\tt.YEAR_PI_PD,\n" +
        "\tt.product_month,\n" +
        "\tSUM(t.total_product) AS total_product,\n" +
        "\tSUM(t.good_product) AS good_product,\n" +
        "\tSUM(t.total_product) - SUM(t.good_product) AS defective_product\n" +
        "FROM\n" +
        "(\n" +
        "SELECT\n" +
        "\tref_line AS line_name,\n" +
        "\tLEFT(production_date,4) AS YEAR_PI_PD,\n" +
        "\tMONTH(production_date) AS product_month,\n" +
        "\tMAX(daily_seq) AS total_product,\n" +
        "\tMAX(daily_seq_ok) AS good_product,\n" +
        "\tMAX(daily_seq) - MAX(daily_seq_ok) as defective_product\n" +
        "FROM total_good_product_analysis_ib\n" +
        "WHERE LEFT(production_date,4) = ? AND MONTH(production_date) >= 9\n" +
        "GROUP BY production_date\n" +
        ") t\n" +
        "GROUP BY 1,2,3"),
//        FIND_ALL_HA("SELECT \n" +
//                "\tli_ln AS line_name, \n" +
//                "\tLEFT(pi_pd,4) AS YEAR_PI_PD, \n" +
//                "\tMONTH(pi_pd) AS product_month, \n" +
//                "\tSUM(MAX_PI_DS) as total_product, \n" +
//                "\tSUM(MAX_PI_DSOK)  as good_product, \n" +
//                "\t(SUM(MAX_PI_DS) - SUM(MAX_PI_DSOK)) as defective_product\n" +
//                "FROM(\n" +
//                "\tSELECT li_ln, pi_pd, MAX(CAST(pi_ds AS INT)) AS MAX_PI_DS, MAX(CAST(pi_dsok AS INT)) AS MAX_PI_DSOK, mi_mn as machine_name\n" +
//                "\tFROM workpiece_ha\n" +
//                "\tGROUP BY pi_pd\n" +
//                ") AS A\n" +
//                "WHERE LEFT(pi_pd,4) = ?\n" +
//                "GROUP BY 1,2,3"),
FIND_ALL_HA("SELECT \n" +
        "\tt.line_name,\n" +
        "\tt.YEAR_PI_PD,\n" +
        "\tt.product_month,\n" +
        "\tSUM(t.total_product) AS total_product,\n" +
        "\tSUM(t.good_product) AS good_product,\n" +
        "\tSUM(t.total_product) - SUM(t.good_product) AS defective_product\n" +
        "FROM\n" +
        "(\n" +
        "SELECT\n" +
        "\tref_line AS line_name,\n" +
        "\tLEFT(production_date,4) AS YEAR_PI_PD,\n" +
        "\tMONTH(production_date) AS product_month,\n" +
        "\tMAX(daily_seq) AS total_product,\n" +
        "\tMAX(daily_seq_ok) AS good_product,\n" +
        "\tMAX(daily_seq) - MAX(daily_seq_ok) as defective_product\n" +
        "FROM total_good_product_analysis_ha\n" +
        "WHERE LEFT(production_date,4) = ? AND MONTH(production_date) >= 9\n" +
        "GROUP BY production_date\n" +
        ") t\n" +
        "GROUP BY 1,2,3"),
//        FIND_ALL_HB("SELECT \n" +
//                "\tli_ln AS line_name, \n" +
//                "\tLEFT(pi_pd,4) AS YEAR_PI_PD, \n" +
//                "\tMONTH(pi_pd) AS product_month, \n" +
//                "\tSUM(MAX_PI_DS) as total_product, \n" +
//                "\tSUM(MAX_PI_DSOK)  as good_product, \n" +
//                "\t(SUM(MAX_PI_DS) - SUM(MAX_PI_DSOK)) as defective_product\n" +
//                "FROM(\n" +
//                "\tSELECT li_ln, pi_pd, MAX(CAST(pi_ds AS INT)) AS MAX_PI_DS, MAX(CAST(pi_dsok AS INT)) AS MAX_PI_DSOK, mi_mn as machine_name\n" +
//                "\tFROM workpiece_hb\n" +
//                "\tGROUP BY pi_pd\n" +
//                ") AS A\n" +
//                "WHERE LEFT(pi_pd,4) = ?\n" +
//                "GROUP BY 1,2,3"),
FIND_ALL_HB("SELECT \n" +
        "\tt.line_name,\n" +
        "\tt.YEAR_PI_PD,\n" +
        "\tt.product_month,\n" +
        "\tSUM(t.total_product) AS total_product,\n" +
        "\tSUM(t.good_product) AS good_product,\n" +
        "\tSUM(t.total_product) - SUM(t.good_product) AS defective_product\n" +
        "FROM\n" +
        "(\n" +
        "SELECT\n" +
        "\tref_line AS line_name,\n" +
        "\tLEFT(production_date,4) AS YEAR_PI_PD,\n" +
        "\tMONTH(production_date) AS product_month,\n" +
        "\tMAX(daily_seq) AS total_product,\n" +
        "\tMAX(daily_seq_ok) AS good_product,\n" +
        "\tMAX(daily_seq) - MAX(daily_seq_ok) as defective_product\n" +
        "FROM total_good_product_analysis_hb\n" +
        "WHERE LEFT(production_date,4) = ? AND MONTH(production_date) >= 9\n" +
        "GROUP BY production_date\n" +
        ") t\n" +
        "GROUP BY 1,2,3"),
//        FIND_ALL_HC("SELECT \n" +
//                "\tli_ln AS line_name, \n" +
//                "\tLEFT(pi_pd,4) AS YEAR_PI_PD, \n" +
//                "\tMONTH(pi_pd) AS product_month, \n" +
//                "\tSUM(MAX_PI_DS) as total_product, \n" +
//                "\tSUM(MAX_PI_DSOK)  as good_product, \n" +
//                "\t(SUM(MAX_PI_DS) - SUM(MAX_PI_DSOK)) as defective_product\n" +
//                "FROM(\n" +
//                "\tSELECT li_ln, pi_pd, MAX(CAST(pi_ds AS INT)) AS MAX_PI_DS, MAX(CAST(pi_dsok AS INT)) AS MAX_PI_DSOK, mi_mn as machine_name\n" +
//                "\tFROM workpiece_hc\n" +
//                "\tGROUP BY pi_pd\n" +
//                ") AS A\n" +
//                "WHERE LEFT(pi_pd,4) = ?\n" +
//                "GROUP BY 1,2,3"),
FIND_ALL_HC("SELECT \n" +
        "\tt.line_name,\n" +
        "\tt.YEAR_PI_PD,\n" +
        "\tt.product_month,\n" +
        "\tSUM(t.total_product) AS total_product,\n" +
        "\tSUM(t.good_product) AS good_product,\n" +
        "\tSUM(t.total_product) - SUM(t.good_product) AS defective_product\n" +
        "FROM\n" +
        "(\n" +
        "SELECT\n" +
        "\tref_line AS line_name,\n" +
        "\tLEFT(production_date,4) AS YEAR_PI_PD,\n" +
        "\tMONTH(production_date) AS product_month,\n" +
        "\tMAX(daily_seq) AS total_product,\n" +
        "\tMAX(daily_seq_ok) AS good_product,\n" +
        "\tMAX(daily_seq) - MAX(daily_seq_ok) as defective_product\n" +
        "FROM total_good_product_analysis_hc\n" +
        "WHERE LEFT(production_date,4) = ? AND MONTH(production_date) >= 9\n" +
        "GROUP BY production_date\n" +
        ") t\n" +
        "GROUP BY 1,2,3"),
//        FIND_ALL_HD("SELECT \n" +
//                "\tli_ln AS line_name, \n" +
//                "\tLEFT(pi_pd,4) AS YEAR_PI_PD, \n" +
//                "\tMONTH(pi_pd) AS product_month, \n" +
//                "\tSUM(MAX_PI_DS) as total_product, \n" +
//                "\tSUM(MAX_PI_DSOK)  as good_product, \n" +
//                "\t(SUM(MAX_PI_DS) - SUM(MAX_PI_DSOK)) as defective_product\n" +
//                "FROM(\n" +
//                "\tSELECT li_ln, pi_pd, MAX(CAST(pi_ds AS INT)) AS MAX_PI_DS, MAX(CAST(pi_dsok AS INT)) AS MAX_PI_DSOK, mi_mn as machine_name\n" +
//                "\tFROM workpiece_hd\n" +
//                "\tGROUP BY pi_pd\n" +
//                ") AS A\n" +
//                "WHERE LEFT(pi_pd,4) = ?\n" +
//                "GROUP BY 1,2,3"),
FIND_ALL_HD("SELECT \n" +
        "\tt.line_name,\n" +
        "\tt.YEAR_PI_PD,\n" +
        "\tt.product_month,\n" +
        "\tSUM(t.total_product) AS total_product,\n" +
        "\tSUM(t.good_product) AS good_product,\n" +
        "\tSUM(t.total_product) - SUM(t.good_product) AS defective_product\n" +
        "FROM\n" +
        "(\n" +
        "SELECT\n" +
        "\tref_line AS line_name,\n" +
        "\tLEFT(production_date,4) AS YEAR_PI_PD,\n" +
        "\tMONTH(production_date) AS product_month,\n" +
        "\tMAX(daily_seq) AS total_product,\n" +
        "\tMAX(daily_seq_ok) AS good_product,\n" +
        "\tMAX(daily_seq) - MAX(daily_seq_ok) as defective_product\n" +
        "FROM total_good_product_analysis_hd\n" +
        "WHERE LEFT(production_date,4) = ? AND MONTH(production_date) >= 9\n" +
        "GROUP BY production_date\n" +
        ") t\n" +
        "GROUP BY 1,2,3"),
//        FIND_ALL_PD("SELECT \n" +
//                "\tli_ln AS line_name, \n" +
//                "\tLEFT(pi_pd,4) AS YEAR_PI_PD, \n" +
//                "\tMONTH(pi_pd) AS product_month, \n" +
//                "\tSUM(MAX_PI_DS) as total_product, \n" +
//                "\tSUM(MAX_PI_DSOK)  as good_product, \n" +
//                "\t(SUM(MAX_PI_DS) - SUM(MAX_PI_DSOK)) as defective_product\n" +
//                "FROM(\n" +
//                "\tSELECT li_ln, pi_pd, MAX(CAST(pi_ds AS INT)) AS MAX_PI_DS, MAX(CAST(pi_dsok AS INT)) AS MAX_PI_DSOK, mi_mn as machine_name\n" +
//                "\tFROM workpiece_pd\n" +
//                "\tGROUP BY pi_pd\n" +
//                ") AS A\n" +
//                "WHERE LEFT(pi_pd,4) = ?\n" +
//                "GROUP BY 1,2,3");
FIND_ALL_PD("SELECT \n" +
        "\tt.line_name,\n" +
        "\tt.YEAR_PI_PD,\n" +
        "\tt.product_month,\n" +
        "\tSUM(t.total_product) AS total_product,\n" +
        "\tSUM(t.good_product) AS good_product,\n" +
        "\tSUM(t.total_product) - SUM(t.good_product) AS defective_product\n" +
        "FROM\n" +
        "(\n" +
        "SELECT\n" +
        "\tref_line AS line_name,\n" +
        "\tLEFT(production_date,4) AS YEAR_PI_PD,\n" +
        "\tMONTH(production_date) AS product_month,\n" +
        "\tMAX(daily_seq) AS total_product,\n" +
        "\tMAX(daily_seq_ok) AS good_product,\n" +
        "\tMAX(daily_seq) - MAX(daily_seq_ok) as defective_product\n" +
        "FROM total_good_product_analysis_pd\n" +
        "WHERE LEFT(production_date,4) = ? AND MONTH(production_date) >= 9\n" +
        "GROUP BY production_date\n" +
        ") t\n" +
        "GROUP BY 1,2,3");
        /*
        FIND_ALL_IB("SELECT line_name, " +
                "        SUM(total_product) AS total_product, " +
                "        SUM(total_good_product) AS good_product, " +
                "        SUM(total_detective_product) AS defective_product, " +
                "        EXTRACT(MONTH FROM product_date) AS product_month " +
                "FROM workpiece_analysis_ib_30 " +
                "WHERE product_date BETWEEN ? AND ? AND machine_name='IB_Runout'" +
                "GROUP BY EXTRACT(MONTH FROM product_date), line_name;"),
        FIND_ALL_HA("SELECT line_name, " +
                "        SUM(total_product) AS total_product, " +
                "        SUM(total_good_product) AS good_product, " +
                "        SUM(total_detective_product) AS defective_product, " +
                "        EXTRACT(MONTH FROM product_date) AS product_month " +
                "FROM workpiece_analysis_ha_30 " +
                "WHERE product_date BETWEEN ? AND ? AND machine_name='HA_Runout'" +
                "GROUP BY EXTRACT(MONTH FROM product_date), line_name;"),
        FIND_ALL_HB("SELECT line_name, " +
                "        SUM(total_product) AS total_product, " +
                "        SUM(total_good_product) AS good_product, " +
                "        SUM(total_detective_product) AS defective_product, " +
                "        EXTRACT(MONTH FROM product_date) AS product_month " +
                "FROM workpiece_analysis_hb_30 " +
                "WHERE product_date BETWEEN ? AND ? AND machine_name='HB_Tmarker'" +
                "GROUP BY EXTRACT(MONTH FROM product_date), line_name;"),
        FIND_ALL_HC("SELECT line_name, " +
                "        SUM(total_product) AS total_product, " +
                "        SUM(total_good_product) AS good_product, " +
                "        SUM(total_detective_product) AS defective_product, " +
                "        EXTRACT(MONTH FROM product_date) AS product_month " +
                "FROM workpiece_analysis_hc_30 " +
                "WHERE product_date BETWEEN ? AND ? AND machine_name='HC_TP'" +
                "GROUP BY EXTRACT(MONTH FROM product_date), line_name;"),
        FIND_ALL_HD("SELECT line_name, " +
                "        SUM(total_product) AS total_product, " +
                "        SUM(total_good_product) AS good_product, " +
                "        SUM(total_detective_product) AS defective_product, " +
                "        EXTRACT(MONTH FROM product_date) AS product_month " +
                "FROM workpiece_analysis_hd_30 " +
                "WHERE product_date BETWEEN ? AND ? AND machine_name='HD_Runout'" +
                "GROUP BY EXTRACT(MONTH FROM product_date), line_name;"),
        FIND_ALL_PD("SELECT line_name, " +
                "        SUM(total_product) AS total_product, " +
                "        SUM(total_good_product) AS good_product, " +
                "        SUM(total_detective_product) AS defective_product, " +
                "        EXTRACT(MONTH FROM product_date) AS product_month " +
                "FROM workpiece_analysis_pd_30 " +
                "WHERE product_date BETWEEN ? AND ? AND machine_name='PD_Pnt'" +
                "GROUP BY EXTRACT(MONTH FROM product_date), line_name;");
        */
        private String value;

        StatisticSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum NGProductSQL {
        FIND_ALL("SELECT * " +
                "FROM fukoku_v2.ng_product_analysis " +
                "WHERE ref_line LIKE ? " +
                "      AND ref_machine LIKE ? " +
                "      AND status LIKE ? " +
                "      AND production_date LIKE ? " +
                "ORDER BY id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        FIND_BY_ID("SELECT * FROM fukoku_v2.ng_product_analysis WHERE id = ?;"),
        COUNT("SELECT COUNT(1) " +
                "FROM fukoku_v2.ng_product_analysis " +
                "WHERE ref_line LIKE ? " +
                "       AND ref_machine LIKE ? " +
                "       AND status LIKE ? " +
                "       AND production_date LIKE ?;"),
        COUNT_NG_IN_LINE("SELECT ln.name _name,(SELECT COUNT(1) FROM fukoku_v2.ng_product_analysis WHERE ref_line = ln.name AND status = 1 AND production_date LIKE ?) AS counting FROM line ln"),
        COUNT_NG_IN_MACHINE("SELECT m.acronym mapping_name, " +
                            "       (SELECT COUNT(1) FROM fukoku_v2.ng_product_analysis WHERE ref_machine = m.acronym AND status = 1 AND production_date LIKE ?) AS counting " +
                            "FROM machine m " +
                            "WHERE SUBSTR(m.acronym,1,2) = ?"),
        UPDATE_STATUS("UPDATE fukoku_v2.ng_product_analysis SET status = 0 WHERE id = ?;"),
        ADD("INSERT INTO fukoku_v2.ng_product_analysis(ref_line, ref_machine, mstate, ref_product, start_time, end_time, production_date, quality, product_cycle, status) VALUES(?,?,?,?,?,?,?,'NG',0,1);");
        private String value;

        NGProductSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum IssueSQL {
        FIND_ALL("SELECT *FROM issues " +
                "ORDER BY id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        COUNT("SELECT COUNT(1) " +
                "FROM issues;"),
        FIND_BY_ID("SELECT *FROM issues WHERE id = ?;"),
        ADD("INSERT INTO issues(title, content, created_date, reporter, status) VALUES(?, ?, ?, ?, ?)"),
        DELETE("DELETE FROM issues WHERE id = ?;"),
        UPDATE("UPDATE issues SET title = ?, content = ?, reporter = ? WHERE id = ?;"),
        UPDATE_STATUS("UPDATE issues SET status = ? WHERE id = ?;");
        private String value;

        IssueSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum ReplyIssueSQL {
        FIND_ALL("SELECT *FROM reply_issues WHERE ref_issue = ? ORDER BY id DESC;"),
        ADD("INSERT INTO reply_issues(content, created_date, reply_user, ref_issue) VALUES(?, ?, ?, ?)"),
        DELETE("DELETE FROM reply_issues WHERE id = ?;");
        private String value;

        ReplyIssueSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum NonActiveStateSQL {
        FIND_ALL("SELECT * FROM fukoku_v2.non_active_state_analysis " +
                "WHERE ref_line LIKE ? " +
                "      AND ref_machine LIKE ? " +
                "      AND work_date LIKE ? " +
                "ORDER BY id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        COUNT("SELECT COUNT(1) " +
                "FROM fukoku_v2.non_active_state_analysis " +
                "WHERE ref_line LIKE ? " +
                "      AND ref_machine LIKE ? " +
                "      AND work_date LIKE ?;"),
        COUNT_NUMBER_BY_LINE("SELECT name _name, (SELECT COUNT(1) FROM fukoku_v2.non_active_state_analysis WHERE ref_line = _name AND work_date LIKE ?) AS counting FROM line"),
//        COUNT_NUMBER_BY_MACHINE("SELECT mapping_name, (SELECT COUNT(1) FROM fukoku_v2.non_active_state_analysis WHERE ref_machine = LMD.mapping_name AND work_date LIKE ?) AS counting " +
//                                "FROM lines_machines_detail LMD " +
//                                "WHERE SUBSTR(mapping_name,1,2) = ?;"),
        COUNT_NUMBER_BY_MACHINE("SELECT acronym mapping_name, (SELECT COUNT(1) FROM fukoku_v2.non_active_state_analysis WHERE ref_machine = LMD.acronym AND work_date LIKE ?) AS counting " +
                "FROM machine LMD " +
                "WHERE SUBSTR(acronym,1,2) = ?;"),
        ADD("INSERT INTO fukoku_v2.non_active_state_analysis(ref_line, ref_machine, ref_product, mstate, work_date, start_time, end_time, duration, alarm_code, alarm_name, department) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"),
        FIND_FREQ("select ref_line, ref_machine, alarm_code, count(alarm_code) counting , alarm_name\n" +
                "                from fukoku_v2.non_active_state_analysis \n" +
                "                where ref_line LIKE ? and work_date between ? and ?\n" +
                "                group by alarm_code" +
                "                order by  count(alarm_code) desc  " +
                "                limit ?   "),
        FIND_MS_FREQ("select ref_line, ref_machine, SUBSTRING_INDEX(SUBSTRING_INDEX(mstate, '_', 3), '_', -1) as mstate, count(alarm_code) counting\n" +
                "                from fukoku_v2.non_active_state_analysis \n" +
                "                where ref_line LIKE ? and work_date between ? and ? and (alarm_code = '' || alarm_code IS NULL)\n" +
                "                group by SUBSTRING_INDEX(SUBSTRING_INDEX(mstate, '_', 3), '_', -1)" +
                "                order by count(alarm_code) " +
                "                limit ? "),


        COUNT_BY_MSTATE_ID("SELECT COUNT(1) FROM fukoku_v2.non_active_state_analysis WHERE mstate = ? AND IFNULL(alarm_code,'')=''; "),
        UPDATE_ENDTIME_DURATION("UPDATE fukoku_v2.non_active_state_analysis SET end_time = ?, duration = ? WHERE IFNULL(alarm_code,'') = '' AND mstate = ?;");
        private String value;

        NonActiveStateSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }


    public enum DefectiveProductListSQL {
        FIND_ALL("SELECT * FROM fukoku_v2.VIEW_DEFECTIVE_PRODUCT_V2 " +
                "WHERE line LIKE ? " +
                "      AND mapping_name LIKE ? " +
                "      AND date LIKE ? " +
                "ORDER BY id  " +
                "LIMIT ? " +
                "OFFSET ?;"),
        COUNT("SELECT COUNT(1) " +
                "FROM fukoku_v2.VIEW_DEFECTIVE_PRODUCT_V2 " +
                "WHERE line LIKE ? " +
                "      AND mapping_name LIKE ? " +
                "      AND date LIKE ?;"),
        COUNT_NUMBER_BY_LINE("SELECT d.line _name, count(1) counting\n" +
                "FROM fukoku_v2.VIEW_DEFECTIVE_PRODUCT_V2 d\n" +
                "LEFT JOIN line ln\n" +
                "ON d.line = ln.name\n" +
                "WHERE date LIKE ?\n" +
                "GROUP BY d.line "),
        //        COUNT_NUMBER_BY_MACHINE("SELECT mapping_name, (SELECT COUNT(1) FROM fukoku_v2.non_active_state_analysis WHERE ref_machine = LMD.mapping_name AND work_date LIKE ?) AS counting " +
//                                "FROM lines_machines_detail LMD " +
//                                "WHERE SUBSTR(mapping_name,1,2) = ?;"),
        COUNT_NUMBER_BY_MACHINE("SELECT d.mapping_name, count(1) counting\n" +
                "FROM fukoku_v2.VIEW_DEFECTIVE_PRODUCT_V2 d\n" +
                "LEFT JOIN machine m\n" +
                "ON d.mapping_name = m.acronym\n" +
                "WHERE date LIKE ?\n" +
                "AND d.line = ?\n" +
                "GROUP BY d.mapping_name");

        private String value;

        DefectiveProductListSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum AlarmHistorySQL {
        FIND_ALL("SELECT * FROM fukoku_v2.alarm_histories WHERE ref_line LIKE ? AND ref_machine LIKE ? AND work_date LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        COUNT("SELECT COUNT(1) FROM fukoku_v2.alarm_histories WHERE ref_line LIKE ? AND ref_machine LIKE ? AND work_date LIKE ?;"),
        COUNT_NUMBER_BY_LINE("SELECT name _name, (SELECT COUNT(1) FROM fukoku_v2.alarm_histories WHERE ref_line = L.name AND work_date LIKE ?) AS counting FROM line L"),
        COUNT_NUMBER_BY_MACHINE("SELECT acronym mapping_name, (SELECT COUNT(1) FROM fukoku_v2.alarm_histories WHERE ref_machine = LMD.acronym AND work_date LIKE ?) AS counting FROM machine LMD WHERE LEFT(acronym, 2) = ?;"),
        ADD("INSERT INTO fukoku_v2.alarm_histories(ref_line, ref_machine, ref_product, machine_state, work_date, start_time, end_time, duration, alarm_code, alarm_name, alarm_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"),
        MONTHLY_SUM("CALL fukoku_v2.proc_alarm_by_month(?); "),
        MONTHLY_SUM_BY_LINE("CALL fukoku_v2.proc_alarm_by_month_line(?,?); "),
        MONTHLY_SUM_BY_MACHINE("CALL fukoku_v2.proc_alarm_by_month_machine(?,?); "),
        MONTHLY_SUM_BY_LINE_MACHINE("CALL fukoku_v2.proc_alarm_by_month_line_machine(?,?,?); "),
        ALARM_FREQ("select ref_machine, alarm_code, alarm_name, count(alarm_code) counting\n" +
                "from fukoku_v2.alarm_histories \n" +
                "where ref_line LIKE ? and work_date between ? and ?\n" +
                "group by alarm_code;"),
        COUNT_ALARM_BY_ID("SELECT COUNT(1) FROM fukoku_v2.alarm_histories WHERE alarm_id = ?"),
        UPDATE_TIME("UPDATE fukoku_v2.alarm_histories SET end_time = ?, duration = ? WHERE alarm_id = ?");

        private String value;

        AlarmHistorySQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum TopErrorSQL {
        FIND_ALL("SELECT E.id, E._code, E._name, E.remark, D._name AS department FROM error E INNER JOIN department_product_categories D ON E.ref_department = D.id " +
                "WHERE D._name LIKE ? " +
                "ORDER BY E.id DESC " +
                "LIMIT ? " +
                "OFFSET ?;"),
        COUNT("SELECT COUNT(1) FROM error E INNER JOIN department_product_categories D ON E.ref_department = D.id " +
                "WHERE D._name LIKE ?;"),
        FIND_BY_ID("SELECT *FROM error WHERE id = ?;"),
        ADD("INSERT INTO error(_code, _name, remark, ref_department) VALUES(?, ?, ?, ?);"),
        UPDATE("UPDATE error SET _code = ?, _name = ?, remark = ?, ref_department = ? WHERE id = ?;"),
        DELETE("DELETE FROM error WHERE id = ?;");
        private String value;

        TopErrorSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum TransferredTransactionSQL {

//        OLD QUERY
//        FIND_ALL("SELECT ATT.*, TD.item, TD.sub_item, TD.error, TD.treatment, TD.department FROM alarm_transfer_transaction ATT " +
//                "INNER JOIN transaction_detail TD ON ATT.id = TD.ref_transaction " +
//                "WHERE ATT.ref_line LIKE ? AND ATT.ref_machine LIKE ? AND ATT.status = ? " +
//                "GROUP BY ATT.id " +
//                "ORDER BY ATT.id DESC " +
//                "LIMIT ? " +
//                "OFFSET ?;"),

        // show earliest of start_time from transaction_detial
        FIND_ALL(" SELECT " +
                " ATT.id, " +
                " ATT.ref_line, " +
                " ATT.ref_machine, " +
                " MIN(TD.start_time) start_time, " +
                " ATT.status, " +
                " ATT.end_time," +
                " ATT.finished_time," +
                " TD.item, TD.sub_item, TD.error, TD.treatment, TD.department FROM alarm_transfer_transaction ATT " +
                " INNER JOIN transaction_detail TD ON ATT.id = TD.ref_transaction " +
                " WHERE ATT.ref_line LIKE ? AND ATT.ref_machine LIKE ? AND ATT.status = ? " +
                " GROUP BY ATT.id " +
                " ORDER BY ATT.id DESC " +
                " LIMIT ? " +
                " OFFSET ?;"),

//        NEW QUERY WITH NEW REQUIREMENT
//        FIND_ALL_WITH_FAULT(" SELECT ATT.*, FS.item, FS.sub_item, FS.error, FS.treatment, FS.department " +
//        " , ROW_NUMBER() OVER(PARTITION BY ATT.id ORDER BY ATT.start_time DESC) row_num " +
//        " , DENSE_RANK() OVER(ORDER BY ATT.id DESC) order_num " +
//        " FROM alarm_transfer_transaction ATT "+
//        " INNER JOIN transaction_detail TD ON ATT.id = TD.ref_transaction " +
//        " INNER JOIN fault_state_savelist FS ON ATT.id = FS.transfer_id " +
//
//                " WHERE ATT.ref_line LIKE ? AND ATT.ref_machine LIKE ? AND ATT.status = ? " +
////                " GROUP BY ATT.id " +
//                " ORDER BY ATT.id DESC, ATT.start_time " +
//                " LIMIT ? " +
//                " OFFSET ?;"),

        FIND_ALL_WITH_FAULT(" SELECT " +
                " ATT.id," +
                " ATT.ref_line, " +
                " ATT.ref_machine, " +
                " LEFT(TD.start_time,19) start_time, " +
                " ATT.status, " +
                " ATT.end_time, " +
                " LEFT(ATT.finished_time,19) finished_time, " +
                " CONCAT( " +
                " TIMESTAMPDIFF(MINUTE, LEFT(TD.start_time,19), LEFT( ATT.finished_time,19)) , ':', " +
                " MOD( TIMESTAMPDIFF(SECOND, LEFT(TD.start_time,19), LEFT( ATT.finished_time,19)), 60) " +
                " ) AS duration, " +
                " FS.item, FS.sub_item, FS.error, FS.treatment, FS.department " +
                " , ROW_NUMBER() OVER(PARTITION BY ATT.id ORDER BY ATT.start_time DESC) row_num " +
                " , DENSE_RANK() OVER(ORDER BY ATT.id DESC) order_num " +
                " FROM alarm_transfer_transaction ATT "+
                " INNER JOIN transaction_detail TD ON ATT.id = TD.ref_transaction " +
                " INNER JOIN fault_state_savelist FS ON ATT.id = FS.transfer_id " +

                " WHERE ATT.ref_line LIKE ? AND ATT.ref_machine LIKE ? AND ATT.status = ? " +
                " GROUP BY ATT.id, ATT.ref_line, ATT.ref_machine, FS.item, FS.sub_item, FS.error, FS.treatment "+
                " ORDER BY ATT.id DESC, ATT.start_time " +
                " LIMIT ? " +
                " OFFSET ?;"),


        FIND_ALL_WITH_FAULT_SORT("SELECT id, ref_line, ref_machine, start_time, status, end_time, finished_time, "+
                " duration, item, sub_item, error, treatment, department, row_num, order_num " +
                " FROM view_transfer_history_sort " +
                " WHERE ref_line LIKE ? AND ref_machine LIKE ? AND status = ? " +
                " GROUP BY id, ref_line, ref_machine, item, sub_item, error, treatment " ),
//                " ORDER BY id DESC, start_time " +
//                " LIMIT ? " +
//                " OFFSET ?;"),


        COUNT("SELECT COUNT(1) FROM alarm_transfer_transaction WHERE ref_line LIKE ? AND ref_machine LIKE ? AND status = ?;"),
//        COUNT_ALARM_LINE("SELECT _name, " +
//                                "(SELECT COUNT(1) " +
//                                "FROM alarm_transfer_transaction ATT " +
//                        "WHERE ATT.ref_line = _name AND ATT.status = ?) AS counting " +
//                        "FROM _lines;"),
        COUNT_ALARM_LINE("SELECT _name, " +
                "(SELECT COUNT(1) " +
                "FROM view_transfer_history_sort ATT " +
                "WHERE ATT.ref_line = _name AND ATT.status = ?) AS counting " +
                "FROM _lines;"),
        COUNT_ALARM_MACHINE("SELECT mapping_name, " +
                "           (SELECT COUNT(1) FROM alarm_transfer_transaction WHERE ref_line = ? AND ref_machine = mapping_name AND status = ?) AS counting " +
                "FROM lines_machines_detail " +
                "WHERE SUBSTR(mapping_name,1,2) = ?;"),
        ADD("INSERT INTO alarm_transfer_transaction(ref_line, ref_machine, start_time, status) VALUES(?, ?, ?, 1);"),
        UPDATE("UPDATE alarm_transfer_transaction SET end_time = NOW(3), finished_time = ?, status = 0 WHERE id = ?;");
        private String value;

        TransferredTransactionSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }


    public enum TransactionDetailSQL {
//        Old query
        FIND_BY_TRANSACTION("SELECT * FROM transaction_detail WHERE ref_transaction = ?;"),

        FIND_BY_TRANSACTION_FOR_INSERT_TO_FAULT("SELECT\n" +
                "\tid,\n" +
                "\tref_line,\n" +
                "\tref_machine,\n" +
                "\tstate,\n" +
                "\tstart_time,\n" +
                "\tend_time,\n" +
                "\talarm_code,\n" +
                "\talarm_name,\n" +
                "\tref_transaction,\n" +
                "\tSTATUS,\n" +
                "\titem,\n" +
                "\tsub_item,\n" +
                "\terror,\n" +
                "\ttreatment,\n" +
                "\tref_product,\n" +
                "\tproduction_date,\n" +
                "\tdepartment \n" +
                "FROM\ttransaction_detail \n" +
                "WHERE\tref_transaction = ? \n" +
                "ORDER BY start_time \n" +
                "LIMIT 1;\n"),

//        New query
        FIND_BY_TRANSACTION_HISTORY("SELECT" +
                " TD.id, TD.ref_line , TD.ref_machine , TD.state , " +
                " TD.start_time , TD.end_time , TD.alarm_code , TD.alarm_name , " +
                " TD.ref_transaction , TD.status , FS.item , FS.sub_item , FS.error , " +
                " FS.treatment , TD.ref_product , TD.production_date , TD.department " +
                " FROM transaction_detail TD " +
                " LEFT JOIN fault_state_savelist FS " +
                " ON TD.ref_transaction = FS.transfer_id " +
                " WHERE TD.ref_transaction = ?; "),
        FIND_TRANSACTION_DETAIL_BY_ID("SELECT * FROM transaction_detail WHERE id = ?;"),
        ADD("INSERT INTO transaction_detail(ref_line, ref_machine, " +
                " state, start_time, end_time, " +
                "alarm_code, alarm_name, ref_transaction, " +
                "status, ref_product, production_date, department) VALUES(?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)"),
        UPDATE("UPDATE transaction_detail SET item = ?, sub_item = ?, error = ?, treatment = ?, status = 0 WHERE ref_transaction = ?"),
        UPDATE_STATUS("UPDATE transaction_detail SET status = 0 WHERE id = ?"),
        DELETE("DELETE FROM transaction_detail WHERE id = ?;");

        private String value;

        TransactionDetailSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum ImageSQL {
        FIND_BY_TRAN_ID("SELECT *FROM images WHERE tran_his_id = ?;"),
        ADD("INSERT INTO images(url, remark, tran_id, department, created_date, tran_his_id) VALUES(?, ?, ?, ?, NOW(), ?)");
        private String value;

        ImageSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum AlarmCodeSQL {
        FIND_ALL("SELECT *FROM alarm_code WHERE ref_line LIKE ? AND ref_machine LIKE ? LIMIT ? OFFSET ?;"),
        FIND_BY_ID("SELECT *FROM alarm_code WHERE id = ?;"),
        COUNT("SELECT COUNT(1) FROM alarm_code WHERE ref_line LIKE ? AND ref_machine LIKE ?;"),
        ADD("INSERT INTO alarm_code(ref_line, ref_machine, start_date, end_date, alarm_code, alarm_name) VALUES(?,?,?,?,?,?);"),
        UPDATE("UPDATE alarm_code SET ref_line = ?, ref_machine = ?, start_date = ?, end_date = ?, alarm_code = ?, alarm_name = ? WHERE id = ?;"),
        DELETE("DELETE FROM alarm_code WHERE id = ?;");
        private String value;

        AlarmCodeSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum FaultMachineMonitor{
        FIND_FAULT_DATA_BY_YEAR("SELECT REF_LINE, sum(DURATION) as duration, END_TIME, ALARM_CODE, ALARM_NAME, department, MONTH(END_TIME) as monthly FROM fukoku_v2.fault_state_analysis WHERE END_TIME LIKE ? AND DEPARTMENT <> 'ALARM_AUTO_DELETED' GROUP BY  monthly, ref_line;"),
        FIND_FAULT_REAL_OPERATION_TIME_BY_YEAR("select line, (sum(operating_time) - sum(plan_stop_time)) duration, Month(store_date) monthly from dashboard_analysis where store_date like ? GROUP BY line, monthly;"),
        FIND_FAULT_DATA_BY_LINE("SELECT f.REF_LINE, f.ref_machine,m.display_name, sum(f.DURATION) as duration, f.END_TIME, f.ALARM_CODE, f.ALARM_NAME, f.department, MONTH(f.END_TIME) as monthly FROM fault_state_analysis f, lines_machines_detail m WHERE f.END_TIME LIKE ? AND f.ref_line = ? AND f.DEPARTMENT <> 'ALARM_AUTO_DELETED' AND f.ref_machine = m.mapping_name GROUP BY  monthly, f.ref_line,f.ref_machine;"),
        FIND_FAULT_REAL_OPERATION_TIME_BY_LINE("select d.line, d.machine_name,m.display_name, (sum(d.operating_time) - sum(d.plan_stop_time)) duration, d.store_date , Month(d.store_date) monthly from dashboard_analysis d, lines_machines_detail m where d.store_date like ? AND d.line=? AND d.machine_name = m.mapping_name GROUP BY monthly, d.line, d.machine_name;"),
        FINE_FAULT_DATA_BY_MACHINE("SELECT f.REF_LINE, f.ref_machine,m.display_name, sum(f.DURATION) as duration, f.END_TIME, f.ALARM_CODE, f.ALARM_NAME, f.department, MONTH(f.END_TIME) as monthly FROM fukoku_v2.fault_state_analysis f, lines_machines_detail m WHERE f.END_TIME LIKE ? AND f.ref_machine like ? AND f.DEPARTMENT <> 'ALARM_AUTO_DELETED' AND f.ref_machine = m.mapping_name GROUP BY  monthly, f.ref_line,f.ref_machine;"),
        FINE_FAULT_REAL_OPERATION_TIME_BY_MACHINE("select d.line, d.machine_name,m.display_name, (sum(d.operating_time) - sum(d.plan_stop_time)) duration, d.store_date , Month(d.store_date) monthly from dashboard_analysis d, lines_machines_detail m where d.store_date like ? AND d.machine_name like ? AND d.machine_name = m.mapping_name GROUP BY monthly, d.line, d.machine_name;"),
        FIND_FREQUENCY_FAULT_CODE("select ref_line,ref_machine,end_time, alarm_code,alarm_name, COUNT(alarm_code) as frequency from fault_state_analysis where ref_line =? and ref_machine = ? and end_time BETWEEN ? and ? GROUP BY alarm_code;"),
        FIND_FREQUENCY_NON_MOVE_STATE("select ref_line,mstate,ref_machine,end_time, alarm_code,alarm_name, COUNT(mstate) as frequency from non_active_state where ref_line =? and ref_machine = ? and end_time BETWEEN ? and ? and alarm_code<>'' GROUP BY mstate;"),
        //FIND_FREQUENCY_ERROR_STATE("select ref_line,ref_machine,end_time, alarm_code,alarm_name, error, COUNT(alarm_code) as frequency from fault_state_analysis where ref_line =? and ref_machine = ? and end_time BETWEEN ? and ? and department<>'ALARM_AUTO_DELETED' GROUP BY error;");
        FIND_FREQUENCY_ERROR_STATE("select ref_line,\n" +
                "\t\t\tref_machine,end_time, \n" +
                "\t\t\talarm_code,alarm_name, \n" +
                "\t\t\terror, count(error) as error_count,\n" +
                "\t\t\titem,\n" +
                "\t\t\tcount(item) as item_count,\n" +
                "\t\t\tsub_item, \n" +
                "\t\t\tcount(sub_item) as sub_item_count,\n" +
                "\t\t\ttreatment,\n" +
                "\t\t\tcount(treatment) as treatment_count \n" +
                "from fault_state_analysis \n" +
                "where ref_line LIKE ? and end_time between ? and ? and department<>'ALARM_AUTO_DELETED' " +
                "group by ref_machine, item, sub_item, error, treatment order by ref_machine;");
        private String value;
        FaultMachineMonitor(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    public enum DefectiveProductSQL{
        ADD("INSERT INTO defective_product_analysis(ref_line, ref_machine, ref_product, mstate, start_time, end_time, production_date, quality, product_cycle, item, sub_item, error, treatment) " +
            "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);"),
        FIND_ALL("SELECT *FROM defective_product_analysis WHERE ref_line LIKE ? AND ref_machine LIKE ? AND production_date LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        COUNT_NUMBER_BY_LINE("SELECT _name, (SELECT COUNT(1) FROM defective_product_analysis WHERE ref_line = _name AND production_date LIKE ?) AS counting FROM _lines"),
        COUNT_NUMBER_BY_MACHINE("SELECT mapping_name, (SELECT COUNT(1) FROM defective_product_analysis WHERE ref_machine = LMD.mapping_name AND production_date LIKE ?) AS counting FROM lines_machines_detail LMD WHERE SUBSTR(mapping_name,1,2) = ?;"),
        COUNT("SELECT COUNT(1) FROM defective_product_analysis WHERE ref_line LIKE ? AND ref_machine LIKE ? AND production_date LIKE ?;");
        private String value;
        DefectiveProductSQL(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    public enum FaultStateSQL{
//        FIND_ALL("SELECT " +
//                " id,	ref_line,	ref_machine,	ref_product, "+
//                " SUBSTRING_INDEX(SUBSTRING_INDEX(mstate, '_' , -3), '_' , 1) AS mstate, "+
//                " work_date,	start_time,	end_time,	duration,	alarm_code,	alarm_name,	item,	sub_item,	error,	treatment,	department,	identifier "+
//                " FROM fault_state_analysis WHERE ref_line LIKE ? AND ref_machine LIKE ? AND department LIKE ? AND work_date LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
//        COUNT("SELECT COUNT(1) FROM fault_state_analysis WHERE ref_line LIKE ? AND ref_machine LIKE ? AND department LIKE ? AND work_date LIKE ?;"),
//        COUNT_NUMBER_BY_LINE("SELECT _name, (SELECT COUNT(1) FROM fault_state_analysis WHERE ref_line = _name AND department LIKE ? AND work_date LIKE ?) AS counting FROM _lines"),
//        COUNT_NUMBER_BY_MACHINE("SELECT mapping_name, (SELECT COUNT(1) FROM fault_state_analysis WHERE ref_machine = LMD.mapping_name AND department LIKE ? AND work_date LIKE ?) AS counting FROM lines_machines_detail LMD WHERE SUBSTR(mapping_name,1,2) = ?;"),

        FIND_ALL("SELECT " +
                " id,	ref_line,	ref_machine,	ref_product, "+
                " mstate, "+
                " work_date,	start_time,	end_time,	duration,	alarm_code,	alarm_name,	item,	sub_item,	error,	treatment,	department,	identifier "+
                " FROM fukoku_v2.view_transfer_fault_history WHERE ref_line LIKE ? AND ref_machine LIKE ? AND department LIKE ? AND work_date LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?;"),
        COUNT("SELECT COUNT(1) FROM fukoku_v2.view_transfer_fault_history WHERE ref_line LIKE ? AND ref_machine LIKE ? AND department LIKE ? AND work_date LIKE ?;"),
        COUNT_NUMBER_BY_LINE("SELECT name _name, (SELECT COUNT(1) FROM fukoku_v2.view_transfer_fault_history WHERE ref_line = name AND department LIKE ? AND work_date LIKE ?) AS counting FROM line"),
        COUNT_NUMBER_BY_MACHINE("SELECT acronym mapping_name, (SELECT COUNT(1) FROM fukoku_v2.view_transfer_fault_history WHERE ref_machine = LMD.acronym AND department LIKE ? AND work_date LIKE ?) AS counting FROM machine LMD WHERE LEFT(acronym,2) = ?;"),


        ADD("INSERT INTO fukoku_v2.fault_state_analysis(ref_line, ref_machine, ref_product, mstate, work_date, start_time, end_time, duration, alarm_code, alarm_name, item, sub_item, error, treatment, department, identifier) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"),
//        FREQ_VALUE("select ref_machine, alarm_code, count(alarm_code) counting\n" +
//                "from fault_state_analysis \n" +
//                "where ref_line LIKE ? and work_date between ? and ? and alarm_code <> \"\"\n" +
//                "group by alarm_code;"),

        FREQ_VALUE("select ref_machine, alarm_code, count(alarm_code) counting\n" +
                "from fukoku_v2.view_transfer_fault_history \n" +
                "where ref_line LIKE ? and work_date between ? and ? and alarm_code <> \"\"\n" +
                "group by alarm_code;"),
        DELETE("DELETE FROM fukoku_v2.fault_state_analysis WHERE id = ?; ");
        private String value;
        FaultStateSQL(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    public enum CalendarHeatmap{
// Old query
//        COUNT_OK_IB("SELECT production_date, (SELECT MAX(daily_seq) FROM good_product_analysis_ib WHERE ref_machine LIKE ? AND production_date = GPA.production_date) AS amount " +
//                    "FROM good_product_analysis_ib GPA " +
//                    "WHERE ref_machine LIKE ? AND production_date LIKE ? " +
//                    "GROUP BY production_date"),
        COUNT_OK_ALL_LINE(
            " call fukoku_v2.proc_count_ok(?,?,?); "
        ),
        COUNT_OK_IB(
            " SELECT production_date, " +
            "   MAX(daily_seq_ok) AS amount " +
            "   FROM fukoku_v2.total_good_product_analysis_ib " +
            " WHERE ref_line LIKE ? " +
            "   AND ref_machine LIKE ? " +
            "   AND production_date LIKE ? " +
            " GROUP BY production_date; "
        ),
        COUNT_OK_HA(
                " SELECT production_date, " +
                "   MAX(daily_seq_ok) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_ha " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_OK_HB(
                " SELECT production_date, " +
                "   MAX(daily_seq_ok) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_hb " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_OK_HC(
                " SELECT production_date, " +
                "   MAX(daily_seq_ok) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_hc " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_OK_HD(
                " SELECT production_date, " +
                "   MAX(daily_seq_ok) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_hd " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_OK_PD(
                " SELECT production_date, " +
                "   MAX(daily_seq_ok) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_pd " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_NG(
                " SELECT " +
                "   production_date, " +
                "   COUNT( 1 ) AS amount " +
                " FROM fukoku_v2.ng_product_analysis " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_DF(
                " SELECT " +
                "   production_date, " +
                "   COUNT( 1 ) AS amount " +
                " FROM fukoku_v2.defective_product_analysis " +
                " WHERE ref_line LIKE ? " +
                "   AND ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
//        Old Code
//        COUNT_TT_IB("SELECT production_date, " +
//                    "       ((SELECT MAX(daily_seq) FROM good_product_analysis_ib " +
//                    "           WHERE ref_machine LIKE ? AND production_date = GPA.production_date) + " +
//                    "       (SELECT COUNT(1) AS amount FROM ng_product_analysis  " +
//                    "           WHERE ref_machine LIKE ? AND production_date = GPA.production_date) + " +
//                    "       (SELECT COUNT(1) AS amount FROM defective_product_analysis " +
//                    "           WHERE ref_machine LIKE ? AND production_date = GPA.production_date) " +
//                    "       ) AS amount " +
//                    "FROM good_product_analysis_ib GPA " +
//                    "WHERE ref_machine LIKE ? AND production_date LIKE ? " +
//                    "GROUP BY production_date"),

        COUNT_TT_ALL_LINE(
                " CALL fukoku_v2.proc_count_total(?,?); "
        ),
        COUNT_TT_IB(
                " SELECT " +
                "   production_date, " +
                "   MAX(daily_seq) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_ib " +
                " WHERE ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),

        COUNT_TT_HA(
                " SELECT " +
                "   production_date, " +
                "   MAX(daily_seq) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_ha " +
                " WHERE ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_TT_HB(
                " SELECT " +
                "   production_date, " +
                "   MAX(daily_seq) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_hb " +
                " WHERE ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_TT_HC(
                " SELECT " +
                "   production_date, " +
                "   MAX(daily_seq) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_hc " +
                " WHERE ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_TT_HD(
                " SELECT " +
                "   production_date, " +
                "   MAX(daily_seq) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_hd " +
                " WHERE ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        ),
        COUNT_TT_PD(
                " SELECT " +
                "   production_date, " +
                "   MAX(daily_seq) AS amount " +
                " FROM fukoku_v2.total_good_product_analysis_pd " +
                " WHERE ref_machine LIKE ? " +
                "   AND production_date LIKE ? " +
                " GROUP BY production_date; "
        );
        private String value;
        CalendarHeatmap(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    //    Chomrern - 2018-07-15
    // TODO: SQL STATEMENT FOR QUERY Product Status Frequency by Machine
    public enum ProductStatusFreqSQLByMachine {

        FIND_ALL_LINE_BY_MACHINE(
                " CALL V3_PROC_GET_PRODUCT_ALL_LINE_BY_MACHINE(?,?);"
        );

        private String value;

        ProductStatusFreqSQLByMachine(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    //    Chomrern - 2018-07-17
    // TODO: SQL STATEMENT FOR QUERY Product Status Frequency by Line
    public enum ProductStatusFreqSQLByLine {
        FIND_ALL_LINE(
                " call V3_PROC_GET_PRODUCT_BY_LINE(?); "
        ),

        FIND_SPECIFIC_LINE(
                " call V3_PROC_GET_PRODUCT_BY_SPECIFIC_LINE(?,?); "
        );
        private String value;

        ProductStatusFreqSQLByLine(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    //    Chomrern - 2018-07-18
    // TODO: SQL STATEMENT FOR QUERY - ALL OK PRODUCT
    public enum ProductStatusFreqSQLByOKProduct {
        FIND_ALL_OK_PRODUCT(
                " call fukoku_v2.proc_get_all_ok_product(?); "
        );

        private String value;

        ProductStatusFreqSQLByOKProduct(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }
    //    Chomrern - 2018-07-18
    // TODO: SQL STATEMENT FOR QUERY - ALL NG and DF Products.
    public enum ProductStatusFreqSQLByNG_DF {
        FIND_ALL_NG_DF_PRODUCT(
                " call fukoku_v2.proc_nd_df_product(?); "
        );

        private String value;

        ProductStatusFreqSQLByNG_DF(String value) {
            this.value = value;
        }


        public String toString() {
            return this.value;
        }
    }

    // Chomrern - 2018-07-20
    public enum CalendarHeatmapMachineState{
        COUNT_NAS(" SELECT work_date ,COUNT(id) AS number " +
                " FROM fukoku_v2.non_active_state_analysis " +
                " WHERE ref_line LIKE ?" +
                " AND ref_machine LIKE ? " +
                " AND work_date LIKE ? " +
                " GROUP BY work_date; "),
        COUNT_FS(" SELECT work_date ,COUNT(id) AS number " +
                " FROM fukoku_v2.fault_state_analysis " +
                " WHERE ref_line LIKE ?" +
                " AND ref_machine LIKE ? " +
                " AND work_date LIKE ? " +
                " GROUP BY work_date; "),
        COUNT_ALARM(" SELECT work_date ,COUNT(id) AS number " +
                " FROM fukoku_v2.alarm_histories " +
                " WHERE ref_line LIKE ?" +
                " AND ref_machine LIKE ? " +
                " AND work_date LIKE ? " +
                " GROUP BY work_date; ");
        private String value;
        CalendarHeatmapMachineState(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    // Chomrern - 2018-08-06
    public enum NewDashBoardEnum{
        FIND_DASHBOARD_HA("CALL proc_dashboard_product_efficiency_ha(?,?,?,?);"),
        FIND_DASHBOARD_HB("CALL proc_dashboard_product_efficiency_hb(?,?,?,?);"),
        FIND_DASHBOARD_HC("CALL proc_dashboard_product_efficiency_hc(?,?,?,?);"),
        FIND_DASHBOARD_HD("CALL proc_dashboard_product_efficiency_hd(?,?,?,?);"),
        FIND_DASHBOARD_IB("CALL proc_dashboard_product_efficiency_ib(?,?,?,?);"),
        FIND_DASHBOARD_PD("CALL proc_dashboard_product_efficiency_pd(?,?,?,?);"),
        FIND_DASHBOARD_LINE_CHART_HA("CALL proc_dashboard_line_chart_ha(?,?,?,?);"),
        FIND_DASHBOARD_LINE_CHART_HB("CALL proc_dashboard_line_chart_hb(?,?,?,?);"),
        FIND_DASHBOARD_LINE_CHART_HC("CALL proc_dashboard_line_chart_hc(?,?,?,?);"),
        FIND_DASHBOARD_LINE_CHART_HD("CALL proc_dashboard_line_chart_hd(?,?,?,?);"),
        FIND_DASHBOARD_LINE_CHART_IB("CALL proc_dashboard_line_chart_ib(?,?,?,?);"),
        FIND_DASHBOARD_LINE_CHART_PD("CALL proc_dashboard_line_chart_pd(?,?,?,?);");
        private String value;
        NewDashBoardEnum(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    // Chomrern - 2018-08-09
    public enum NewDefectiveProductEnum{
        FIND_DEFECTIVE_HA("CALL proc_defective_product_ha(?,?);"),
        FIND_DEFECTIVE_HB("CALL proc_defective_product_hb(?,?);"),
        FIND_DEFECTIVE_HC("CALL proc_defective_product_hc(?,?);"),
        FIND_DEFECTIVE_HD("CALL proc_defective_product_hd(?,?);"),
        FIND_DEFECTIVE_IB("CALL proc_defective_product_ib(?,?);"),
        FIND_DEFECTIVE_PD("CALL proc_defective_product_pd(?,?);");

        private String value;
        NewDefectiveProductEnum(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    public enum FaultStateSaveListSQL{
        FIND_BY_TRAN_ID("SELECT * FROM fault_state_savelist WHERE transfer_id = ?;"),
        ADD("INSERT INTO fault_state_savelist(ref_line, ref_machine, ref_product, mstate, work_date, start_time, end_time, duration, alarm_code, alarm_name, item, sub_item, error, treatment, transfer_id, identifier, department) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"),
        DELETE("DELETE FROM fault_state_savelist WHERE id = ?; ");

        private String value;
        FaultStateSaveListSQL(String value){this.value = value;}
        public String toString(){return this.value;}
    }

    //    Chomrern - 2018-10-04
    // TODO: SQL STATEMENT FOR QUERY New Dash Board
    public enum DashBoard2 {
        // call procedure version 2 that is inside this function
        //FIND_DASHBOARD2(" CALL proc_cal_dashboard_3(? , ? , ? , ? , ?); " ), -- OLD VERSION

        FIND_DASHBOARD2(" CALL V3_PROC_CAL_DASHBOARD(? , ? , ? , ? , ?); " ),


        FIND_DAILY_ANALYSIS(" CALL V3_PROC_CAL_DAILY_MSTATE_ANALYSIS(?,?,?,?,?); "),

        // call procedure version 2 that is inside this function
        FIND_PROCESS_ANALYSIS(" CALL V3_PROC_PROCESS_ANALYSIS_BY_LINE(?, ?, ?, ?); ");



        private String value;

        DashBoard2(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum AlarmSQL {
        FIND_ALL_HA("SELECT * FROM view_alarm_ha WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_HB("SELECT * FROM view_alarm_hb WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_HC("SELECT * FROM view_alarm_hc WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_HD("SELECT * FROM view_alarm_hd WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_IB("SELECT * FROM view_alarm_ib WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_PD("SELECT * FROM view_alarm_pd WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL("SELECT * FROM view_alarm_ha " +
                " UNION ALL " +
                " SELECT * FROM view_alarm_hb" +
                " UNION ALL " +
                " SELECT * FROM view_alarm_hc" +
                " UNION ALL " +
                " SELECT * FROM view_alarm_hd" +
                " UNION ALL " +
                " SELECT * FROM view_alarm_ib" +
                " UNION ALL " +
                " SELECT * FROM view_alarm_pd;"
                ),
        COUNT_HA("SELECT COUNT(1) num FROM alarm_ha WHERE machine LIKE ? ;"),
        COUNT_HB("SELECT COUNT(1) num FROM alarm_hb WHERE machine LIKE ? ;"),
        COUNT_HC("SELECT COUNT(1) num FROM alarm_hc WHERE machine LIKE ? ;"),
        COUNT_HD("SELECT COUNT(1) num FROM alarm_hd WHERE machine LIKE ? ;"),
        COUNT_IB("SELECT COUNT(1) num FROM alarm_ib WHERE machine LIKE ? ;"),
        COUNT_PD("SELECT COUNT(1) num FROM alarm_pd WHERE machine LIKE ? ;"),

        GET_ALARM_MSTATE("SELECT * FROM view_alarm_mstate WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND TIMESTAMPDIFF(MINUTE, LEFT(end_time, 19), CURRENT_TIMESTAMP) < 30 " +
                " ORDER BY start_time DESC;" +
                ""),

        COUNT_TRANSFERRED_ALARM_MSTATE("SELECT COUNT(1) FROM machine_stopped_transferred WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND state = REPLACE(?,'all',state); " ),

        COUNT_NUMBER_BY_LINE("SELECT _name, count(1) as counting FROM _lines as l INNER JOIN machine_stopped_transferred as m ON m.line_name = l._name GROUP BY l._name;"),
        COUNT_NUMBER_BY_MACHINE("SELECT LMD.mapping_name, COUNT(1) AS counting FROM lines_machines_detail LMD INNER JOIN machine_stopped_transferred m ON LMD.mapping_name = m.machine_name AND SUBSTR(LMD.mapping_name,1,2) = 'IB'\n" +
                " GROUP BY LMD.mapping_name; "),

        NEW_COUNT_TRANSFERRED_ALARM("SELECT COUNT(1) FROM machine_stopped_transferred WHERE line_name LIKE ?\n" +
                "                 AND machine_name LIKE ? \n" +
                "                 AND IFNULL(alarm_id,'') != ''"),

        NEW_COUNT_TRANSFERRED_ALARM_MSTATE("SELECT COUNT(1) FROM machine_stopped_transferred WHERE " +
                "                       line_name LIKE ? \n" +
                "                 AND machine_name LIKE ? \n" +
                "                 AND state IN (?)"),

        NEW_COUNT_ALL_RANSFERRED_ALARM_MSTATE("SELECT COUNT(1) FROM machine_stopped_transferred WHERE " +
                "                       line_name LIKE ?\n" +
                "                 AND machine_name LIKE ? "),


        COUNT_NON_ACTIVE(" SELECT COUNT(1) " +
                " FROM machine_stopped_transferred " +
                " WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND state IN ('STOP','WAIT','MANUAL') ;"),
        COUNT_NON_ACTIVE_NUMBER_BY_LINE("SELECT _name, count(1) as counting FROM _lines as l INNER JOIN machine_stopped_transferred as m ON m.line_name = l._name " +
                " WHERE m.state IN ('STOP','WAIT','MANUAL') " +
                " GROUP BY l._name;"),
        COUNT_NON_ACTIVE_NUMBER_BY_MACHINE("SELECT LMD.mapping_name, COUNT(1) AS counting FROM lines_machines_detail LMD INNER JOIN machine_stopped_transferred m ON LMD.mapping_name = m.machine_name AND SUBSTR(LMD.mapping_name,1,2) = ? " +
                " WHERE m.state IN ('STOP','WAIT','MANUAL') GROUP BY LMD.mapping_name; "),

        COUNT_ALARM(" SELECT COUNT(1) " +
                " FROM machine_stopped_transferred " +
                " WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND IFNULL(alarm_id,'') != ''; "),
        COUNT_ALARM_NUMBER_BY_LINE("SELECT _name, count(1) as counting FROM _lines as l INNER JOIN machine_stopped_transferred as m ON m.line_name = l._name " +
                " WHERE IFNULL(m.alarm_id,'') != '' " +
                " GROUP BY l._name;"),
        COUNT_ALARM_NUMBER_BY_MACHINE("SELECT LMD.mapping_name, COUNT(1) AS counting FROM lines_machines_detail LMD INNER JOIN machine_stopped_transferred m ON LMD.mapping_name = m.machine_name AND SUBSTR(LMD.mapping_name,1,2) = ? " +
                " WHERE IFNULL(m.alarm_id,'') != '' GROUP BY LMD.mapping_name; "),

        COUNT_AUTO(" SELECT COUNT(1) " +
                " FROM machine_stopped_transferred " +
                " WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND state = 'AUTO' ;"),
        COUNT_AUTO_NUMBER_BY_LINE("SELECT _name, count(1) as counting FROM _lines as l INNER JOIN machine_stopped_transferred as m ON m.line_name = l._name " +
                " WHERE m.state = 'AUTO' " +
                " GROUP BY l._name;"),
        COUNT_AUTO_NUMBER_BY_MACHINE("SELECT LMD.mapping_name, COUNT(1) AS counting FROM lines_machines_detail LMD INNER JOIN machine_stopped_transferred m ON LMD.mapping_name = m.machine_name AND SUBSTR(LMD.mapping_name,1,2) = ? " +
                " WHERE m.state = 'AUTO' GROUP BY LMD.mapping_name; "),

        GET_TRANSFERRED_ALARM_MSTATE("SELECT * FROM machine_stopped_transferred WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND state = REPLACE(?,'all',state) " +
                " ORDER BY start_time DESC LIMIT ? OFFSET ?;"),
        GET_NON_ACTIVE(" SELECT * " +
                " FROM machine_stopped_transferred " +
                " WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND state IN ('STOP','WAIT','MANUAL') " +
                " ORDER BY start_time DESC LIMIT ? OFFSET ?;"),
        GET_ALARM(" SELECT * " +
                " FROM machine_stopped_transferred " +
                " WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND IFNULL(alarm_id,'') != ''"+
                " ORDER BY start_time DESC LIMIT ? OFFSET ?;"),

        GET_AUTO(" SELECT * " +
                " FROM machine_stopped_transferred " +
                " WHERE line_name LIKE ? " +
                " AND machine_name LIKE ? " +
                " AND state = 'AUTO' " +
                " ORDER BY start_time DESC LIMIT ? OFFSET ?;"),


        GET_ALARM_MSTATE_BY_ALARM_ID("SELECT * FROM machine_stopped_transferred WHERE alarm_id = ? ;"),


        NEW_FIND_ALL_ALARM_OR_MSTATE("SELECT *\n" +
                "                 FROM machine_stopped_transferred \n" +
                "                 WHERE line_name LIKE ?\n" +
                "                 AND machine_name LIKE ?\n" +
                "                 ORDER BY start_time DESC LIMIT ? OFFSET ?;"),

       NEW_FIND_ALARM_OR_MSTATE("SELECT *\n" +
                "                 FROM machine_stopped_transferred \n" +
                "                 WHERE line_name LIKE ?\n" +
                "                 AND machine_name LIKE ?\n" +
                "                 AND state IN (?) \n" +
                "                 ORDER BY start_time DESC LIMIT ? OFFSET ?;"),

        NEW_FIND_ALARM("SELECT * \n" +
                "                 FROM machine_stopped_transferred \n" +
                "                 WHERE line_name LIKE ? \n" +
                "                 AND machine_name LIKE ? \n" +
                "                 AND IFNULL(alarm_id,'') != ''\n" +
                "                 ORDER BY start_time DESC LIMIT ? OFFSET ?;");


        private String value;

        AlarmSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum MStateMariaDBSQL {
        FIND_ALL_HA("SELECT * FROM view_mstate_ha WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_HB("SELECT * FROM view_mstate_hb WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_HC("SELECT * FROM view_mstate_hc WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_HD("SELECT * FROM view_mstate_hd WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_IB("SELECT * FROM view_mstate_ib WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL_PD("SELECT * FROM view_mstate_pd WHERE machine LIKE ? ORDER BY start_time DESC;"),
        FIND_ALL("SELECT * FROM view_mstate_ha " +
                " UNION ALL " +
                " SELECT * FROM view_mstate_hb" +
                " UNION ALL " +
                " SELECT * FROM view_mstate_hc" +
                " UNION ALL " +
                " SELECT * FROM view_mstate_hd" +
                " UNION ALL " +
                " SELECT * FROM view_mstate_ib" +
                " UNION ALL " +
                " SELECT * FROM view_mstate_pd;"
        ),
        COUNT_HA("SELECT COUNT(1) num FROM mstate_ha WHERE machine LIKE ? ;"),
        COUNT_HB("SELECT COUNT(1) num FROM mstate_hb WHERE machine LIKE ? ;"),
        COUNT_HC("SELECT COUNT(1) num FROM mstate_hc WHERE machine LIKE ? ;"),
        COUNT_HD("SELECT COUNT(1) num FROM mstate_hd WHERE machine LIKE ? ;"),
        COUNT_IB("SELECT COUNT(1) num FROM mstate_ib WHERE machine LIKE ? ;"),
        COUNT_PD("SELECT COUNT(1) num FROM mstate_pd WHERE machine LIKE ? ;");
        private String value;

        MStateMariaDBSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    public enum MachineStoppedTransferredSQL {
        FIND_ALL("SELECT * FROM machine_stopped_transferred WHERE line_name LIKE ? AND machine_name LIKE ? ORDER BY start_time DESC;"),
        MOVING("CALL proc_move_machine_stop();"),
        TOTAL_GOOD_PRODUCT_ANALYSIS("CALL proc_insert_total_product_analysis();"),
        AUTO_INSERT_DAILY_ANALYSIS("CALL PROC_AUTO_INSERT_TO_DAILY_ANALYSIS(); "),


        ADD("INSERT INTO machine_stopped_transferred(" +
                " alarm_id, row_key, alarm_code, alarm_name, duration," +
                " start_time, end_time, work_date, line_name, machine_name, " +
                " mstate, state, product, alarm_status, duration_for_current_time," +
                " department) " +
                " VALUES(?,?,?,?,?," +
                " ?,?,?,?,?," +
                " ?,?,?,?,?," +
                " ?);"),

        DELETE_MACHINE_STOP(" CALL proc_delete_transfer_transaction(?); ");


        private String value;

        MachineStoppedTransferredSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

    // TODO: SQL STATEMENT FOR WORKPIECE CORRELATION
    public enum WPCorrelationSQL{
        FIND_WP_CORR("SELECT " +
                " li_ln,  " +
                " mi_mn, " +
                " pi_pst, " +
                " pi_pet, " +
                " REPLACE(REPLACE(pdi_rd,'[',''),']','') pdi_rd, " +
                " pdi_n, " +
                " pdi_pdst, " +
                " pdi_pdet, " +
                " REPLACE(REPLACE(pdi_rp,'[',''),']','') pdi_rp " ),
//                " FROM workpiece_ib " +
//                " WHERE mi_mn =  p_machine_name " +
//                " AND DATE_FORMAT(pi_pst,'%Y-%m-%d %H:%i%s') >= p_start_date " +
//                " AND DATE_FORMAT(pi_pet,'%Y-%m-%d %H:%i%s') <= p_end_date " +
//                " AND pdi_n = p_process" +
//                " ORDER BY pdi_rd DESC;");


        COUNT_WP_CORR("SELECT " +
                " COUNT(1) count_wp " );
        private String value;
        WPCorrelationSQL(String value) {
            this.value = value;
        }

        public String toString(){
            return this.value;
        }
    }

    // Alarm Statistics
    public enum AlarmStatisticsSQL {

        COUNT("CALL fukoku_v2.proc_alarm_count(?,?,?,?);"),
        COUNT_NUMNBER_BY_FACTORY("CALL fukoku_v2.proc_counting_factory();"),
        COUNT_NUMBER_BY_LINE("CALL fukoku_v2.proc_counting_line(?);"),
        COUNT_NUMBER_BY_MACHINE("CALL fukoku_v2.proc_counting_machine(?);"),
        FIND_ALL("CALL fukoku_v2.proc_alarm_statistics(?,?,?,?,?,?);"),
        FIND_ALL_MACHINE("CALL fukoku_v2.proc_get_machine(?,?,?);"),
        FIND_ALL_LINE("CALL fukoku_v2.proc_line_by_factory(?,?,?);"),
        FIND_ALARM_HISTORY("SELECT * FROM fukoku_v2.alarm_histories WHERE ref_line = REPLACE(?, 'ALL', ref_line) AND alarm_name = ? AND LEFT(work_date,4) = ?  ORDER BY id DESC LIMIT ? OFFSET ?;"),
        COUNT_ALARM_HISTORY("SELECT COUNT(1) FROM fukoku_v2.alarm_histories WHERE ref_line = REPLACE(?, 'ALL', ref_line) AND alarm_name = ? AND LEFT(work_date,4) = ?;"),
        AUTO_COUNTING_ALARM("CALL fukoku_v2.proc_auto_counting_alarm();"),
        AUTO_COUNTING_ALARM_DURATION("CALL fukoku_v2.proc_auto_counting_alarm_duration();"),
        FIND_ALL_MAIN_ALARM_STATISTICS("CALL fukoku_v2.procFinalAlarmCounting(?,?,?,?);"),
        FIND_ALL_MAIN_ALARM_STATISTICS_DURATION("CALL fukoku_v2.procFinalAlarmCountingDuration(?,?,?,?);"),

        FIND_ALL_MAIN_ALARM_STATISTICS_SUM("CALL fukoku_v2.procFinalAlarmCountingSUM(?,?,?,?);"),
        FIND_ALL_MAIN_ALARM_STATISTICS_DURATION_SUM("CALL fukoku_v2.procFinalAlarmCountingDurationSum(?,?,?,?);");

        private String value;

        AlarmStatisticsSQL(String value) {
            this.value = value;
        }

        public String toString() {
            return this.value;
        }
    }

}
