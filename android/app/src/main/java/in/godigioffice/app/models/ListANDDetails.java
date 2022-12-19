package in.godigioffice.app.models;

import java.util.ArrayList;

public class ListANDDetails {

    ArrayList<String> customer_list_array;
    ArrayList<DetailModel> detailModelArrayList;


    public ListANDDetails(ArrayList<String> customer_list_array, ArrayList<DetailModel> detailModelArrayList) {
        this.customer_list_array = customer_list_array;
        this.detailModelArrayList = detailModelArrayList;
    }

    public ArrayList<String> getCustomer_list_array() {
        return customer_list_array;
    }

    public void setCustomer_list_array(ArrayList<String> customer_list_array) {
        this.customer_list_array = customer_list_array;
    }

    public ArrayList<DetailModel> getDetailModelArrayList() {
        return detailModelArrayList;
    }

    public void setDetailModelArrayList(ArrayList<DetailModel> detailModelArrayList) {
        this.detailModelArrayList = detailModelArrayList;
    }
}
