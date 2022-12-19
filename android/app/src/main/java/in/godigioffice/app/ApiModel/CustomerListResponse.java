package in.godigioffice.app.ApiModel;

import com.google.gson.annotations.SerializedName;

public class CustomerListResponse {

    /* we have to keep same [ Array name ] which come from Response[API Response] if
    we want to change name then we have to use  @SerializedName("message")  Annotation
    , because Json do Mapping mean matching Response  with [ Array name which here define like String name ]
     if name not same then show error or
    check Annotation are present or not , if name is different but Annotation present
    then Error not give and work fine.

    */

    @SerializedName("customerlist")
    CustomerDetails customerDetails[]; ///customerDetails



    String list_name;

    @SerializedName("_id")
    String id;

    public CustomerListResponse() {

    }

    public CustomerListResponse(CustomerDetails[] customerDetails, String list_name, String id) {
        this.customerDetails = customerDetails;
        this.list_name = list_name;

        this.id = id;
    }

    public CustomerListResponse(String list_name, String id) {

        this.list_name = list_name;
        this.id = id;
    }

    public CustomerDetails[] getCustomerDetails() {
        return customerDetails;
    }

    public void setCustomerDetails(CustomerDetails[] customerDetails) {
        this.customerDetails = customerDetails;
    }

    public String getList_name() {
        return list_name;
    }

    public void setList_name(String list_name) {
        this.list_name = list_name;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
