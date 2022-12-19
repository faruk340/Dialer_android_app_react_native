package in.godigioffice.app.models;

public class DataListNameModel {


    String data_List_Name;
    String data_list_id;

    public DataListNameModel(String data_List_Name, String data_list_id) {
        this.data_List_Name = data_List_Name;
        this.data_list_id = data_list_id;
    }

    public String getData_List_Name() {
        return data_List_Name;
    }

    public void setData_List_Name(String data_List_Name) {
        this.data_List_Name = data_List_Name;
    }

    public String getData_list_id() {
        return data_list_id;
    }

    public void setData_list_id(String data_list_id) {
        this.data_list_id = data_list_id;
    }
}
