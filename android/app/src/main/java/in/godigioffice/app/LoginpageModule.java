package in.godigioffice.app;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import in.godigioffice.app.ApiModel.CustomerListResponse;
import in.godigioffice.app.ApiModel.MemberListResponse;
import in.godigioffice.app.ApiModel.UserDetailsResponse;
import in.godigioffice.app.config.ApiClient;
import in.godigioffice.app.helper.Constants;
import in.godigioffice.app.helper.CryptLib;
import in.godigioffice.app.models.UserModel;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.crypto.NoSuchPaddingException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginpageModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static boolean isAuthenticated=false;
    private  List<MemberListResponse> globalmemberlist;

    LoginpageModule(ReactApplicationContext context) {
       super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "LoginpageModule";
    }

    @ReactMethod
    public void isValid(String username, String password, Promise result) throws Exception {
        CryptLib cryptLib = new CryptLib();
        String cipherText = cryptLib.encryptPlainTextWithRandomIV(password, Constants.ENCRYPT_KEY);
        System.out.println("cipherText:    " + cipherText);

                  /*  String decryptedString = cryptLib.decryptCipherTextWithRandomIV(cipherText, Constants.ENCRYPT_KEY);
                    System.out.println("decryptedString "+decryptedString);*/


        MemberListResponse memberListResponse = new MemberListResponse(username, cipherText);

        Call<ArrayList<MemberListResponse>> call = ApiClient
                .getInstance()
                .getApi()
                .memberAuth(memberListResponse);

        call.enqueue(new Callback<ArrayList<MemberListResponse>>() {
            @Override
            public void onResponse(Call<ArrayList<MemberListResponse>> call,
                                   Response<ArrayList<MemberListResponse>> response) {
                List<MemberListResponse> memberListResponses = response.body();

                if(memberListResponses.size()>0)

                {
                    globalmemberlist=memberListResponses;
                    isAuthenticated=true;
                    result.resolve(isAuthenticated);
                }
                else {
                    result.resolve(false);
                }

                               /* if (response.isSuccessful()){
                                    if (response.code()==200){
                                        sharedPrefManager.SaveUser(new UserModel(Objects.requireNonNull(email_id.getText()).toString().trim(),Objects.requireNonNull(password.getText()).toString().trim()));


                                    }
                                }*/


                System.out.println("testttttttttttttttttttttttttttttt" + memberListResponses.size());

                if (memberListResponses.size() > 0) {

                    //   isAuthenticated=true;

                    //    globalmemberlist.addAll(memberListResponses);
                                        /*sharedPrefManager.SaveUser(new UserModel(username.trim(), password.trim()));


                                        for (MemberListResponse memberListResponse1 : memberListResponses) {
                                            cmpid = memberListResponse1.getCmpid();
                                            Constants.my_member_id = memberListResponse1.getMember_id();
                                            Constants.member_name = memberListResponse1.getMember_name();
                                            Constants.member_mob = memberListResponse1.getMember_mob_no();
                                            Constants.member_email_id = memberListResponse1.getMember_mail();
                                            Constants.member_skip_call=memberListResponse1.getMember_skip_call();

                                        }*/

                    System.out.println("member_skip_call" + Constants.member_skip_call+"\n");
                    //System.out.println("cmpid" + cmpid+"\n");

                                        /*Call<ArrayList<UserDetailsResponse>> call2 = ApiClient
                                                .getInstance()
                                                .getApi()
                                                .getUserResponse(cmpid);
                                        call2.enqueue(new Callback<ArrayList<UserDetailsResponse>>() {
                                            @Override
                                            public void onResponse(Call<ArrayList<UserDetailsResponse>> call, Response<ArrayList<UserDetailsResponse>> response) {
                                                List<UserDetailsResponse> userDetailsResponses = response.body();
                                                System.out.println("userDetailsResponses" + userDetailsResponses.size());
                                                if (userDetailsResponses.size() > 0) {

                                                    for (MemberListResponse memberListResponse1 : memberListResponses) {

                                                        Constants constants = Constants.getInstance();
                                                        constants.setCmpid(memberListResponse1.getCmpid());
                                                        constants.setMember_id(memberListResponse1.getMember_id());
                                                        constants.setMemberName(memberListResponse1.getMember_name());

                                                        System.out.println("memberListResponse1.getMember_name()" + memberListResponse1.getMember_name());

                                                        for (CustomerListResponse customerListResponse : memberListResponse1.getCustomerListResponse()) {
                                                            //customerList.add(customerListResponse);

                                                        }

                                                    }
                                                    //new DashboardActivity(customerList);
                                                    //System.out.println("customerListcustomerList" + customerList.size());

                                                    //Intent go = new Intent(LoginActivity.this, DashBoard2Activity.class);
                                                    //startActivity(go);


                                                    //dashboardActivity.getListAnother(customerList);

                                                    *//*dashBoard2Activity.getListAnother(customerList, false);
                                                    finish();*//*


                                                    // System.out.println("constantstest"+Constants.getInstance().getCmpid());
                                                } else {
                                                    *//*ActiveUserCheckDialog();
                                                    active_user_dialog.show();*//*
                                                }
                                            }

                                            @Override
                                            public void onFailure(Call<ArrayList<UserDetailsResponse>> call, Throwable t) {
                                                // Toast.makeText(LoginActivity.this, "hello : "+t.getMessage(), Toast.LENGTH_SHORT).show();
                                                //response_failure_t.setText(t.getMessage());

                                                responseFailureDialog.show();
                                            }
                                        });*/


                } else {

                    //CustomToastMessage("ID and Password Wrong, Try Again", R.drawable.wronge_p);
                    // Toast.makeText(LoginActivity.this, "ID and Password Wrong, Try Again", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ArrayList<MemberListResponse>> call, Throwable t) {
                Toast.makeText(reactContext, t.getMessage(), Toast.LENGTH_SHORT).show();
                System.out.println("serversideproblem" + t.getMessage());

            }
        });
    }
    @ReactMethod
    public void getUserDetails(String username,  Promise response) {
        try {

          //  JSONArray array = new JSONArray(globalmemberlist);
           // JSONObject object = null;
           // int length=array.length();

            // for(int n = 0; n < array.length(); n++)
            // {
            //    object = array.getJSONObject(n);

            // }

            String json_user_string = new Gson().toJson(globalmemberlist);
            String json_user_string_mod=json_user_string.substring(1,json_user_string.length()-1);
            Log.d("user_info",json_user_string_mod);
            response.resolve(json_user_string_mod);
           // isAuthenticated=true;
          //  response.resolve(isAuthenticated);
          //  JSONObject userObject = new JSONObject();

          //      String json_to_string=loadJSONFile();
           //     response.resolve(json_to_string);


            // @SuppressLint("HardwareIds") String id = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);

        } catch (Exception e) {
            response.reject("Error", e);
        }
    }
//    public String loadJSONFile() {
//        String json = null;
//        try {
//            InputStream inputStream = reactContext.getAssets().open("user_details.json");
//            int size = inputStream.available();
//            byte[] byteArray = new byte[size];
//            inputStream.read(byteArray);
//            inputStream.close();
//            json = new String(byteArray, "UTF-8");
//        } catch (IOException e) {
//            e.printStackTrace();
//            return null;
//        }
//        return json;
//    }

    boolean CheckInternet() {
        boolean connected;

        ConnectivityManager connectivityManager = (ConnectivityManager) reactContext.getSystemService(reactContext.CONNECTIVITY_SERVICE);
        if (connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState() == NetworkInfo.State.CONNECTED ||
                connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED) {
            //we are connected to a network
            connected = true;
        } else {
            connected = false;
        }
        return connected;
    }

}