package in.godigioffice.app.models;

import java.util.Date;

public class ReminderAppointmentCommonModel {

    String customer_name;
    String customer_location;
    String customer_mob_no;
    String customer_whatsapp_no;


    Date date;
    String time;

    String appointment_purpose;
    String remarks;
    String appointment_status;

    String op1;
    String op2;
    String op3;
    String op4;

    public ReminderAppointmentCommonModel(String customer_name, String customer_location, String customer_mob_no, String customer_whatsapp_no, Date date, String time, String appointment_purpose, String remarks, String appointment_status,
                                          String op1, String op2, String op3, String op4) {
        this.customer_name = customer_name;
        this.customer_location = customer_location;
        this.customer_mob_no = customer_mob_no;
        this.customer_whatsapp_no = customer_whatsapp_no;
        this.date = date;
        this.time = time;
        this.appointment_purpose = appointment_purpose;
        this.remarks = remarks;
        this.appointment_status = appointment_status;
        this.op1 = op1;
        this.op2 = op2;
        this.op3 = op3;
        this.op4 = op4;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getAppointment_purpose() {
        return appointment_purpose;
    }

    public void setAppointment_purpose(String appointment_purpose) {
        this.appointment_purpose = appointment_purpose;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getAppointment_status() {
        return appointment_status;
    }

    public void setAppointment_status(String appointment_status) {
        this.appointment_status = appointment_status;
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
}
