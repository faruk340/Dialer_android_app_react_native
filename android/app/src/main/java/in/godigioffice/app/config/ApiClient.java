package in.godigioffice.app.config;

import in.godigioffice.app.service.Api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {

    ////After Adding logging-interceptor Dependencies

   /*
    private OkHttpClient.Builder builder=new OkHttpClient.Builder();
    private HttpLoggingInterceptor interceptor=new HttpLoggingInterceptor();
   */

    ////After Adding logging-interceptor Dependencies



    private static String BASE_URL="http://137.184.14.133:8080/api/";

    private static ApiClient retrofitClient;


    private static Retrofit retrofit;

    public ApiClient() {

        // October 23, 2021 --->> 25-10-2021 -->



        ////After Adding logging-interceptor Dependencies

      /*  Gson gson=new GsonBuilder()
                .setLenient()
                .create();
        interceptor.level(HttpLoggingInterceptor.Level.BODY);
        builder.addInterceptor(interceptor);*/

        ////After Adding logging-interceptor Dependencies


        retrofit=new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                //.client(builder.build())
                .build();
    }

    public static synchronized ApiClient getInstance() {
        if (retrofitClient==null) {
            retrofitClient=new ApiClient(); ///creating instance
        }
        return retrofitClient;
    }

    public Api getApi(){

        return retrofit.create(Api.class);

    }
}
