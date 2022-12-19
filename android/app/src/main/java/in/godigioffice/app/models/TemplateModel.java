package in.godigioffice.app.models;

public class TemplateModel {

    String id;
    String cmpid;
    String template_name;
    String template_body;

    public TemplateModel(String id, String cmpid, String template_name, String template_body) {
        this.id = id;
        this.cmpid = cmpid;
        this.template_name = template_name;
        this.template_body = template_body;
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

    public String getTemplate_name() {
        return template_name;
    }

    public void setTemplate_name(String template_name) {
        this.template_name = template_name;
    }

    public String getTemplate_body() {
        return template_body;
    }

    public void setTemplate_body(String template_body) {
        this.template_body = template_body;
    }
}
