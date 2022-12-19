package in.godigioffice.app.ApiModel;

public class CallStatusResponse {

    String id;
    String status_name;
    String cmpid;

    public CallStatusResponse(String id, String status_name, String cmpid) {
        this.id = id;
        this.status_name = status_name;
        this.cmpid = cmpid;
    }

    public String getCmpid() {
        return cmpid;
    }

    public void setCmpid(String cmpid) {
        this.cmpid = cmpid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus_name() {
        return status_name;
    }

    public void setStatus_name(String status_name) {
        this.status_name = status_name;
    }
}
