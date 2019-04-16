package kr.co.fukoku.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FailureFactoryMonitoring {
    @JsonProperty("FACTORY_NAME")
    private String factory_name;
    @JsonProperty("MACHINE_NAME")
    private String machine_name;

    public FailureFactoryMonitoring() {
    }

    public FailureFactoryMonitoring(String factory_name) {
        this.factory_name = factory_name;
    }

    public FailureFactoryMonitoring(String _name, String ref_factory) {
        machine_name = _name;
        factory_name = ref_factory;
    }


    public String getFactory_name() {
        return factory_name;
    }

    public void setFactory_name(String factory_name) {
        this.factory_name = factory_name;
    }

    public String getMachine_name() {
        return machine_name;
    }

    public void setMachine_name(String machine_name) {
        this.machine_name = machine_name;
    }
}
