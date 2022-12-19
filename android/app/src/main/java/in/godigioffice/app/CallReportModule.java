package in.godigioffice.app;

import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import in.godigioffice.app.ApiModel.CustomerRemarksResponse;
import in.godigioffice.app.ApiModel.MemberListResponse;
import in.godigioffice.app.config.ApiClient;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CallReportModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static boolean isAuthenticated=false;
    private  ArrayList<MemberListResponse> globalmemberlist;

    CallReportModule(ReactApplicationContext context) {
       super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "CallReportModule";
    }

    @ReactMethod
    public void getCallreport(String listid, Promise result) throws Exception {



        Call<ArrayList<CustomerRemarksResponse>> call = ApiClient
                .getInstance()
                .getApi()
                .getCallHistory();
        call.enqueue(new Callback<ArrayList<CustomerRemarksResponse>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onResponse(Call<ArrayList<CustomerRemarksResponse>> call, Response<ArrayList<CustomerRemarksResponse>> response) {
                ArrayList<CustomerRemarksResponse> customerRemarksResponses = response.body();

                List<CustomerRemarksResponse> customerRemarksResponsesfilter = customerRemarksResponses
                        .stream()
                        .filter(ele -> ele.getListid().equals(listid))
                        .collect(Collectors.toList());

             //   getCallHistoryList(customerRemarksResponsesfilter);

//                            for (CustomerRemarksResponse remarksResponse:customerRemarksResponsesfilter) {
//
//
//                            }

                String json_user_string = new Gson().toJson(customerRemarksResponsesfilter);
             //   String json_user_string_mod=json_user_string.substring(1,json_user_string.length()-1);
                Log.d("call_report",json_user_string);
                result.resolve(json_user_string);

            }

            @Override
            public void onFailure(Call<ArrayList<CustomerRemarksResponse>> call, Throwable t) {
               // progressDialog.dismiss();
                Toast.makeText(reactContext, "Server not Respond! check Internet Connection", Toast.LENGTH_SHORT).show();
            }
        });
    }


}