package in.godigioffice.app.ApiModel;

import com.google.gson.annotations.SerializedName;

public class MemberListResponse {
    @SerializedName("customerlist")
    CustomerListResponse[] customerListResponse; ///customerListResponse

    String member_name;
    String member_location;
    String member_mob_no;
    String cmpid;
    @SerializedName("id")
    String member_id;
    String member_mail;

    String member_skip_call;

    public String getMember_skip_call() {
        return member_skip_call;
    }

    public void setMember_skip_call(String member_skip_call) {
        this.member_skip_call = member_skip_call;
    }

    public String getMember_mail() {
        return member_mail;
    }

    public void setMember_mail(String member_mail) {
        this.member_mail = member_mail;
    }

    String email;

    String password;


    public MemberListResponse(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public MemberListResponse() {

    }

    public MemberListResponse(CustomerListResponse[] customerListResponse, String member_name, String member_location, String member_mob_no, String cmpid, String member_id) {
        this.customerListResponse = customerListResponse;
        this.member_name = member_name;
        this.member_location = member_location;
        this.member_mob_no = member_mob_no;
        this.cmpid = cmpid;
        this.member_id = member_id;
    }

    public CustomerListResponse[] getCustomerListResponse() {
        return customerListResponse;
    }

    public void setCustomerListResponse(CustomerListResponse[] customerListResponse) {
        this.customerListResponse = customerListResponse;
    }

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
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

    public String getCmpid() {
        return cmpid;
    }

    public void setCmpid(String cmpid) {
        this.cmpid = cmpid;
    }

    public String getMember_id() {
        return member_id;
    }

    public void setMember_id(String member_id) {
        this.member_id = member_id;
    }
}
