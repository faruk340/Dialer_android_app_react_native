package in.godigioffice.app.ApiModel;

import java.util.Date;

public class CustomerRemarksResponse {


    String id;
    String list_name;
    String listid;
    String customer_name;
    String customer_contact_no;
    String member_id;
    String member_name;
    String cmpid;
    String status;
    String remarks;
    Date createdAt;
    String customer_whatsapp_no;
    String customer_location;

    String op1;
    String op2;
    String op3;
    String op4;

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

    public CustomerRemarksResponse(String list_name, String listid, String customer_name, String customer_contact_no, String member_id,
                                   String member_name, String cmpid, String status, String remarks, String customer_whatsapp_no,
                                   String customer_location, String op1, String op2, String op3, String op4) {
        this.list_name = list_name;
        this.listid = listid;
        this.customer_name = customer_name;
        this.customer_contact_no = customer_contact_no;
        this.member_id = member_id;
        this.member_name = member_name;
        this.cmpid = cmpid;
        this.status = status;
        this.remarks = remarks;
        this.customer_whatsapp_no = customer_whatsapp_no;
        this.customer_location = customer_location;
        this.op1=op1;
        this.op2=op2;
        this.op3=op3;
        this.op4=op4;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getList_name() {
        return list_name;
    }

    public void setList_name(String list_name) {
        this.list_name = list_name;
    }

    public String getListid() {
        return listid;
    }

    public void setListid(String listid) {
        this.listid = listid;
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

    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
    }

    public String getCmpid() {
        return cmpid;
    }

    public void setCmpid(String cmpid) {
        this.cmpid = cmpid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCustomer_whatsapp_no() {
        return customer_whatsapp_no;
    }

    public void setCustomer_whatsapp_no(String customer_whatsapp_no) {
        this.customer_whatsapp_no = customer_whatsapp_no;
    }

    public String getCustomer_location() {
        return customer_location;
    }

    public void setCustomer_location(String customer_location) {
        this.customer_location = customer_location;
    }
}
