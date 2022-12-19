package in.godigioffice.app.models;

public class ListNameIDModel {

    String ListName;
    String list_id;

    public ListNameIDModel(String listName, String list_id) {
        ListName = listName;
        this.list_id = list_id;
    }

    public String getListName() {
        return ListName;
    }

    public void setListName(String listName) {
        ListName = listName;
    }

    public String getList_id() {
        return list_id;
    }

    public void setList_id(String list_id) {
        this.list_id = list_id;
    }
}
