package kr.co.fukoku.model.response;

public class Table {
	
	public static final String FACTORY = "Factory(s)";
	public static final String LINE = "Line(s)";
	public static final String MACHINE = "Machine(s)";
	public static final String PROCESS = "Process(s)";
	public static final String PRODUCT = "Product(s)";
	public static final String PROCESS_MACHINE = "Process_machine(s)";
	public static final String PROCESS_VAR = "Process_var(s)";
	public static final String PROCESS_CHAIN = "Process_chain(s)";
	public static final String PROCESS_CHAIN_ELEMENT = "Process_chain_element(s)";
	public static final String DEPARTMENT = "Department(s)";
	
	public static final String FACTORY_COLUMN[] =  { "seq", "name", "address", "start_date","end_date","remark"  };
	public static final String LINE_COLUMN[] = {"seq","name","ref_factory_id","ref_product_id","layout_name","start_date","end_date","remark","status"};
	public static final String MACHINE_COLUMN[] = {"seq","name","ref_process_id","ip","import_date","code","manufacturer","facility_staff","facility_contact_person","plc_type","plc_communication_device","station","remark","status"};
	public static final String PROCESS_COLUMN[] = { "seq","name","type","rep_variable_name","desp_picture","status","remark"};
	public static final String PRODUCT_COLUMN[] = {  "name", "type","start_date","end_date","customer_name","remark","status"};
	public static final String PROCESS_CHAIN_COLUMN[] = {"seq","name","ref_line","ref_product","status"};
	public static final String PROCESS_CHAIN_ELEMENT_COLUMN[] = {"stage","name","ref_process_chain_id"} ;
	public static final String PROCESS_MACHINE_COLUMN[] = {"seq","ref_process","ref_machine","ref_process_chain_element","next_sequence"};
	public static final String PROCESS_VAR_COLUMN[] = {"seq","name","ref_process_id","remark","status","item_type"};
	
	
	
	public static final String DEPARTMENT_COLUMN[] = {"seq","code","name","parent","remark"};
	
	public static final String DATABASE_INFOR ="Database infor(s)";
	public static final String DATABASE_INFOR_COLUMN[] = {"seq", "db_name", "db_ip_address", "db_port_no" , "db_user_name","db_user_password", "db_type", "remark"};






	public static final String ABNORMAL_MGT_COLUMN[] = {"seq","name","ref_factory_id","ref_department_id","lines","data"};
	public static final String STATE_NAME_COLUMN[] = {"seq","eng_name","korean_name","status","color"};
	
	

	
	public static final String TS_EFN_GETDATA[] = {
			"TranNo",
			"Plantcode",
			"EFNCode",
			"GetDT",
			"ProdDate",
			"ProdNo",
			"ProdGroup",
			"TElePower",
			"ElePower",
			"IntPower",
			"TAP_POS",
			"PFPer",
			"EPI_A",
			"EPI_B",
			"EPI_C",
			"ABHA_A",
			"ABHA_B",
			"ABHA_C",
			"TrTemp",
			"Electrod_A",
			"Electrod_B",
			"Electrod_C",
			"Impedance_A",
			"Impedance_B",
			"Impedance_C",
			"1Ampere_A",
			"1Ampere_B",
			"1Ampere_C",
			"1Voltage_A",
			"1Voltage_B",
			"1Voltage_C",
			"2Ampere_A",
			"2Ampere_B",
			"2Ampere_C",
			"2Voltage_A",
			"2Voltage_B",
			"2Voltage_C",
			"3PhasePF_A",
			"3PhasePF_B",
			"3PhasePF_C",
			"RMeter_A",
			"RMeter_B",
			"RMeter_C",
			"XMeter_A",
			"XMeter_B",
			"XMeter_C",
			"ExhaustGasTemp",
			"TapTemp",
			"CoolantQty",
			"IFDT",
			"comment"
			
	};
	
	
	
	

	
	
	
	
	

	
	
	
	

	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	


}
