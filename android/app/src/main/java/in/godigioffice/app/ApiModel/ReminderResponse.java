package in.godigioffice.app.ApiModel;

import java.util.Date;

public class ReminderResponse {

    String id;
    String customer_name;
    String customer_location;
    String customer_mob_no;
    String customer_whatsapp_no;
    String team_name;
    String member_name;
    String appointment_date;
    String appointment_time;
    Date reminder_date;
    String reminder_time;
    String reminder_remarks;
    String reminder_status;
    String cmpid;
    String list_id;
    String member_id;
    String list_name;


    String op1;
    String op2;
    String op3;
    String op4;


    public ReminderResponse(String customer_name, String customer_location, String customer_mob_no, String customer_whatsapp_no, String member_name, String appointment_date, String appointment_time, Date reminder_date, String reminder_time, String reminder_remarks, String reminder_status, String cmpid, String list_id, String member_id, String list_name,
                            String op1,String op2,String op3,String op4) {
        this.customer_name = customer_name;
        this.customer_location = customer_location;
        this.customer_mob_no = customer_mob_no;
        this.customer_whatsapp_no = customer_whatsapp_no;
        this.member_name = member_name;
        this.appointment_date = appointment_date;
        this.appointment_time = appointment_time;
        this.reminder_date = reminder_date;
        this.reminder_time = reminder_time;
        this.reminder_remarks = reminder_remarks;
        this.reminder_status = reminder_status;
        this.cmpid = cmpid;
        this.list_id = list_id;
        this.member_id = member_id;
        this.list_name = list_name;

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

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
    }

    public String getAppointment_date() {
        return appointment_date;
    }

    public void setAppointment_date(String appointment_date) {
        this.appointment_date = appointment_date;
    }

    public String getAppointment_time() {
        return appointment_time;
    }

    public void setAppointment_time(String appointment_time) {
        this.appointment_time = appointment_time;
    }

    public Date getReminder_date() {
        return reminder_date;
    }

    public void setReminder_date(Date reminder_date) {
        this.reminder_date = reminder_date;
    }

    public String getReminder_time() {
        return reminder_time;
    }

    public void setReminder_time(String reminder_time) {
        this.reminder_time = reminder_time;
    }

    public String getReminder_remarks() {
        return reminder_remarks;
    }

    public void setReminder_remarks(String reminder_remarks) {
        this.reminder_remarks = reminder_remarks;
    }

    public String getReminder_status() {
        return reminder_status;
    }

    public void setReminder_status(String reminder_status) {
        this.reminder_status = reminder_status;
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
