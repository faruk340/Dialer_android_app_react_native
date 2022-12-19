
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
    Pressable,
    Platform,
    Linking,
    NativeModules
} from 'react-native';
import Lastdialcall from "./Lastdialcall";
import { BottomSheet } from 'react-native-btr';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog, { DialogContent, SlideAnimation, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Dimensions } from 'react-native';


const { CallHistoryModule, CallReportModule, CalendarModule } = NativeModules;



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const BottomSheets = (props) => {
    const skip = props.skip;
    const MemberDetails = props.MemberDetails;
    const modStatus = props.modStatus;

    // console.log("BottomSheet : ", modStatus);
    // const myContext = useContext(AppContext);
    // const historyData = myContext.callHistoryData;
    // console.log(myContext);
    // ==========================call history json fetch=================

    const compareId = props.compareId;

    const [calllHistory, setCallHistory] = useState([]);

    const userSettings = {
        callHistoryData: calllHistory,
    };



    const listid = compareId;

    useEffect(() => {
        CallHistoryModule.getCallhistory(listid)
            .then((res) => JSON.parse(res))
            .then((res) => setCallHistory(res))
            .catch((e) => {
                console.error(e);
            })
    }, [])

    const callHistoryData = userSettings.callHistoryData;

    // ======================================Call report json fatch============================

    const [callReportData, setcallReportData] = useState([])
    useEffect(() => {
        CallReportModule.getCallreport(listid)
            .then((res) => JSON.parse(res))
            .then((res) => setcallReportData(res))
            .catch((e) => {
                console.error(e);
            })
    }, [])

    const [callDoneData, setcallDoneData] = useState([])
    useEffect(() => {
        CalendarModule.getCalldone(listid)
            .then((res) => JSON.parse(res))
            .then((res) => setcallDoneData(res))
            .catch((e) => {
                console.error(e);
            })
    }, [])

    // console.log(callReportData)


    // const newcallhistory = callHistoryData.filter((ele) => (Array.isArray(ele) && ele.length))


    // const newcallhistory = callHistoryData.map((ele) => console.log(ele))

    // console.log(callHistoryData);




    // ==================================================================================

    const skipstateUpdate = props.skipstateUpdate;
    const listname = props.listname;

    // console.log(compareId)
    // console.log(listname)

    const { CalendarModule } = NativeModules;

    // ========================= Calling Function of bottommenu ===================================


    const UrgeWithPleasureComponent = () => {
        if (numberpickep === undefined) {
            alert("Your List Has finished !! Please Select Another List")
            return;
        }
        else {
            CalendarModule.dialNumber(numberpickep);
        }
    }

    var numberpickep;
    var customerName;
    var listId;
    var listName;
    var memberName = MemberDetails.member_name;
    var memberId = MemberDetails.member_id;
    var cmpid = MemberDetails.cmpid;
    var customerLastCallDetails = [];


    listname.forEach((newItem, index) => newItem.forEach((newItemTwo, index) => {
        if (index == skipstateUpdate) {
            numberpickep = newItemTwo.customer_mob_no;
            customerName = newItemTwo.customer_name;
            listId = newItemTwo.list_id;
            listName = newItemTwo.list_name;
            customerLastCallDetails = newItemTwo;

        }
    }
    ))
    // =======================================lastdialcall-modal=======================
    const [isModalVisible, setisModalVisible] = useState(false);
    // ================================================================
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);  //this state define for toggle bottom-menu
    const [newvisible, setnewVisible] = useState(false); // this state define for skip call (cancel or conform) modal
    const [modalVisible, setModalVisible] = useState(false); // this state define for count-down for start calling
    // ==========================call history json fetch end  =================
    // =================================Lastdialcall save date for function=============================

    // const passSaveDataEvents = () => {
    //     // skipOkEvents();
    //     skipForwardEvents();
    // }

    const skipOkEvents = async () => {
        props.passSkipData()
        setnewVisible(false)
    }

    const skipForwardEvents = () => {
        props.passForwardSkipData()
        setnewVisible(false)
    }


    // ==============================================================


    const toggleModalLastcallModel = () => {
        if (numberpickep === undefined) {
            setModalVisible(false)
            setisModalVisible(false)
            alert("Your List Has finished !! Please Select Another List")
            return;
        } else {
            setModalVisible(true)
            setTimeout(setisModalVisible, 8000)
            CalendarModule.CallLogPicker(
                numberpickep,
                customerName,
                listId,
                listName,
                memberName,
                memberId,
                cmpid
            );
        }
    };
    const onPress = () => {
        console.log('We will invoke the native module here!');
    }


    const skipFun = () => {
        if (numberpickep === undefined) {
            setnewVisible(false);
            alert("Your List Has finished !! Please Select Another List")
            return;
        } else {
            setnewVisible(true);
        }
    }
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);

    };

    const clickCall = () => {
        alert("are you sure you want to call")
    }
    const clickHistory = () => {
        alert("This is Your History");
    }
    const profileFun = () => {
        alert("This Is Your Profile");
    }

    const toggleOpen = () => {


    }

    const closeLastCall = () => {
        setisModalVisible(false)
    }

    const closeLaskipOkEventsstCall = () => {

    }


    return (

        <View style={{ width: "100%", height: 70, }}>
            <View style={{
                flexDirection: 'column',
                backgroundColor: '#000',
                height: 70,
            }}>

                <View style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    bottom: 10,
                    zIndex: 10
                }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {/* <TouchableOpacity style={styles.callIcon} onPress={clickCall}>
                            <Feather name="phone-call" size={25} color="#f58025" />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.gridIcon} onPress={toggleBottomNavigationView}>
                            <Fontisto name="nav-icon-grid" size={25} color="#f5576c" />
                        </TouchableOpacity>
                        {/* <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Menu</Text> */}
                    </View>
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: '#ceced9',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25
                }}>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity style={styles.callIcon} onPress={toggleModalLastcallModel}>
                            <Feather name="phone-call" size={13} color="#000" />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Call</Text>
                        <View style={styles.modalView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                            // onRequestClose={() => {
                            //     Alert.alert("Modal has been closed.");
                            //     setModalVisible(!modalVisible);
                            // }}
                            >
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                // onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}></Text>
                                </Pressable>
                                <View style={styles.countDown}>
                                    <CountdownCircleTimer
                                        isPlaying={true}
                                        duration={5}
                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                        colorsTime={[7, 5, 2, 0]}
                                        onComplete={() => {
                                            UrgeWithPleasureComponent();
                                            // do your stuff here
                                            // const args = {
                                            //     number: '9093900003', // String value with the number to call
                                            //     prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                                            // }

                                            // call(args).catch(console.error)
                                            if (numberpickep === undefined) {
                                                setModalVisible(false)
                                                alert("Your List Has finished !! Please Select Another List")
                                                return;
                                            }
                                            else {
                                                return setModalVisible(!modalVisible);
                                            }
                                        }}
                                    >
                                        {({ remainingTime }) => <Text style={{ fontSize: 50, color: "#fff" }}>{remainingTime}</Text>}
                                    </CountdownCircleTimer>
                                </View>
                            </Modal>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalVisible}
                        // onRequestClose={() => {
                        //     Alert.alert("Modal has been closed.");
                        //     setisModalVisible(!isModalVisible);
                        // }}
                        >
                            <Lastdialcall
                                passData={closeLastCall}
                                customerLastCallDetails={customerLastCallDetails}
                                numberpickep={numberpickep}
                                toggleModalLastcallModel={toggleModalLastcallModel}
                                passSaveDataEvents={skipForwardEvents}
                                skip={skip}
                                MemberDetails={MemberDetails}
                                modStatus={modStatus}
                            />
                        </Modal>
                    </View>
                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',

                    }}>
                        <TouchableOpacity style={styles.skipIcon} onPress={skipFun}>
                            <Ionicons name='play-skip-forward-circle-outline' size={40} color="#000" />
                            <Dialog
                                visible={newvisible}
                                onTouchOutside={() => {
                                    setnewVisible(false)
                                }}

                                dialogAnimation={new SlideAnimation({
                                    slideFrom: 'bottom',
                                })}

                                footer={
                                    <DialogFooter>
                                        <DialogButton
                                            text="CANCEL"
                                            onPress={() => { setnewVisible(!newvisible) }}
                                        />
                                        <DialogButton
                                            text="OK"
                                            onPress={skipOkEvents}
                                        />
                                    </DialogFooter>
                                }
                            >
                                <DialogContent style={styles.skipPopup}>
                                    <Text style={{ fontSize: 16, }}>Are You Sure You Want To Skip Your Call</Text>
                                </DialogContent>
                            </Dialog>
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Call Skip</Text>
                    </View>

                    {/* </View> */}
                </View>
            </View>
            {/* =============================================================================== */}

            <BottomSheet
                visible={visible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state
                onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state
            >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                padding: 20,
                                fontSize: 20
                            }}>
                            Menu
                        </Text>

                        <View style={styles.bottomSheetFlexBox}>
                            <TouchableOpacity style={styles.bottomSheetBox}
                                onPress={() => { navigation.navigate('Callhistory', { callHistoryData, modStatus }) }}
                            >
                                <View style={styles.flexBoxIcon}>
                                    <MaterialCommunityIcons name="history" size={30} color="#8C1BAB" />
                                </View>
                                <View style={styles.flexBoxContent}>
                                    <Text style={{ color: "#000", fontSize: 18 }}>Call History</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomSheetBox}
                                onPress={() => { navigation.navigate('Report', { callReportData, callDoneData }) }}
                            >
                                <View style={styles.flexBoxIcon}>
                                    <Ionicons name='list-circle-outline' size={30} color="#DE4313" />
                                </View>
                                <View style={styles.flexBoxContent}>
                                    <Text style={{ color: "#000", fontSize: 18 }}>Reports</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomSheetBox}>
                                <View style={styles.flexBoxIcon}>
                                    <Feather name='settings' size={30} color="#130CB7" />
                                </View>
                                <View style={styles.flexBoxContent}>
                                    <Text style={{ color: "#000", fontSize: 18 }}>Setting</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
};

export default BottomSheets;

const styles = StyleSheet.create({
    // modalView: {
    //     width: 100,
    //     height: 100,
    //     bottom: "-1000%",
    //     backgroundColor: "red",
    //     position: "absolute",
    // },
    countDown: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: windowHeight,
        backgroundColor: "rgba(52,52,52,0.8)",
        position: "absolute",
    },
    bottomNavigationView: {
        position: "relative",
        backgroundColor: '#fff',
        width: '100%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    callIcon: {
        zIndex: 2,
        width: 35,
        height: 35,
        borderWidth: 3,
        borderColor: "#000",
        padding: 8,
        borderRadius: 35,
    },
    gridIcon: {
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 35,
        // borderColor: "#f58025",
        borderColor: "#ceced9",
        padding: 21,
    },
    skipIcon: {
        marginTop: 12
    },
    bottomSheetFlexBox: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    bottomSheetBox: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: 0.3,
        borderBottomColor: "rgb(240,239,239)",
    },
    flexBoxIcon: {
        width: "20%",
        paddingLeft: 20,
    },
    flexBoxContent: {
        width: "80%",
    },
    skipPopup: {
        width: "80%",
        height: 90,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 40,
    }
});