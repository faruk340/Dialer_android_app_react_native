package in.godigioffice.app.models;

import java.util.Comparator;

public class CallHistoryModel  implements Comparable<CallHistoryModel>  {


    String name;
    String phoneNumber;
    String date;
    String time;
    String status;
    String whatsapp_no;
    String c_location;

    String op1;
    String op2;
    String op3;
    String op4;

    public CallHistoryModel(String name, String phoneNumber, String date, String time, String status, String whatsapp_no, String c_location,
                            String op1,String op2,String op3,String op4) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.date = date;
        this.time = time;
        this.status = status;
        this.whatsapp_no = whatsapp_no;
        this.c_location = c_location;
        this.op1=op1;
        this.op2=op2;
        this.op3=op3;
        this.op4=op4;
    }




    public String getOp1() {
        return op1;
    }

    public void setOp1(String op1) {
        this.op1 = op1;
    }

    public String getOp2() {
        return op2;
    }

    public void setOp2(String op2) {
        this.op2 = op2;
    }

    public String getOp3() {
        return op3;
    }

    public void setOp3(String op3) {
        this.op3 = op3;
    }

    public String getOp4() {
        return op4;
    }

    public void setOp4(String op4) {
        this.op4 = op4;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getWhatsapp_no() {
        return whatsapp_no;
    }

    public void setWhatsapp_no(String whatsapp_no) {
        this.whatsapp_no = whatsapp_no;
    }

    public String getC_location() {
        return c_location;
    }

    public void setC_location(String c_location) {
        this.c_location = c_location;
    }




    @Override
    public int compareTo(CallHistoryModel o) {

        //this is main logic we have to use comparable interface for this
        ///we can return negative integer or zero or positive integer.


      //  return this.id - o.getId();
      return 0;

    }

    public static Comparator<CallHistoryModel> myName=new Comparator<CallHistoryModel>() {
        @Override
        public int compare(CallHistoryModel e1, CallHistoryModel e2) {
            return e1.getName().compareTo(e2.getName());
        }
    };

    public static Comparator<CallHistoryModel> phone_number=new Comparator<CallHistoryModel>() {
        @Override
        public int compare(CallHistoryModel e1, CallHistoryModel e2) {
            return e1.getPhoneNumber().compareTo(e2.getPhoneNumber());
        }
    };



    public static Comparator<CallHistoryModel> phone_call_duration=new Comparator<CallHistoryModel>() {
        @Override
        public int compare(CallHistoryModel e1, CallHistoryModel e2) {
            return e1.getTime().compareTo(e2.getTime());
        }
    };

}
