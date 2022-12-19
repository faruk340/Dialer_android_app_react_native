package in.godigioffice.app.ApiModel;

import java.util.Date;

public class CallLogResponse {


    String id;
    String list_name;
    String listid;
    String customer_name;
    String customer_contact_no;
    String member_id;
    String member_name;
    String cmpid;

    int callduration;
    String calltime;

    Date createdAt;


    public CallLogResponse(String list_name, String listid, String customer_name, String customer_contact_no, String member_id, String member_name, String cmpid, int callduration, String calltime, Date createdAt) {
        this.list_name = list_name;
        this.listid = listid;
        this.customer_name = customer_name;
        this.customer_contact_no = customer_contact_no;
        this.member_id = member_id;
        this.member_name = member_name;
        this.cmpid = cmpid;
        this.callduration = callduration;
        this.calltime = calltime;
        this.createdAt = createdAt;
    }

    public CallLogResponse(String list_name, String listid, String customer_name, String customer_contact_no, String member_id, String member_name, String cmpid, int callduration, String calltime) {
        this.list_name = list_name;
        this.listid = listid;
        this.customer_name = customer_name;
        this.customer_contact_no = customer_contact_no;
        this.member_id = member_id;
        this.member_name = member_name;
        this.cmpid = cmpid;
        this.callduration = callduration;
        this.calltime = calltime;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
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

    public int getCallduration() {
        return callduration;
    }

    public void setCallduration(int callduration) {
        this.callduration = callduration;
    }

    public String getCalltime() {
        return calltime;
    }

    public void setCalltime(String calltime) {
        this.calltime = calltime;
    }
}


