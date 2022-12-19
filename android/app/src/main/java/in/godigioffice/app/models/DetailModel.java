package in.godigioffice.app.models;

public class DetailModel {

    String customer_name;
    String customer_contact_no;
    String customer_location;

    public DetailModel(String customer_name, String customer_contact_no, String customer_location) {
        this.customer_name = customer_name;
        this.customer_contact_no = customer_contact_no;
        this.customer_location = customer_location;
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
}
