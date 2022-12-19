package in.godigioffice.app;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Build;
import android.provider.CallLog;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;

import in.godigioffice.app.ApiModel.CallLogResponse;
import in.godigioffice.app.config.ApiClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CalendarModule extends ReactContextBaseJavaModule {

    int callDuration;
    boolean back_from_calling = true;
    boolean runner_controller = false;
    boolean call_log_save_checking = true;
    boolean call_log_save_checking_onRestart = false;

    boolean call_log_save_check = false;
    boolean call_status_save_check = false;
    String callD, dateString;
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    public String getName() {
        return "CalendarModule";
    }


    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
    }

    // @ReactMethod
    // public void loginEvents(String username, String password ,Callback callBack) {
    //     Log.d("CalendarModule", "Create event called with name: " + username
    //             + " and location: " + password);
    //     Boolean eventId = true;
    //     callBack.invoke(eventId);
    // }

    
    @ReactMethod
    void dialNumber(@NonNull String number) {
        Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + number));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(intent);

    }
    @ReactMethod
    private void CallLogPicker(String phnonumber,
                               String cust_name,
                               String listid,
                               String listname,
                               String membername,
                               String memberid,
                               String cmpid,Promise result) {
        //////////////Call Logs
//        if (ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.READ_CALL_LOG) !=
//                PackageManager.PERMISSION_GRANTED) {
//
//            final int REQUEST_CODE_ASK_PERMISSIONS = 123;
//            ActivityCompat.requestPermissions(getReactApplicationContext(), new String[]{Manifest.permission.READ_CALL_LOG}, REQUEST_CODE_ASK_PERMISSIONS);
//            ActivityCompat.requestPermissions(LastDialedCallActivity.this, new String[]{Manifest.permission.WRITE_CALL_LOG}, REQUEST_CODE_ASK_PERMISSIONS);
//
//        } //else {

            //Cursor cur = context.getContentResolver().query(CallLog.Calls.CONTENT_URI, null, null, null, android.provider.CallLog.Calls.DATE + " DESC");


          /*  String[] projection = new String[]{
                    CallLog.Calls.CACHED_NAME,
                    CallLog.Calls.NUMBER,
                    CallLog.Calls.TYPE,
                    CallLog.Calls.DATE,
                    CallLog.Calls.DURATION
            };*/

            String[] projection = new String[]{
                    CallLog.Calls.DATE,
                    CallLog.Calls.DURATION,
                    CallLog.Calls.NUMBER
            };

            Cursor managedCursor = getReactApplicationContext().getContentResolver().query(CallLog.Calls.CONTENT_URI, projection, null, null, null);

            // int name1 = managedCursor.getColumnIndex(CallLog.Calls.CACHED_NAME);
            int number1 = managedCursor.getColumnIndex(CallLog.Calls.NUMBER);
            //  int type1 = managedCursor.getColumnIndex(CallLog.Calls.TYPE);
            int date1 = managedCursor.getColumnIndex(CallLog.Calls.DATE);
            int duration1 = managedCursor.getColumnIndex(CallLog.Calls.DURATION);


            while (managedCursor.moveToLast()) {
                // String name = managedCursor.getString(name1); //name
                String number = managedCursor.getString(number1); // number
                //String type = managedCursor.getString(type1); // type
                String date = managedCursor.getString(date1); // time
                @SuppressLint("SimpleDateFormat")
                // SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm");
                SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");//Capital form 24 hr denote
                dateString = formatter.format(new Date(Long.parseLong(date)));

                String duration = managedCursor.getString(duration1); // duration

               /* String dir = null;
                int dircode = Integer.parseInt(type);
                switch (dircode) {
                    case CallLog.Calls.OUTGOING_TYPE:
                        dir = "OUTGOING";
                        break;
                    case CallLog.Calls.INCOMING_TYPE:
                        dir = "INCOMING";
                        break;
                    case CallLog.Calls.MISSED_TYPE:
                        dir = "MISSED";
                        break;
                }*/
                //System.out.println("Phone_ Name" + name + "\n");
                /// System.out.println("Phone_ccNumber" + number + "\n");
                // System.out.println("Phone_type" + dir + "\n");
                System.out.println("dateString" + dateString + "\n");

                callDuration = Integer.parseInt(duration);
                int calculateMinute = callDuration / 60;
                int calculateHour = callDuration / (60 * 60);
                int calculateSecond = callDuration % 60;


                System.out.println("MyCustom_duration =  " + calculateHour + ":" + calculateMinute + ":" + calculateSecond + "\n");
                callD = calculateHour + ":" + calculateMinute + ":" + calculateSecond;

                break;
            }
            managedCursor.close();


            CallLogResponse callLogResponse = new CallLogResponse(

                    listname,
                    listid,
                   cust_name,
                   phnonumber,
                    memberid,
                    membername,
                    cmpid,
                    callDuration,
                    dateString);


            ////////////////Send Call Log to APi
            Call<CallLogResponse> call = ApiClient
                    .getInstance()
                    .getApi()
                    .callLog(callLogResponse);
            call.enqueue(new Callback<CallLogResponse>() {
                @Override
                public void onResponse(Call<CallLogResponse> call, Response<CallLogResponse> response) {
                    if (response.code() == 200) {
                        call_log_save_checking = false;
                        call_log_save_checking_onRestart = false;
                        call_log_save_check = true;

                        result.resolve("Log saved");

                       // Toast.makeText(LastDialedCallActivity.this, "Call Log Saved", Toast.LENGTH_SHORT).show();

                    } else {

                        result.resolve("Log Not saved");

                      //  Toast.makeText(LastDialedCallActivity.this, "Call Log Save Failed", Toast.LENGTH_SHORT).show();

                    }
                }

                @Override
                public void onFailure(Call<CallLogResponse> call, Throwable t) {
                    result.resolve("Log Not saved Server Error");
                }
            });


      //  }

        //////////////Call Logs
        back_from_calling = false;
    }

//    @ReactMethod(isBlockingSynchronousMethod = true)


@ReactMethod
    public void getCalldone(String listid, Promise result) throws Exception {



        Call<ArrayList<CallLogResponse>> call = ApiClient
                .getInstance()
                .getApi()
                .callLog();
        call.enqueue(new Callback<ArrayList<CallLogResponse>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<ArrayList<CallLogResponse>> call, Response<ArrayList<CallLogResponse>> response) {
                ArrayList<CallLogResponse> customerRemarksResponses = response.body();
                Log.d("listid",listid);

                for (CallLogResponse customerRemarksResponse: customerRemarksResponses
                     ) {
                    System.out.println(customerRemarksResponse.getListid());
                }

                //Set<String> noAlreadySeen = new HashSet<>();

                List<CallLogResponse> customerRemarksResponsesfilter = customerRemarksResponses
                        .stream()
                        .filter(e->e.getListid().equals(listid))


                        .collect(Collectors.toList());

               //  customerRemarksResponsesfilter.removeIf(e-> !noAlreadySeen.add(e.getCustomer_contact_no()));

             //   getCallHistoryList(customerRemarksResponsesfilter);

//                            for (CustomerRemarksResponse remarksResponse:customerRemarksResponsesfilter) {
//
//
//                            }

                String json_user_string = new Gson().toJson(customerRemarksResponsesfilter);
               // String json_user_string_mod=json_user_string.substring(1,json_user_string.length()-1);
                Log.d("call_history",json_user_string);
                result.resolve(json_user_string);

            }

            @Override
            public void onFailure(Call<ArrayList<CallLogResponse>> call, Throwable t) {
               // progressDialog.dismiss();
                //Toast.makeText(reactContext, "Server not Respond! check Internet Connection", Toast.LENGTH_SHORT).show();
            }
        });
    }


    @ReactMethod
    public void showdata(String listdata, Promise result) throws Exception {

        result.resolve(listdata);

    }

}