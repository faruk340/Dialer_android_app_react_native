package in.godigioffice.app;

import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import in.godigioffice.app.ApiModel.CallStatusResponse;
import in.godigioffice.app.ApiModel.CustomerAppointmentResponse;
import in.godigioffice.app.ApiModel.CustomerDetails;
import in.godigioffice.app.ApiModel.CustomerRemarksResponse;
import in.godigioffice.app.ApiModel.MemberListResponse;
import in.godigioffice.app.ApiModel.ReminderResponse;
import in.godigioffice.app.config.ApiClient;
import in.godigioffice.app.models.StatusModel;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CustomerCreateModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static boolean isAuthenticated=false;
    private  ArrayList<MemberListResponse> globalmemberlist;

    CustomerCreateModule(ReactApplicationContext context) {
       super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomerCreateModule";
    }

    @ReactMethod
    public void createCustomer(String customerdetailsjson, Promise result) throws Exception {
        String json_user_string_mod=customerdetailsjson.substring(1,customerdetailsjson.length()-1);

        CustomerDetails customerDetails
                = new Gson().fromJson(json_user_string_mod,
                CustomerDetails.class);



                           Call<CustomerDetails> call = ApiClient
                                                                    .getInstance()
                                                                    .getApi()
                                                                    .createContact(customerDetails);

                                                            call.enqueue(new Callback<CustomerDetails>() {
                                                                @Override
                                                                public void onResponse(Call<CustomerDetails> call, Response<CustomerDetails> response) {
                                                                    if (response.code() == 200) {
                                                                        // Do awesome stuff

                                                                                 result.resolve("Successfully Saved");

                                                                      //  Toast.makeText(getContext(), "Successfully Saved", Toast.LENGTH_SHORT).show();
                                                                    } else {
                                                                        // Handle other response codes
                                                                       // Toast.makeText(getContext(), "Failed", Toast.LENGTH_SHORT).show();
                                                                    }
                                                                }

                                                                @Override
                                                                public void onFailure(Call<CustomerDetails> call, Throwable t) {
                                                                   // Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();

                                                                }
                                                            });
    }


    @ReactMethod
    public void skipCall(String customerRemarksResponsejson, Promise result) throws Exception {


        String json_user_string_mod=customerRemarksResponsejson.substring(1,customerRemarksResponsejson.length()-1);
        CustomerRemarksResponse customerRemarksResponse
                = new Gson().fromJson(json_user_string_mod,
                CustomerRemarksResponse.class);

        Call<CustomerRemarksResponse> call = ApiClient
                .getInstance()
                .getApi()
                .customerRemarks(customerRemarksResponse);
        call.enqueue(new Callback<CustomerRemarksResponse>() {
            @Override
            public void onResponse(Call<CustomerRemarksResponse> call, Response<CustomerRemarksResponse> response) {

                if (response.code() == 200) {
                    // Do awesome stuff
                    result.resolve("Success");

                } else {
                    // Handle other response codes
                   // Toast.makeText(getContext(), "Failed to Skip", Toast.LENGTH_SHORT).show();

                }

            }

            @Override
            public void onFailure(Call<CustomerRemarksResponse> call, Throwable t) {
                result.resolve("Not Saved");

              //Toast.makeText(getContext(), "Server not Respond", Toast.LENGTH_SHORT).show();

            }
        });
    }


    @ReactMethod
    public void createAppointment(String  createAppointmentjson, Promise result) throws Exception {


//        for (CustomerAppointmentResponse customerAppointmentResponse:createAppointmentjson
//             ) {
//            System.out.println(customerAppointmentResponse.getAppointment_purpose());
//        }
//        for (int i = 0; i < createAppointmentjson.length(); i++) {
//
//            JSONObject object=new JSONObject();
//
//            System.out.println(object.get("Purpose"));
//
//        }

        String json_user_string_mod=createAppointmentjson.substring(1,createAppointmentjson.length()-1);
        System.out.println("request:"+json_user_string_mod);
        CustomerAppointmentResponse customerAppointmentResponse
                = new Gson().fromJson(json_user_string_mod,
                CustomerAppointmentResponse.class);

        System.out.println("list_id:"+customerAppointmentResponse.getList_id());

      //  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        //Date date = Date.parse(string, formatter);
        CustomerAppointmentResponse customerAppointmentResponse_rq =
                new CustomerAppointmentResponse(
                customerAppointmentResponse.getCmpid(),
                customerAppointmentResponse.getList_id(),
                Objects.requireNonNull(customerAppointmentResponse.getCustomer_name()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getCustomer_location()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getCustomer_mob_no()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getCustomer_whatsapp_no()).toString(),
                customerAppointmentResponse.getMember_name(),
                customerAppointmentResponse.getAppointment_date_time(),
                customerAppointmentResponse.getAppointment_purpose(),
                Objects.requireNonNull(customerAppointmentResponse.getAppointment_remarks()).toString(),
                customerAppointmentResponse.getAppointment_status().toString(),
                customerAppointmentResponse.getMember_id(),
                customerAppointmentResponse.getList_name(),
                Objects.requireNonNull(customerAppointmentResponse.getApp_time()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getOp1()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getOp2()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getOp3()).toString(),
                Objects.requireNonNull(customerAppointmentResponse.getOp4()).toString());









        //Log.d("request",customerAppointmentResponse);
        Call<CustomerAppointmentResponse> call = ApiClient
                .getInstance()
                .getApi()
                .customerAppointment(customerAppointmentResponse_rq);
        call.enqueue(new Callback<CustomerAppointmentResponse>() {
            @Override
            public void onResponse(Call<CustomerAppointmentResponse> call, Response<CustomerAppointmentResponse> response) {

                if (response.code() == 200) {
                    // Do awesome stuff
                    result.resolve("Success");

                } else {
                    // Handle other response codes
                    // Toast.makeText(getContext(), "Failed to Skip", Toast.LENGTH_SHORT).show();

                }

            }

            @Override
            public void onFailure(Call<CustomerAppointmentResponse> call, Throwable t) {
                result.resolve("Not Saved");

                //Toast.makeText(getContext(), "Server not Respond", Toast.LENGTH_SHORT).show();

            }
        });

    }





    @ReactMethod
    public void createFollowup(String  createFollowupjson, Promise result) throws Exception {


//        for (CustomerAppointmentResponse customerAppointmentResponse:createAppointmentjson
//             ) {
//            System.out.println(customerAppointmentResponse.getAppointment_purpose());
//        }
//        for (int i = 0; i < createAppointmentjson.length(); i++) {
//
//            JSONObject object=new JSONObject();
//
//            System.out.println(object.get("Purpose"));
//
//        }

        String json_user_string_mod=createFollowupjson.substring(1,createFollowupjson.length()-1);
        System.out.println("request:"+json_user_string_mod);
        ReminderResponse customerFollowupResponse
                = new Gson().fromJson(json_user_string_mod,
                ReminderResponse.class);

        System.out.println("list_id:"+customerFollowupResponse.getList_id());

        //  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        //Date date = Date.parse(string, formatter);
        ReminderResponse reminderResponse = new ReminderResponse(
                Objects.requireNonNull(customerFollowupResponse.getCustomer_name()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getCustomer_location()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getCustomer_mob_no()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getCustomer_whatsapp_no()).toString(),
                customerFollowupResponse.getMember_name(),
                customerFollowupResponse.getAppointment_date(),
                customerFollowupResponse.getAppointment_time(),

                customerFollowupResponse.getReminder_date(),
                Objects.requireNonNull(customerFollowupResponse.getReminder_time()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getReminder_remarks()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getReminder_status()).toString(),
                customerFollowupResponse.getCmpid(),
                customerFollowupResponse.getList_id(),
                customerFollowupResponse.getMember_id(),
                customerFollowupResponse.getList_name(),
                Objects.requireNonNull(customerFollowupResponse.getOp1()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getOp2()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getOp3()).toString(),
                Objects.requireNonNull(customerFollowupResponse.getOp4()).toString());









        //Log.d("request",customerAppointmentResponse);

        Call<ReminderResponse> call = ApiClient
                .getInstance()
                .getApi()
                .reminder(reminderResponse);
        call.enqueue(new Callback<ReminderResponse>() {
            @Override
            public void onResponse(Call<ReminderResponse> call, Response<ReminderResponse> response) {
                if (response.code() == 200) {
                    // Do awesome stuff


                    result.resolve("success");
                   // Toast.makeText(FollowUpActivity.this, "Successfully Saved", Toast.LENGTH_SHORT).show();

                    ///////////////After Save reminder to the API

                    //////////Calling Reminder Api(reminder)



                    ///////////////After Save reminder to the API


                } else {

                    result.resolve("error"+response.code());
                    // Handle other response codes
                  //  Toast.makeText(FollowUpActivity.this, "Failed", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ReminderResponse> call, Throwable t) {
                result.resolve("error");
             //   Toast.makeText(FollowUpActivity.this, "Server Not Responding", Toast.LENGTH_SHORT).show();
            }
        });

    }


    @ReactMethod
    public void createRemaksResponseup(String  createRemarksjson, Promise result) throws Exception {


//        for (CustomerAppointmentResponse customerAppointmentResponse:createAppointmentjson
//             ) {
//            System.out.println(customerAppointmentResponse.getAppointment_purpose());
//        }
//        for (int i = 0; i < createAppointmentjson.length(); i++) {
//
//            JSONObject object=new JSONObject();
//
//            System.out.println(object.get("Purpose"));
//
//        }

        String json_user_string_mod=createRemarksjson.substring(1,createRemarksjson.length()-1);
        System.out.println("request:"+json_user_string_mod);
        CustomerRemarksResponse customerRemarksResponseobj
                = new Gson().fromJson(json_user_string_mod,
                CustomerRemarksResponse.class);

        System.out.println("list_id:"+customerRemarksResponseobj.getListid());

        //  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        //Date date = Date.parse(string, formatter);
        CustomerRemarksResponse customerRemarksResponse = new CustomerRemarksResponse(
                customerRemarksResponseobj.getList_name(),
                customerRemarksResponseobj.getListid(),
                customerRemarksResponseobj.getCustomer_name(),
                customerRemarksResponseobj.getCustomer_contact_no(),
                customerRemarksResponseobj.getMember_id(),
                customerRemarksResponseobj.getMember_name(),
                customerRemarksResponseobj.getCmpid(),
                customerRemarksResponseobj.getStatus(),
                customerRemarksResponseobj.getRemarks(),
                customerRemarksResponseobj.getCustomer_whatsapp_no(),
                customerRemarksResponseobj.getCustomer_location(),
                customerRemarksResponseobj.getOp1(),
                customerRemarksResponseobj.getOp2(),
                customerRemarksResponseobj.getOp3(),
                customerRemarksResponseobj.getOp4());









        //Log.d("request",customerAppointmentResponse);

        Call<CustomerRemarksResponse> call = ApiClient
                .getInstance()
                .getApi()
                .customerRemarks(customerRemarksResponse);
        call.enqueue(new Callback<CustomerRemarksResponse>() {
            @Override
            public void onResponse(Call<CustomerRemarksResponse> call, Response<CustomerRemarksResponse> response) {

                if (response.code() == 200) {

                    result.resolve("success");

                   // call_status_save_check = true;
                    // Do awesome stuff
                   // remarks.setText("");
                   // Toast.makeText(LastDialedCallActivity.this, "Remarks/Call Status Saved", Toast.LENGTH_SHORT).show();
                } else {
                    result.resolve("failed");

                    // Handle other response codes
                    //Toast.makeText(LastDialedCallActivity.this, "Failed to Save", Toast.LENGTH_SHORT).show();
                }

            }

            @Override
            public void onFailure(Call<CustomerRemarksResponse> call, Throwable t) {
                result.resolve("failed");
            }
        });

    }

     @ReactMethod
    public void getStatus(String cmpid,Promise result)  {

         Call<ArrayList<CallStatusResponse>> call = ApiClient
                .getInstance()
                .getApi()
                .callStatusList();
        call.enqueue(new Callback<ArrayList<CallStatusResponse>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<ArrayList<CallStatusResponse>> call, Response<ArrayList<CallStatusResponse>> response) {
                ArrayList<CallStatusResponse> statusModelArrayList = response.body();

               // Set<CallStatusResponse> status_set=new HashSet<CallStatusResponse>();
                 List<CallStatusResponse> statusres = statusModelArrayList
                         .stream().distinct()

                        // .filter(ele -> ele.getCmpid().equals(cmpid))
                         .collect(Collectors.toList());

                for(CallStatusResponse status:statusModelArrayList){

                    

                }

             //   getCallHistoryList(customerRemarksResponsesfilter);

//                            for (CustomerRemarksResponse remarksResponse:customerRemarksResponsesfilter) {
//
//
//                            }

                String json_user_string = new Gson().toJson(statusres);
              //  String json_user_string_mod=json_user_string.substring(1,json_user_string.length()-1);
                Log.d("status",json_user_string);
                result.resolve(json_user_string);

            }

            @Override
            public void onFailure(Call<ArrayList<CallStatusResponse>> call, Throwable t) {
               // progressDialog.dismiss();
                Toast.makeText(reactContext, "Server not Respond! check Internet Connection", Toast.LENGTH_SHORT).show();
            }
        });



    }

    @ReactMethod
    public void getReminder(String listid,Promise result)  {

        Call<ArrayList<ReminderResponse>> call = ApiClient
                .getInstance()
                .getApi()
                .getReminder();
        call.enqueue(new Callback<ArrayList<ReminderResponse>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<ArrayList<ReminderResponse>> call, Response<ArrayList<ReminderResponse>> response) {
                ArrayList<ReminderResponse> rendrList = response.body();

                List<ReminderResponse> rndrListFilter = rendrList
                        .stream()
                        .filter(ele -> ele.getList_id().equals(listid) )
                        .collect(Collectors.toList());

                //   getCallHistoryList(customerRemarksResponsesfilter);

//                            for (CustomerRemarksResponse remarksResponse:customerRemarksResponsesfilter) {
//
//
//                            }

                String json_user_string = new Gson().toJson(rndrListFilter);
              //  String json_user_string_mod=json_user_string.substring(1,json_user_string.length()-1);
                Log.d("status",json_user_string);
                result.resolve(json_user_string);

            }

            @Override
            public void onFailure(Call<ArrayList<ReminderResponse>> call, Throwable t) {
                // progressDialog.dismiss();
                Toast.makeText(reactContext, "Server not Respond! check Internet Connection", Toast.LENGTH_SHORT).show();
            }
        });



    }
}