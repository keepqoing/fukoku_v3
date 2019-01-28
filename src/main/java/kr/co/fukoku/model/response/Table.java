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
	
	public static final String FACTORY_COLUMN[] =  { "seq", "name", "address", "start_date","end_date","remark"  };
	public static final String LINE_COLUMN[] = {"seq","name","ref_factory_id","ref_product_id","layout_name","start_date","end_date","remark","status"};
	public static final String MACHINE_COLUMN[] = {"seq","name","ref_process_id","ip","import_date","code","manufacturer","facility_staff","facility_contact_person","plc_type","plc_communication_device","station","remark","status"};
	public static final String PROCESS_COLUMN[] = { "seq","name","type","rep_variable_name","desp_picture","status","remark"};
	public static final String PRODUCT_COLUMN[] = {  "name", "type","start_date","end_date","customer_name","remark","status"};
	public static final String PROCESS_CHAIN_COLUMN[] = {"seq","name","ref_line","ref_product","status"};
	public static final String PROCESS_CHAIN_ELEMENT_COLUMN[] = {"stage","name","ref_process_chain_id"} ;
	public static final String PROCESS_MACHINE_COLUMN[] = {"seq","ref_process_id","ref_machine_id","ref_process_chain_element","next_sequence"};
	public static final String PROCESS_VAR_COLUMN[] = {"seq","name","ref_process_id","remark","status","item_type"};
	
	
	
	
	
	
	
	

	
	
	
	
	

	
	
	
	

	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	


}
