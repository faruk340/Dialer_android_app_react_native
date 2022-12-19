package in.godigioffice.app.models;

import java.util.Date;

public class ReminderModel {


    String name;
    String phoneNumber;
    Date date;
    String time;
    String remarks;
    String whatsapp_no;
    String c_location;

    String op1;
    String op2;
    String op3;
    String op4;

    public ReminderModel(String name, String phoneNumber, Date date, String time, String remarks, String whatsapp_no, String c_location,
                         String op1,String op2,String op3,String op4) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.date = date;
        this.time = time;
        this.remarks = remarks;
        this.whatsapp_no = whatsapp_no;
        this.c_location = c_location;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getWhatsapp_no() {
        return whatsapp_no;
    }

    public void setWhatsapp_no(String whatsapp_no) {
        this.whatsapp_no = whatsapp_no;
    }

    public String getC_location() {
        return c_location;
    }

    public void setC_location(String c_location) {
        this.c_location = c_location;
    }
}
