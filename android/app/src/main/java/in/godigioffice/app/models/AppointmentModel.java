package in.godigioffice.app.models;

public class AppointmentModel {





    String id;
    String customer_name;
    String customer_location;
    String customer_mob_no;
    String customer_whatsapp_no;
    String team_name;
    String member_name;
    String appointment_date_time;
    String appointment_purpose;
    String appointment_remarks;
    String appointment_status;


    public AppointmentModel(String id, String customer_name, String customer_location,
                            String customer_mob_no, String customer_whatsapp_no, String team_name,
                            String member_name, String appointment_date_time, String appointment_purpose,
                            String appointment_remarks, String appointment_status) {
        this.id = id;
        this.customer_name = customer_name;
        this.customer_location = customer_location;
        this.customer_mob_no = customer_mob_no;
        this.customer_whatsapp_no = customer_whatsapp_no;
        this.team_name = team_name;
        this.member_name = member_name;
        this.appointment_date_time = appointment_date_time;
        this.appointment_purpose = appointment_purpose;
        this.appointment_remarks = appointment_remarks;
        this.appointment_status = appointment_status;
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

    public String getAppointment_date_time() {
        return appointment_date_time;
    }

    public void setAppointment_date_time(String appointment_date_time) {
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
}
