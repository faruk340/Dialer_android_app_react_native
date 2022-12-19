import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import BottomSheets from '../component/Bottomsheets';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler, TextInput, ScrollView, NativeModules, Linking, Modal, Dimensions, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import { set } from 'react-native-reanimated';
const { CustomerCreateModule } = NativeModules;
const { CallHistoryModule } = NativeModules;
import AwesomeLoading from 'react-native-awesome-loading';

const Home = ({ route, navigation }) => {


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    const [loading, setloading] = useState(true);
    // ======================================Call History Api Fatch From Android========================

    const [reportcallDone, setreportcallDone] = useState(0)
    const [calllHistory, setCallHistory] = useState([]);
    const [callDoneState, setCallDoneState] = useState({
        call_done: 0,
        skip_call: 0,
        call_leads: 0,
        follow_up: 0,
    })

    useEffect(() => {
        CallHistoryModule.getCallhistory(listid)
            .then((res) => JSON.parse(res))
            .then((res) => setCallHistory(res))
            .catch((e) => {
                console.error(e);
            })
        setloading(false)
    }, [])

    const calllHistoryLength = calllHistory.length;


    let skipCall = calllHistory.filter(data => {
        return (
            data.status === "Skip Call"
        )

    })

    let callLeads = calllHistory.filter(data => {
        return (
            data.status === "Appointment"
        )

    })

    let followUp = calllHistory.filter(data => {
        return (
            data.status === "reminder"
        )

    })
    const skipCallLength = skipCall.length
    const callLeadsLength = callLeads.length
    const FollowUpLength = followUp.length


    const CallDoneLength = calllHistoryLength - skipCallLength;
    callDoneState.call_done = CallDoneLength;
    callDoneState.skip_call = skipCallLength;
    callDoneState.call_leads = callLeadsLength;
    callDoneState.follow_up = FollowUpLength;
    // console.log("callDoneState", callDoneState);


    // ==================================================================


    const openList = () => {
        navigation.navigate('Searchlist', CustomerTotalList)
    }

    const skipCallDoneToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Call Skiped Done',
        });
    }
    const skipCallNotDoneToast = () => {
        Toast.show({
            type: 'success',
            // text1: 'Hello',
            text1: 'Call not Skiped'
        });
    }
    // =================================User profile Page Details =======================

    const MemberDetails = route.params.MemberDetails;
    const modStatus = route.params.modStatus;
    // console.log("Home : ", modStatus);

    // =======================selected List id=============================

    const compareId = route.params.compareId;

    // ===========================================================================================================
    // ========================call-history-data==========================

    const Customername = route.params.customers;
    const CustomerTotalList = route.params.CustomerTotalList;


    const listid = compareId;
    useEffect(() => {
        CallHistoryModule.getCallhistory(listid)
            .then((res) => JSON.parse(res))
            .then((res) => setSkipIncrementstate(res.length))
            .catch((e) => {
                console.error(e);
            })
        setloading(false)
    }, [])

    // ====================================call Reminder api fetch ====================
    const [callReminder, setcallReminder] = useState([])

    useEffect(() => {
        CustomerCreateModule.getReminder(listid)
            .then((res) => JSON.parse(res))
            .then((res) => setcallReminder(res))
            .catch((e) => {
                console.error(e);
            })
    }, [])

    // ======================================================================================


    let newCustomerlist = Customername.map((element, index) => element.map((ele, index) => { return ele }).filter((item, index) => item.list_id == compareId)).filter((ele) => (Array.isArray(ele) && ele.length))






    var customerListLength;
    newCustomerlist.forEach(lengthelement => {
        customerListLength = lengthelement.length;
    });

    // ==========================================================================================

    const [skipIncrementstate, setSkipIncrementstate] = useState()

    const skipNew = () => {
        setloading(true)
        setTimeout(() => {
            CallHistoryModule.getCallhistory(listid)
                .then((res) => JSON.parse(res))
                .then((res) => setCallHistory(res))
                .catch((e) => {
                    console.error(e);
                })
            CustomerCreateModule.getReminder(listid)
                .then((res) => JSON.parse(res))
                .then((res) => setcallReminder(res))
                .catch((e) => {
                    console.error(e);
                })
            setloading(false)
        }, 3000)
        if (skipIncrementstate !== customerListLength) {
            setSkipIncrementstate(skipIncrementstate + 1)
        }
        else {
            alert("Customer List has Finished please Select Another List")
            setSkipIncrementstate(skipIncrementstate - 1)
            // setTimeout(openList, 1000)
        }
    }

    // =======================================Call skip Data transfar to server===============================================

    const [callSkipState, setCallSkipState] = useState([])
    const skipData = newCustomerlist.map((newItem, index) => newItem.filter((newItemTwo, index) => index === skipIncrementstate))
    var skip;
    skipData.forEach((ele, index) => {
        skip = ele
    })

    const skipNewData = () => {
        setTimeout(() => {
            setloading(true)
        }, 500)
        setTimeout(() => {
            CallHistoryModule.getCallhistory(listid)
                .then((res) => JSON.parse(res))
                .then((res) => setCallHistory(res))
                .catch((e) => {
                    console.error(e);
                })
            setloading(false)
        }, 1500)
        if (skipIncrementstate !== customerListLength) {
            setSkipIncrementstate(skipIncrementstate + 1)
            const newSkipData = skip.map((ele, index) => {
                return {
                    // ...ele,
                    customer_location: ele.customer_location,
                    customer_mob_no: ele.customer_mob_no,
                    customer_name: ele.customer_name,
                    customer_whatsapp_no: ele.customer_whatsapp_no,
                    listid: ele.list_id,
                    list_name: ele.list_name,
                    op1: ele.op1,
                    op2: ele.op2,
                    op3: ele.op3,
                    op4: ele.op4,
                    cmpid: MemberDetails.cmpid,
                    member_id: MemberDetails.member_id,
                    member_name: MemberDetails.member_name,
                    member_location: MemberDetails.member_location,
                    member_mail: MemberDetails.member_mail,
                    member_mob_no: MemberDetails.member_mob_no,
                    member_skip_call: MemberDetails.member_skip_call,
                    status: "Skip Call",
                    remark: "Skip Call",
                }
            })

            let skipcalldata = JSON.stringify(newSkipData);
            CustomerCreateModule.skipCall(skipcalldata)
                .then((res) => {
                    // setloading(false)

                    if (res) {
                        console.log("Res:" + res);
                        // alert("Call Skiped")
                        skipCallDoneToast()
                    }
                    else {
                        // alert("Call not Skiped");
                        skipCallNotDoneToast()
                        // setloading(false)
                    }
                    // setloading(false)
                })
                .catch((e) => {
                    console.error(e);
                    // alert("Your contact is not created");
                });
            setCallSkipState(newSkipData)
            // console.log(newSkipData)
        }
        else {
            alert("Customer List has Finished please Select Another List")
            setSkipIncrementstate(skipIncrementstate)
            // setTimeout(openList, 1000)
        }
    }



    return (
        loading ? <AwesomeLoading indicatorId={5} size={100} isActive={true} text="loading" /> :
            <>
                <Header
                    listname={newCustomerlist}
                    skipstateUpdate={skipIncrementstate}
                    CustomerTotalList={CustomerTotalList}
                    MemberDetails={MemberDetails}
                    compareId={compareId}
                    callReminder={callReminder}
                    skip={skip}
                    modStatus={modStatus}
                    callDoneState={callDoneState}
                />
                <BottomSheets
                    passSkipData={skipNewData}
                    passForwardSkipData={skipNew}
                    skipstateUpdate={skipIncrementstate}
                    listname={newCustomerlist}
                    compareId={compareId}
                    skip={skip}
                    MemberDetails={MemberDetails}
                    modStatus={modStatus}
                />
                <Toast
                    topOffset={1}
                />
            </>


    );
};

export default Home;
