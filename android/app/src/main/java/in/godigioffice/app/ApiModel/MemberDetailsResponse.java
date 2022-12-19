package in.godigioffice.app.ApiModel;

import com.google.gson.annotations.SerializedName;

public class MemberDetailsResponse {

    String  id ;
    String cmpid;
    String member_name ;
    String member_designation;
    String member_location;
    String member_mob_no;
    String member_mail;
    //member_uid: String;
    String member_password ;
    String member_crm_access ;
    String member_skip_call;
    String member_status;
  
    String type;
    @SerializedName("customerlist")
    CustomerListResponse customerList[];

    public MemberDetailsResponse(String id, String cmpid, String member_name, String member_designation, String member_location, String member_mob_no, String member_mail, String member_password, String member_crm_access, String member_skip_call, String member_status, String type, CustomerListResponse[] customerList) {
        this.id = id;
        this.cmpid = cmpid;
        this.member_name = member_name;
        this.member_designation = member_designation;
        this.member_location = member_location;
        this.member_mob_no = member_mob_no;
        this.member_mail = member_mail;
        this.member_password = member_password;
        this.member_crm_access = member_crm_access;
        this.member_skip_call = member_skip_call;
        this.member_status = member_status;
        this.type = type;
        this.customerList = customerList;
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

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
    }

    public String getMember_designation() {
        return member_designation;
    }

    public void setMember_designation(String member_designation) {
        this.member_designation = member_designation;
    }

    public String getMember_location() {
        return member_location;
    }

    public void setMember_location(String member_location) {
        this.member_location = member_location;
    }

    public String getMember_mob_no() {
        return member_mob_no;
    }

    public void setMember_mob_no(String member_mob_no) {
        this.member_mob_no = member_mob_no;
    }

    public String getMember_mail() {
        return member_mail;
    }

    public void setMember_mail(String member_mail) {
        this.member_mail = member_mail;
    }

    public String getMember_password() {
        return member_password;
    }

    public void setMember_password(String member_password) {
        this.member_password = member_password;
    }

    public String getMember_crm_access() {
        return member_crm_access;
    }

    public void setMember_crm_access(String member_crm_access) {
        this.member_crm_access = member_crm_access;
    }

    public String getMember_skip_call() {
        return member_skip_call;
    }

    public void setMember_skip_call(String member_skip_call) {
        this.member_skip_call = member_skip_call;
    }

    public String getMember_status() {
        return member_status;
    }

    public void setMember_status(String member_status) {
        this.member_status = member_status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public CustomerListResponse[] getCustomerList() {
        return customerList;
    }

    public void setCustomerList(CustomerListResponse[] customerList) {
        this.customerList = customerList;
    }
}
