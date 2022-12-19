package in.godigioffice.app.models;

public class StatusModel {




    String id;
    String cmpid;
    String status;
    String status_colour;


    public StatusModel(String id, String cmpid, String status, String status_colour) {
        this.id = id;
        this.cmpid = cmpid;
        this.status = status;
        this.status_colour = status_colour;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus_colour() {
        return status_colour;
    }

    public void setStatus_colour(String status_colour) {
        this.status_colour = status_colour;
    }
}
