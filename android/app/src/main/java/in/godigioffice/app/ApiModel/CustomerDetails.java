package in.godigioffice.app.ApiModel;

import com.google.gson.annotations.SerializedName;

public class CustomerDetails {

    String customer_name;
    String customer_contact_no;
    String customer_location;
    String customer_whatsapp_no;



    @SerializedName("ins_exp")
    String insurance_exp_date;

    String reg_no;
    String make_model;
    String yom;

    String cmpid;
    String list_id;
    String id;

    public CustomerDetails(String customer_name, String customer_contact_no, String customer_location, String customer_whatsapp_no, String insurance_exp_date, String reg_no, String make_model, String yom, String cmpid, String list_id) {
        this.customer_name = customer_name;
        this.customer_contact_no = customer_contact_no;
        this.customer_location = customer_location;
        this.customer_whatsapp_no = customer_whatsapp_no;
        this.insurance_exp_date = insurance_exp_date;
        this.reg_no = reg_no;
        this.make_model = make_model;
        this.yom = yom;
        this.cmpid = cmpid;
        this.list_id = list_id;
    }

    public CustomerDetails(String customer_name, String customer_contact_no, String customer_location, String customer_whatsapp_no, String insurance_exp_date, String reg_no, String make_model, String yom) {
        this.customer_name = customer_name;
        this.customer_contact_no = customer_contact_no;
        this.customer_location = customer_location;
        this.customer_whatsapp_no = customer_whatsapp_no;
        this.insurance_exp_date = insurance_exp_date;
        this.reg_no = reg_no;
        this.make_model = make_model;
        this.yom = yom;
    }

    public String getCmpid() {
        return cmpid;
    }

    public void setCmpid(String cmpid) {
        this.cmpid = cmpid;
    }

    public String getList_id() {
        return list_id;
    }

    public void setList_id(String list_id) {
        this.list_id = list_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getCustomer_contact_no() {
        return customer_contact_no;
    }

    public void setCustomer_contact_no(String customer_contact_no) {
        this.customer_contact_no = customer_contact_no;
    }

    public String getCustomer_location() {
        return customer_location;
    }

    public void setCustomer_location(String customer_location) {
        this.customer_location = customer_location;
    }

    public String getCustomer_whatsapp_no() {
        return customer_whatsapp_no;
    }

    public void setCustomer_whatsapp_no(String customer_whatsapp_no) {
        this.customer_whatsapp_no = customer_whatsapp_no;
    }

    public String getInsurance_exp_date() {
        return insurance_exp_date;
    }

    public void setInsurance_exp_date(String insurance_exp_date) {
        this.insurance_exp_date = insurance_exp_date;
    }

    public String getReg_no() {
        return reg_no;
    }

    public void setReg_no(String reg_no) {
        this.reg_no = reg_no;
    }

    public String getMake_model() {
        return make_model;
    }

    public void setMake_model(String make_model) {
        this.make_model = make_model;
    }

    public String getYom() {
        return yom;
    }

    public void setYom(String yom) {
        this.yom = yom;
    }
}
