package in.godigioffice.app.service;


import android.os.Build;

import androidx.annotation.RequiresApi;

import in.godigioffice.app.ApiModel.CallStatusResponse;
import in.godigioffice.app.ApiModel.CustomerDetails;
import in.godigioffice.app.ApiModel.CustomerListResponse;
import in.godigioffice.app.ApiModel.MemberListResponse;
import in.godigioffice.app.config.ApiClient;
import in.godigioffice.app.helper.Constants;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ImplMemberResponse {

    public static List<MemberListResponse> member_name_list_array;
    public static List<MemberListResponse> member_name_list_array1;

    public static List<CustomerListResponse> customer_list_array;
    public static List<CustomerListResponse> customer_list_array1;

    public static List<CustomerDetails> detailModelArrayList;



    ////////////for Call Status
    public static List<CallStatusResponse> callStatus_list_array=new ArrayList<>();


    public static List<CustomerListResponse> MemberInfo() {


        member_name_list_array=new ArrayList<>();
        member_name_list_array1=new ArrayList<>();

        customer_list_array=new ArrayList<>();
        customer_list_array1=new ArrayList<>();


        Call<ArrayList<MemberListResponse>> call= ApiClient
                .getInstance()
                .getApi()
                .memberList();

        call.enqueue(new Callback<ArrayList<MemberListResponse>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<ArrayList<MemberListResponse>> call, Response<ArrayList<MemberListResponse>> response) {
                ArrayList<MemberListResponse> memberListResponses = response.body();

                for ( MemberListResponse simpleResponse1:memberListResponses) {
                    //System.out.println("meberList"+simpleResponse1.getMember_name());
                    member_name_list_array.add(simpleResponse1);
                }

                member_name_list_array1=member_name_list_array.stream().
                        filter(ele -> ele.getMember_name().equals("Anirban Purkait")).collect(Collectors.toList());





                for (int i=0;i<member_name_list_array1.size();i++) {
                    // System.out.println("Name_hhh = "+member_name_list_array1.get(i).getMember_name()+"\n");
                    Constants constants=Constants.getInstance();
                    constants.setCmpid(member_name_list_array1.get(i).getCmpid());
                    constants.setMember_id(member_name_list_array1.get(i).getMember_id());
                    constants.setMemberName(member_name_list_array1.get(i).getMember_name());




                    for (CustomerListResponse customerListResponse:member_name_list_array1.get(i).getCustomerListResponse()) {
                        customer_list_array.add(customerListResponse);
                    }

                }




                 /*try {
//                                JSONArray jsonArray = new JSONArray(response.body());
//                                JSONObject object = jsonArray.getJSONObject(0);
//                                // JSONObject sendingReqDataSetObject = object.getJSONObject("sendingReqDataSet");
//                                // JSONArray arrayContacts = object.getJSONArray("customerlist");
//
//                                for (int i = 0; i<jsonArray.length(); i++) {
//                                    JSONObject contactObject = jsonArray.getJSONObject(i);
//                                    System.out.println("hfjsjfhs"+contactObject.getString("list_name"));
//                                }
//                            } catch (JSONException e) {
//                                e.printStackTrace();
//                            }*/
            }

            @Override
            public void onFailure(Call<ArrayList<MemberListResponse>> call, Throwable t) {

            }
        });



    return  customer_list_array;



    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public static List<CustomerDetails> getCustomerDetails(String listname){


        detailModelArrayList=new ArrayList<>();
      //  list_name_from_home=listname;





        customer_list_array1=customer_list_array.stream().
                filter(ele->ele.getList_name().equals(listname)).collect(Collectors.toList());

        for (int i=0;i<customer_list_array1.size();i++) {
            // System.out.println("Name_hhh = "+member_name_list_array1.get(i).getMember_name()+"\n");
            for (CustomerDetails customerDetails:customer_list_array1.get(i).getCustomerDetails()) {
                detailModelArrayList.add(customerDetails);
            }

            //   System.out.println("Contact_number = "+member_name_list_array1.get(i).getCustomerListResponse()+"\n");
        }


      /*  for (int i=0;i<detailModelArrayList.size();i++){
            System.out.println("Name = "+detailModelArrayList.get(i).getCustomer_name());
            System.out.println("Contact_number = "+detailModelArrayList.get(i).getCustomer_contact_no());
            System.out.println("Location = "+detailModelArrayList.get(i).getCustomer_location());

            System.out.println("whasapp no = "+detailModelArrayList.get(i).getCustomer_whatsapp_no());
            System.out.println("yom = "+detailModelArrayList.get(i).getYom());
            System.out.println("reg_no = "+detailModelArrayList.get(i).getReg_no());

            System.out.println("make model = "+detailModelArrayList.get(i).getMake_model());
            System.out.println("insurance-exp-date = "+detailModelArrayList.get(i).getInsurance_exp_date());

        }*/

        return  detailModelArrayList;
    }

    public static List<CallStatusResponse> getCallStatusList() {

        Call<ArrayList<CallStatusResponse>> call= ApiClient
                .getInstance()
                .getApi()
                .callStatusList();

        call.enqueue(new Callback<ArrayList<CallStatusResponse>>() {
            @Override
            public void onResponse(Call<ArrayList<CallStatusResponse>> call, Response<ArrayList<CallStatusResponse>> response) {
                ArrayList<CallStatusResponse> callStatusResponses = response.body();

                for ( CallStatusResponse callStatusResponse1:callStatusResponses) {
                   // System.out.println("callStatusName"+callStatusResponse.getStatus_name());
                    callStatus_list_array.add(callStatusResponse1);
                }


                for (int i=0;i<callStatus_list_array.size();i++) {
                    System.out.println("List_name_: "+callStatus_list_array.get(i).getStatus_name());

                }



            }



            @Override
            public void onFailure(Call<ArrayList<CallStatusResponse>> call, Throwable t) {

            }
        });



        return callStatus_list_array;

    }







}
