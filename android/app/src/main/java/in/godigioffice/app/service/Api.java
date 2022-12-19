package in.godigioffice.app.service;


import in.godigioffice.app.ApiModel.CallLogResponse;
import in.godigioffice.app.ApiModel.CallStatusResponse;
import in.godigioffice.app.ApiModel.CustomerAppointmentResponse;
import in.godigioffice.app.ApiModel.CustomerDetails;
import in.godigioffice.app.ApiModel.CustomerListResponse;
import in.godigioffice.app.ApiModel.CustomerRemarksResponse;
import in.godigioffice.app.ApiModel.MemberListResponse;
import in.godigioffice.app.ApiModel.ReminderResponse;
import in.godigioffice.app.ApiModel.UserDetailsResponse;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface Api {



    @GET("customer")
    Call<ArrayList<CustomerListResponse>> simpleResponse(


    );


    @GET("member")
    Call<ArrayList<MemberListResponse>> memberList();



    @GET("customstatus")
    Call<ArrayList<CallStatusResponse>> callStatusList();


    @POST("customerlistreport")
    Call<CustomerRemarksResponse> customerRemarks(
            @Body CustomerRemarksResponse customerRemarksResponse

            );


    @POST("appointment")
    Call<CustomerAppointmentResponse> customerAppointment(
            @Body CustomerAppointmentResponse customerAppointmentResponse

    );


    @POST("customer/add")
    Call<CustomerDetails> createContact(
            @Body CustomerDetails createCustomer

    );


    @POST("reminder")
    Call<ReminderResponse> reminder (
            @Body ReminderResponse reminderResponse

    );

    @POST("customercall")
    Call<CallLogResponse> callLog(
            @Body CallLogResponse callLog

    );

    @GET("customercall")
    Call<ArrayList<CallLogResponse>> callLog();

    ///////////////////////////Call History
    @GET("customerlistreport")
    Call<ArrayList<CustomerRemarksResponse>> getCallHistory();


    @GET("reminder")
    Call<ArrayList<ReminderResponse>> getReminder();

    @GET("appointment")
    Call<ArrayList<CustomerAppointmentResponse>> getAppointment();

    ///auth

    @POST("member/validatemember/android")
    Call<ArrayList<MemberListResponse>> memberAuth(
            @Body MemberListResponse memberListResponse);

    @GET("user/authlogin/{cmpid}")
    Call<ArrayList<UserDetailsResponse>> getUserResponse(@Path("cmpid") String cmpid);
}
