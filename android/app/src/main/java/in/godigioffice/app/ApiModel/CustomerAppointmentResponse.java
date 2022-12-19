package in.godigioffice.app.ApiModel;

import java.util.Date;

public class CustomerAppointmentResponse {
    String id;
    String cmpid;
    String list_id;
    String customer_name;
    String customer_location;
    String customer_mob_no;
    String customer_whatsapp_no;

    String member_name;
    Date appointment_date_time;
    String appointment_purpose;
    String appointment_remarks;
    String appointment_status;
    String member_id;
    String list_name;
    String app_time;

    String op1;
    String op2;
    String op3;
    String op4;

    public CustomerAppointmentResponse( String cmpid,
                                        String list_id,
                                        String customer_name,
                                        String customer_location,
                                        String customer_mob_no,
                                        String customer_whatsapp_no,
                                        String member_name, Date appointment_date_time, String appointment_purpose, String appointment_remarks, String appointment_status, String member_id, String list_name,String app_time,
                                        String op1,String op2,String op3,String op4) {
        this.cmpid = cmpid;
        this.list_id = list_id;
        this.customer_name = customer_name;
        this.customer_location = customer_location;
        this.customer_mob_no = customer_mob_no;
        this.customer_whatsapp_no = customer_whatsapp_no;

        this.member_name = member_name;
        this.appointment_date_time = appointment_date_time;
        this.appointment_purpose = appointment_purpose;
        this.appointment_remarks = appointment_remarks;
        this.appointment_status = appointment_status;
        this.member_id = member_id;
        this.list_name = list_name;
        this.app_time=app_time;

        this.op1=op1;
        this.op2=op2;
        this.op3=op3;
        this.op4=op4;
    }

    public String getOp1() {
        return op1;
    }

    public void setOp1(String op1) {
        this.op1 = op1;
    }

    public String getOp2() {
        return op2;
    }

    public void setOp2(String op2) {
        this.op2 = op2;
    }

    public String getOp3() {
        return op3;
    }

    public void setOp3(String op3) {
        this.op3 = op3;
    }

    public String getOp4() {
        return op4;
    }

    public void setOp4(String op4) {
        this.op4 = op4;
    }

    public String getApp_time() {
        return app_time;
    }

    public void setApp_time(String app_time) {
        this.app_time = app_time;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getCustomer_location() {
        return customer_location;
    }

    public void setCustomer_location(String customer_location) {
        this.customer_location = customer_location;
    }

    public String getCustomer_mob_no() {
        return customer_mob_no;
    }

    public void setCustomer_mob_no(String customer_mob_no) {
        this.customer_mob_no = customer_mob_no;
    }

    public String getCustomer_whatsapp_no() {
        return customer_whatsapp_no;
    }

    public void setCustomer_whatsapp_no(String customer_whatsapp_no) {
        this.customer_whatsapp_no = customer_whatsapp_no;
    }



    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
    }

    public Date getAppointment_date_time() {
        return appointment_date_time;
    }

    public void setAppointment_date_time(Date appointment_date_time) {
        this.appointment_date_time = appointment_date_time;
    }

    public String getAppointment_purpose() {
        return appointment_purpose;
    }

    public void setAppointment_purpose(String appointment_purpose) {
        this.appointment_purpose = appointment_purpose;
    }

    public String getAppointment_remarks() {
        return appointment_remarks;
    }

    public void setAppointment_remarks(String appointment_remarks) {
        this.appointment_remarks = appointment_remarks;
    }

    public String getAppointment_status() {
        return appointment_status;
    }

    public void setAppointment_status(String appointment_status) {
        this.appointment_status = appointment_status;
    }

    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }

    public String getList_name() {
        return list_name;
    }

    public void setList_name(String list_name) {
        this.list_name = list_name;
    }
}
